from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import bcrypt
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE = 'rs_bazar.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with app.app_context():
        db = get_db()
        db.execute('''CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            is_admin BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')

        db.execute('''CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            game_title TEXT,
            package_label TEXT,
            uid TEXT,
            server_id TEXT,
            quantity INTEGER DEFAULT 1,
            price REAL,
            total REAL,
            esewa_code TEXT,
            status TEXT DEFAULT 'Pending',
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )''')

        # Insert default admin user if not exists
        admin_exists = db.execute('SELECT id FROM users WHERE username = ?', ('roshanshah',)).fetchone()
        if not admin_exists:
            hashed = bcrypt.hashpw('killer3051Q'.encode('utf-8'), bcrypt.gensalt())
            db.execute('INSERT INTO users (username, email, password_hash, is_admin) VALUES (?, ?, ?, ?)',
                      ('roshanshah', 'roshan@example.com', hashed.decode('utf-8'), 1))

        db.commit()

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

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        db = get_db()
        db.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                  (username, email, hashed.decode('utf-8')))
        db.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username or email already exists'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('identifier')  # username or email
    password = data.get('password')

    if not all([identifier, password]):
        return jsonify({'error': 'Username/email and password required'}), 400

    db = get_db()
    user = db.execute('SELECT * FROM users WHERE username = ? OR email = ?',
                     (identifier, identifier)).fetchone()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'is_admin': bool(user['is_admin'])
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/orders', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400

    db = get_db()
    orders = db.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY timestamp DESC', (user_id,)).fetchall()
    return jsonify([dict(order) for order in orders]), 200

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    orders_data = data.get('orders', [])

    if not user_id or not orders_data:
        return jsonify({'error': 'User ID and orders data required'}), 400

    db = get_db()
    for order in orders_data:
        db.execute('''INSERT INTO orders
                     (user_id, game_title, package_label, uid, server_id, quantity, price, total, esewa_code, status)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                  (user_id, order.get('gameTitle'), order.get('packageLabel'), order.get('uid'),
                   order.get('serverId'), order.get.get('quantity', 1), order.get('price', 0),
                   order.get('total', 0), order.get('esewaCode'), order.get('status', 'Pending')))

    db.commit()
    return jsonify({'message': 'Orders saved successfully'}), 201

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    data = request.get_json()
    status = data.get('status')

    if not status:
        return jsonify({'error': 'Status required'}), 400

    db = get_db()
    db.execute('UPDATE orders SET status = ? WHERE id = ?', (status, order_id))
    db.commit()
    return jsonify({'message': 'Order status updated'}), 200

@app.route('/api/admin/orders', methods=['GET'])
def get_all_orders():
    db = get_db()
    orders = db.execute('''SELECT o.*, u.username, u.email
                          FROM orders o
                          LEFT JOIN users u ON o.user_id = u.id
                          ORDER BY o.timestamp DESC''').fetchall()
    return jsonify([dict(order) for order in orders]), 200

@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    db = get_db()
    users = db.execute('SELECT id, username, email, is_admin, created_at FROM users').fetchall()
    return jsonify([dict(user) for user in users]), 200

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
