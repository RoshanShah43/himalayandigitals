from pathlib import Path

from flask import Flask, send_from_directory

ROOT = Path(__file__).resolve().parent
app = Flask(__name__)


@app.route('/')
def index():
    return send_from_directory(ROOT, 'index.html')


@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(ROOT, filename)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
