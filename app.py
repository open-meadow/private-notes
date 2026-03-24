from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import json

app = FastAPI()
DATABASE_PATH = "DB/recipe.db"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5173/*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

if __name__ == "__main__":
    main()
