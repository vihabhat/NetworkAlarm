# NetworkAlarm Project

A multi-service application featuring a React frontend, Flask backend API, and Strapi content management system.

## Project Structure

```
NetworkAlarm/
├── Frontend/           # React + Vite Frontend
├── Backend/           # Flask API Backend
├── Network-API/       # Strapi CMS
└── docker-compose.yml # Docker services configuration
```

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Service Setup Instructions

### 1. Frontend (React + Vite)

Navigate to the Frontend directory:
```bash
cd Frontend
```

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Backend (Flask)

Navigate to the Backend directory:
```bash
cd Backend
```

Create and activate Python virtual environment:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate
```

Install Python dependencies:
```bash
pip install flask
pip install -r requirements.txt  # Once you create requirements.txt
```

Start Flask development server:
```bash
flask run
```

The Flask API will be available at `http://localhost:5000`

### 3. Network-API (Strapi)

Navigate to the Network-API directory:
```bash
cd Network-API
```

Install dependencies:
```bash
npm install
```

Start Strapi development server:
```bash
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

### 4. Docker Compose Setup

To run all services using Docker Compose:
```bash
docker-compose up
```

To run in detached mode:
```bash
docker-compose up -d
```

To stop all services:
```bash
docker-compose down
```

## Development Guidelines

1. **Frontend Development**
   - The frontend is built using React + Vite
   - Follow the ESLint configuration for code style
   - Components should be placed in `src/components`
   - Pages should be placed in `src/pages`
   - Use the provided configuration in `vite.config.js`

2. **Backend Development**
   - Follow PEP 8 style guide for Python code
   - Keep API endpoints RESTful
   - Document all endpoints using docstrings
   - Use environment variables for configuration
   - Create requirements.txt for dependency management

3. **Strapi Development**
   - Use Strapi's content-type builder for data modeling
   - Configure proper user roles and permissions
   - Use environment variables for sensitive information
   - Follow Strapi's best practices for API development

## Environment Variables

Create `.env` files for each service:

1. Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_STRAPI_URL=http://localhost:1337
```

2. Backend `.env`:
```env
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=your_database_url
```

3. Network-API `.env`:
```env
DATABASE_CLIENT=your_database_client
DATABASE_NAME=your_database_name
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
```

## API Documentation

Add your API endpoints documentation here for both Flask and Strapi APIs.

## Contributing

1. Create a new branch for your feature
2. Follow the coding standards for each service
3. Test your changes thoroughly
4. Submit a pull request with a clear description

## License

[Add your license here]
