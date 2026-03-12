from fastapi import FastAPI
import json

app = FastAPI()

@app.get("/")
def main():
    with open("data/MOCK_DATA.json", "r") as mock_data:
        mock_data_json = json.load(mock_data)
    
    return mock_data_json


if __name__ == "__main__":
    main()
