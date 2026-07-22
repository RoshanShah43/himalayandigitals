<<<<<<< HEAD
# Gems Assistant

Gems Assistant is an AI-powered desktop assistant for Windows. It listens for a wake word ("Gems"), can converse in any language, translate, give suggestions, and execute user commands. On first run, it requests permission to access device controls and is set to run at startup.

## Features
- Wake word activation ("Gems")
- Speech recognition and text-to-speech
- Multilingual conversation and translation
- Suggestions and contextual help
- Device control (with user permission)
- Runs at Windows startup

## Setup
1. Install Python 3.9+
2. Install dependencies: `pip install -r requirements.txt`
3. Run `main.py` to start the assistant

## Permissions
On first run, the assistant will request permission to access device controls. Grant permissions as needed for full functionality.

---
This is a prototype. Some features (like full device control) may require additional setup or admin rights.

## Demo Top‑Up Backend (optional)
To run the demo backend used by the sample frontend:

1. Install backend deps (already included):

```bash
pip install -r requirements.txt
```

2. Run the backend server:

```bash
python backend.py
```

3. Open `hlo.html` in your browser. The page will POST to `http://127.0.0.1:5000/api/topup` when you submit the form.

Notes:
- This backend is a lightweight demo that simulates creating an order. Integrate a real payment gateway and operator APIs to make it production-ready.

=======
# himalayandigitals
>>>>>>> 772a9cd5e04666fcb9cdf3f3d0271ea42c04b50e
