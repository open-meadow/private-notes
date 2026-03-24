from fastapi import FastAPI
import sqlite3
import json


app = FastAPI()
DATABASE_PATH = "DB/recipe.db"

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
        recipes = cursor.fetchall()

        return recipes

if __name__ == "__main__":
    main()
