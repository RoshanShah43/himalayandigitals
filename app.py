from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import bcrypt
import os
import random
import string
from datetime import datetime
import requests
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

# Supabase setup
SUPABASE_URL = "https://verlqmqpysxtwzbaybni.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcmxxbXFweXN4dHd6YmF5Ym5pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDA2MjgzMywiZXhwIjoyMDg5NjM4ODMzfQ.C29wWhN8txk8vD91ZFGRwBQNTFd15OxPR5QR3tx3uR4"
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', '')
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def init_db():
    """Initialize Supabase tables if they don't exist"""
    try:
        # Create users table
        supabase.table('users').select('*').limit(1).execute()
    except:
        print("Users table will be created via Supabase dashboard")
    
    # Insert default admin user if not exists
    try:
        admin = supabase.table('users').select('id').eq('username', 'roshanshah').execute()
        if not admin.data:
            hashed = bcrypt.hashpw('killer3051Q'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            supabase.table('users').insert({
                'username': 'roshanshah',
                'email': 'roshan@example.com',
                'password_hash': hashed,
                'is_admin': True
            }).execute()
            print("Default admin user created")
    except Exception as e:
        print(f"Admin user initialization error: {e}")


def build_unique_google_username(email):
    base = (email.split('@')[0] or 'google_user').replace('.', '_').replace(' ', '_').lower()
    candidate = base[:24]
    suffix = 1
    while True:
        try:
            response = supabase.table('users').select('id').eq('username', candidate).execute()
            if not response.data:
                return candidate
            candidate = f"{base[:20]}_{suffix}"
            suffix += 1
        except Exception:
            return candidate


def ensure_google_user(email, full_name=''):
    existing = supabase.table('users').select('*').eq('email', email).execute()
    if existing.data:
        return existing.data[0]

    username = build_unique_google_username(email)
    password_hash = bcrypt.hashpw(f"google-oauth:{email}".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = supabase.table('users').insert({
        'username': username,
        'email': email,
        'password_hash': password_hash,
        'is_admin': False
    }).execute()

    return new_user.data[0] if new_user.data else None

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'error': 'All fields required'}), 400

    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        supabase.table('users').insert({
            'username': username,
            'email': email,
            'password_hash': hashed,
            'is_admin': False
        }).execute()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'Username or email already exists'}), 400

@app.route('/api/google-config', methods=['GET'])
def google_config():
    return jsonify({'clientId': GOOGLE_CLIENT_ID}), 200


@app.route('/api/google-login', methods=['POST'])
def google_login():
    if not GOOGLE_CLIENT_ID:
        return jsonify({'error': 'Google login is not configured on the server'}), 503

    data = request.get_json() or {}
    id_token = data.get('id_token')

    if not id_token:
        return jsonify({'error': 'Google id_token required'}), 400

    try:
        verify_response = requests.get(
            'https://oauth2.googleapis.com/tokeninfo',
            params={'id_token': id_token},
            timeout=10
        )
        verify_response.raise_for_status()
        payload = verify_response.json()
    except Exception as e:
        return jsonify({'error': f'Google token verification failed: {str(e)}'}), 401

    if payload.get('aud') != GOOGLE_CLIENT_ID:
        return jsonify({'error': 'Google token audience mismatch'}), 401

    if payload.get('iss') not in ('https://accounts.google.com', 'accounts.google.com'):
        return jsonify({'error': 'Google token issuer mismatch'}), 401

    if not payload.get('email_verified'):
        return jsonify({'error': 'Google email is not verified'}), 401

    email = (payload.get('email') or '').lower().strip()
    if not email:
        return jsonify({'error': 'Google account email missing'}), 400

    user = ensure_google_user(email, payload.get('name', ''))
    if not user:
        return jsonify({'error': 'Unable to create Google user account'}), 500

    return jsonify({
        'message': 'Google login successful',
        'user': {
            'id': user['id'],
            'username': user['username'],
            'email': user['email'],
            'is_admin': bool(user.get('is_admin', False))
        }
    }), 200


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('identifier')  # username or email
    password = data.get('password')

    if not all([identifier, password]):
        return jsonify({'error': 'Username/email and password required'}), 400

    try:
        user_response = supabase.table('users').select('*').or_(
            f"username.eq.{identifier},email.eq.{identifier}"
        ).execute()
        
        if user_response.data:
            user = user_response.data[0]
            if bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                return jsonify({
                    'message': 'Login successful',
                    'user': {
                        'id': user['id'],
                        'username': user['username'],
                        'email': user['email'],
                        'is_admin': bool(user['is_admin'])
                    }
                }), 200
        
        return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400

    try:
        orders_response = supabase.table('orders').select('*').eq('user_id', user_id).order('timestamp', desc=True).execute()
        return jsonify(orders_response.data), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch orders: {str(e)}'}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    orders_data = data.get('orders', [])

    if not user_id or not orders_data:
        return jsonify({'error': 'User ID and orders data required'}), 400

    try:
        for order in orders_data:
            supabase.table('orders').insert({
                'user_id': user_id,
                'game_title': order.get('gameTitle'),
                'package_label': order.get('packageLabel'),
                'uid': order.get('uid'),
                'server_id': order.get('serverId'),
                'quantity': order.get('quantity', 1),
                'price': order.get('price', 0),
                'total': order.get('total', 0),
                'esewa_code': order.get('esewaCode'),
                'status': order.get('status', 'Pending')
            }).execute()
        
        return jsonify({'message': 'Orders saved successfully'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create orders: {str(e)}'}), 500

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    data = request.get_json()
    status = data.get('status')

    if not status:
        return jsonify({'error': 'Status required'}), 400

    try:
        supabase.table('orders').update({'status': status}).eq('id', order_id).execute()
        return jsonify({'message': 'Order status updated'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update order: {str(e)}'}), 500

@app.route('/api/admin/orders', methods=['GET'])
def get_all_orders():
    try:
        orders_response = supabase.table('orders').select('*, users(username, email)').order('timestamp', desc=True).execute()
        return jsonify(orders_response.data), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch orders: {str(e)}'}), 500

@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    try:
        users_response = supabase.table('users').select('id, username, email, is_admin, created_at').execute()
        return jsonify(users_response.data), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch users: {str(e)}'}), 500

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/login.html')
def serve_login():
    return send_from_directory('.', 'login.html')

@app.route('/profile.html')
def serve_profile():
    return send_from_directory('.', 'profile.html')

@app.route('/admin.html')
def serve_admin():
    return send_from_directory('.', 'admin.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)