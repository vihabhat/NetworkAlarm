from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import psycopg2

# Initialize Flask app and configure CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allowing only your frontend's origin

# Database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="NetworkAlarmDB",
            user="postgres",
            password="postgres",
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {str(e)}")
        raise

# User registration route
@app.route('/api/logins', methods=['POST'])
def register_user():
    # Get data from request
    data = request.get_json()

    # Extract user data from the request
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

    # Basic validation
    if not name or not college_name or not email or not phone or not college_id or not username or not password:
        return jsonify({"message": "All fields are required"}), 400
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    # Create a new user in the database
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert user data into the users table
        cursor.execute("""
            INSERT INTO users (name, college_name, email, phone, college_id, username, password, year_of_study, address)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (name, college_name, email, phone, college_id, username, password, year_of_study, address))
        
        # Commit the transaction and close the connection
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# User login route (for later use)
@app.route('/api/logins/login', methods=['POST'])
def login_user():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if the user exists in the database
        cursor.execute("""
            SELECT * FROM users WHERE email = %s AND password = %s
        """, (email, password))

        user = cursor.fetchone()

        if user:
            # Redirect to the home page
            return redirect("http://localhost:5173/home")
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# Add these routes to your existing Flask app

@app.route('/api/events', methods=['GET'])
def get_events():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get all events
        cursor.execute("""
            SELECT id, title, description, 
                   date::text, time::text, college, 
                   image, likes, comments, shares, verified 
            FROM events 
            ORDER BY date DESC, time DESC;
        """)
        
        columns = [desc[0] for desc in cursor.description]
        events = []
        for row in cursor.fetchall():
            events.append(dict(zip(columns, row)))
        
        return jsonify({'events': events}), 200
        
    except Exception as e:
        print(f"Error in get_events: {str(e)}")
        return jsonify({
            'message': 'Internal server error', 
            'error': str(e)
        }), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/events', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description', 'date', 'time', 'college', 'image']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                'message': 'Missing required fields',
                'fields': missing_fields
            }), 400

        # Get user email from request headers or token
        user_email = request.headers.get('X-User-Email')
        if not user_email:
            return jsonify({'message': 'User authentication required'}), 401

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # First verify if the user exists and get their college
        cursor.execute("SELECT college_name FROM users WHERE email = %s", (user_email,))
        user_data = cursor.fetchone()
        
        if not user_data:
            return jsonify({'message': 'User not found'}), 404

        # Insert the event with verified status based on user's college
        is_verified = data['college'] == user_data[0]  # Auto-verify if user's college matches
        
        cursor.execute("""
            INSERT INTO events (
                title, description, date, time, college, 
                image, likes, comments, shares, verified,
                created_by
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, title, description, date::text, time::text, 
                      college, image, likes, comments, shares, verified
        """, (
            data['title'], data['description'], data['date'], 
            data['time'], data['college'], data['image'],
            0, 0, 0, is_verified, user_email
        ))
        
        new_event = dict(zip([
            'id', 'title', 'description', 'date', 'time', 
            'college', 'image', 'likes', 'comments', 'shares', 'verified'
        ], cursor.fetchone()))
        
        conn.commit()
        
        return jsonify({
            'message': 'Event created successfully',
            'event': new_event
        }), 201
        
    except psycopg2.Error as e:
        conn.rollback()
        return jsonify({
            'message': 'Database error',
            'error': str(e)
        }), 500
    except Exception as e:
        return jsonify({
            'message': 'Internal server error',
            'error': str(e)
        }), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
@app.route('/api/user/<email>', methods=['GET'])
def get_user(email):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT name, email, college_name, college_id 
            FROM users 
            WHERE email = %s
        """, (email,))
        
        user = cursor.fetchone()
        
        if user:
            user_data = {
                'name': user[0],
                'email': user[1],
                'college_name': user[2],
                'college_id': user[3]
            }
            return jsonify(user_data), 200
        else:
            return jsonify({'message': 'User not found'}), 404
            
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
