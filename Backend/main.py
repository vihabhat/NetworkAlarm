from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import psycopg2
from datetime import datetime

# Initialize Flask app and configure CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="network_alarm_db",
        user="postgres",
        password="postgres"
    )
    return conn

# User registration route
@app.route('/api/logins', methods=['POST'])
def register_user():
    data = request.get_json()
    
    # Extract user data
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

    if not all([name, college_name, email, phone, college_id, username, password]):
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
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# Get user details by email
@app.route('/api/users/<email>', methods=['GET'])
def get_user(email):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT name, email, college_name, college_id, username
            FROM users
            WHERE email = %s
        """, (email,))
        
        user = cursor.fetchone()
        
        if user:
            user_data = {
                'name': user[0],
                'email': user[1],
                'college_name': user[2],
                'college_id': user[3],
                'username': user[4]
            }
            return jsonify(user_data), 200
        return jsonify({'message': 'User not found'}), 404
            
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

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
        return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# Get all events
@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, date, time, college, 
                   image, likes, comments, shares, verified,
                   location, full_description, agenda
            FROM events 
            ORDER BY date DESC, time DESC
        """)
        events = cursor.fetchall()
        
        events_list = []
        for event in events:
            event_dict = {
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
                'verified': event[10],
                'location': event[11],
                'fullDescription': event[12],
                'agenda': event[13].split('\n') if event[13] else None
            }
            events_list.append(event_dict)
        
        return jsonify({'events': events_list}), 200
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

# Get specific event by ID
@app.route('/api/events/<int:id>', methods=['GET'])
def get_event(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, title, description, date, time, college, 
                   image, likes, comments, shares, verified,
                   location, full_description, agenda
            FROM events 
            WHERE id = %s
        """, (id,))
        
        event = cursor.fetchone()
        
        if event:
            event_data = {
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
                'verified': event[10],
                'location': event[11],
                'fullDescription': event[12],
                'agenda': event[13].split('\n') if event[13] else None
            }
            return jsonify(event_data), 200
        return jsonify({'message': 'Event not found'}), 404
            
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

# Create new event
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
                image, likes, comments, shares, verified,
                location, full_description, agenda
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            data['title'], 
            data['description'], 
            date, 
            time, 
            data['college'],
            data.get('image', '/api/placeholder/600/300'),
            0, 0, 0, True,
            data.get('location'),
            data.get('fullDescription', data['description']),
            '\n'.join(data.get('agenda', [])) if data.get('agenda') else None
        ))
        
        new_event_id = cursor.fetchone()[0]
        conn.commit()
        
        return jsonify({
            'message': 'Event created successfully',
            'event_id': new_event_id
        }), 201
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)