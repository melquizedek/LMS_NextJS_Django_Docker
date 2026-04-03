# Django NextJS Docker - Loan Management System(LMS)

A full-stack portfolio application built with Django REST Framework backend and Next.js frontend, containerized with Docker for seamless deployment.

## Tech Stack

### Frontend
- **Next.js 15.5** - React framework with Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Hook Form + Zod** - Form handling and validation
- **Genkit AI** - AI integration with Google AI

### Backend
- **Django 5.2** - Web framework
- **Django REST Framework** - RESTful API
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching and message broker
- **Celery** - Asynchronous task processing
- **Celery Beat** - Periodic task scheduler

### DevOps & Tools
- **Docker & Docker Compose** - Containerization
- **Gunicorn** - WSGI HTTP server
- **Nginx** - Reverse proxy (production)
- **AWS S3** - Media storage (via django-storages)
- **Flower** - Celery monitoring

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)

## Setup & Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio-django-nextjs
```

2. **Environment Configuration**
   Create a `.env` file in the root directory with required environment variables:
```env
# Database
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password

# Redis
REDIS_PASSWORD=your_redis_password

# Django
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Add other required environment variables
```

3. **Build and Run with Docker**
```bash
docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5436
- Redis: localhost:6379

## Project Structure

```
backend/              # Django application
    apps/            # Django apps (accounts, amortization, etc.)
    config/          # Django settings and configuration
    static/          # Static files
    media/           # User-uploaded media
    requirements/    # Python dependencies
frontend/            # Next.js application
    src/            # Source code
    public/         # Static assets
    package.json    # Node dependencies
    docker-compose.yml  # Docker orchestration
```

## Development

### Backend Development
```bash
cd backend
python manage.py runserver
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Running Tests
```bash
# Backend tests
docker-compose exec backend pytest

# Frontend tests
docker-compose exec frontend npm test
```

## Docker Services

- **frontend** - Next.js development server (port 3000)
- **backend** - Django application (port 8000)
- **db** - PostgreSQL database (port 5436)
- **redis** - Redis cache and message broker (port 6379)
- **celery_worker** - Celery worker for async tasks

## Key Features

- RESTful API with Django REST Framework
- JWT authentication
- Asynchronous task processing with Celery
- Real-time updates with WebSockets
- Responsive UI with Tailwind CSS
- Type-safe frontend with TypeScript
- AI-powered features using Genkit
- Comprehensive API documentation (drf-yasg)
- Performance monitoring (Django Silk)
- Security features (Django Defender, rate limiting)

## License

[Add your license here]

### Author: Zed Paala
