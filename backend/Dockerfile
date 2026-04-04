FROM python:3.13-slim
WORKDIR /app
COPY pyproject.toml ./
RUN pip install --no-cache-dir fastapi uvicorn
COPY . .
EXPOSE 8000
CMD ["fastapi" "run"]