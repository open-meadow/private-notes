from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def main():
    print("Hello from private-notes!")

    return {"Hello": "World"}


if __name__ == "__main__":
    main()
