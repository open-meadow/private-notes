from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json

app = FastAPI()
DATABASE_PATH = "DB/recipe.db"
print("DB path:", DATABASE_PATH)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Recipe(BaseModel):
    name: str
    category: int
    ingredients: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None

@app.get("/")
def main():
    return {
        "available_endpoints": ["/mock-data", "/items"]
    }

@app.get("/mock-data")
def mock_data():
    with open("data/MOCK_DATA.json", "r") as mock_data:
        mock_data_json = json.load(mock_data)
    
    return mock_data_json

@app.get("/items")
def items():
    with sqlite3.connect(DATABASE_PATH) as connection:
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM Recipe")
        rows = cursor.fetchall()

        recipes = [
            {
                "id": row[0],
                "name": row[1],
                "category": row[2],
                "ingredients": row[3],
                "description": row[4],
                "extra": row[5]
            }
            for row in rows
        ]

        return recipes

@app.post("/add_item")
async def add_item(recipe: Recipe):
    with sqlite3.connect(DATABASE_PATH) as connection:
        cursor = connection.cursor()
        
        cursor.execute("""
            INSERT INTO Recipe (title, category_id, ingredients, instructions, image_url)
            VALUES (?, ?, ?, ?, ?)
        """, (
            recipe.name,
            recipe.category,
            recipe.ingredients,
            recipe.description,
            # recipe.image
            None
        ))

        connection.commit()
        recipe_id = cursor.lastrowid

    
    return { 
        "message": "Data has been inserted successfully", 
        "id": recipe_id, 
        "recipe": {
            "name": recipe.name,
            "category": recipe.category,
            "ingredients": recipe.ingredients,
            "description": recipe.description,
            "image": recipe.image
        }
    }

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    with sqlite3.connect(DATABASE_PATH) as connection:
        cursor = connection.cursor()
        
        cursor.execute("DELETE FROM Recipe WHERE id = ?", (item_id,))
        connection.commit()
        
        if cursor.rowcount == 0:
            return { "message": "Item not found" }
        
    return { "message": "Item deleted successfully" }

@app.put("/items/{item_id}")
async def update_item(item_id: int, recipe: Recipe):
    with sqlite3.connect(DATABASE_PATH) as connection:
        cursor = connection.cursor()
        
        cursor.execute("""
            UPDATE Recipe
            SET title = ?,
                category_id = ?,
                ingredients = ?,
                instructions = ?,
                image_url = ?    
            WHERE id = ?
        """, (
            recipe.name,
            recipe.category,
            recipe.ingredients,
            recipe.description,
            recipe.image,
            item_id
        ))

        connection.commit()
        if cursor.rowcount == 0:
            return {"message": "Item not found"}
        
    return {"message": "Item updated successfully"}

if __name__ == "__main__":
    main()
