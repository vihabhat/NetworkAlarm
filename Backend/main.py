from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from datetime import datetime

# Initialize Flask app and configure CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allowing only your frontend's origin

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="network_alarm_db",
        user="postgres",
        password="postgres"
    )
    return conn

# Initialize database tables
def initialize_database():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Users table creation
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                college_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                college_id VARCHAR(100) NOT NULL,
                username VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                year_of_study VARCHAR,
                address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

        # Events table creation
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                date DATE NOT NULL,
                time TIME NOT NULL,
                college VARCHAR(255) NOT NULL,
                image TEXT DEFAULT '/api/placeholder/600/300',
                likes INT DEFAULT 0,
                comments INT DEFAULT 0,
                shares INT DEFAULT 0,
                verified BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print("Database tables initialized successfully.")
    except Exception as e:
        print(f"An error occurred during database initialization: {str(e)}")

# User registration route
@app.route('/api/logins', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get("name")
    college_name = data.get("collegeName")
    email = data.get("email")
    phone = data.get("phone")
    college_id = data.get("collegeId")
    username = data.get("username")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    year_of_study = data.get("yearOfStudy")
    address = data.get("address")

    if not name or not college_name or not email or not phone or not college_id or not username or not password:
        return jsonify({"message": "All fields are required"}), 400
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO users (name, college_name, email, phone, college_id, username, password, year_of_study, address)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (name, college_name, email, phone, college_id, username, password, year_of_study, address))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# User login route
@app.route('/api/logins/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT name, email, college_name, college_id, username
            FROM users
            WHERE email = %s AND password = %s
        """, (email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({
                "message": "Login successful",
                "user": {
                    "name": user[0],
                    "email": user[1],
                    "college_name": user[2],
                    "college_id": user[3],
                    "username": user[4]
                }
            }), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# Events routes
@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, date, time, college, 
                   image, likes, comments, shares, verified
            FROM events 
            ORDER BY date DESC, time DESC
        """)
        events = cursor.fetchall()
        events_list = [
            {
                'id': event[0],
                'title': event[1],
                'description': event[2],
                'date': event[3].strftime('%Y-%m-%d'),
                'time': event[4].strftime('%H:%M'),
                'college': event[5],
                'image': event[6],
                'likes': event[7],
                'comments': event[8],
                'shares': event[9],
                'verified': event[10]
            }
            for event in events
        ]
        return jsonify({'events': events_list}), 200
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        time = datetime.strptime(data['time'], '%H:%M').time()

        cursor.execute("""
            INSERT INTO events (
                title, description, date, time, college, 
                image, likes, comments, shares, verified
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            data['title'], data['description'], date, time, 
            data['college'], data.get('image', '/api/placeholder/600/300'),
            0, 0, 0, True
        ))
        new_event_id = cursor.fetchone()[0]
        conn.commit()
        return jsonify({'message': 'Event created successfully', 'event_id': new_event_id}), 201
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    initialize_database()
    app.run(debug=True)