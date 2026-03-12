from fastapi import FastAPI
import json

app = FastAPI()

@app.get("/")
def main():
    with open("data/MOCK_DATA.json", "r") as mock_data:
        print(mock_data)
    
    return {"hello": "world"}


if __name__ == "__main__":
    main()
