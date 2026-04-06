FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        curl \
        && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ./requirements/base.txt /app/
RUN pip install --upgrade pip && pip install --no-cache-dir -r base.txt

# Copy project
COPY . /app/

# Copy and set permissions for scripts
#COPY scripts/ /app/scripts/
#RUN chmod +x /app/scripts/*.sh

# Create non-root user
RUN groupadd -r django && useradd -r -g django django
RUN chown -R django:django /app
USER django

# Expose port
EXPOSE 8000

# Default command
# CMD ["/app/scripts/entrypoint.sh"]