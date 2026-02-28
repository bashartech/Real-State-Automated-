FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose Hugging Face Spaces default port
EXPOSE 7860

# Set environment variable for port
ENV PORT=7860

# Run the application
CMD ["python", "main.py"]
