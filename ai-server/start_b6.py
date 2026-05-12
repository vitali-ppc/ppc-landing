"""Entry point для B6 сервера (с Socket.IO).

Использование:
    python start_b6.py
"""
import os
import uvicorn
from dotenv import load_dotenv

load_dotenv(override=True)

if __name__ == "__main__":
    port = int(os.getenv("AI_SERVER_PORT", "8000"))
    reload = os.getenv("AI_SERVER_RELOAD", "true").lower() == "true"
    print(f"🚀 B6 server on http://localhost:{port} (Socket.IO at /socket.io/)")
    uvicorn.run(
        "app:socket_app",
        host=os.getenv("AI_SERVER_HOST", "0.0.0.0"),
        port=port,
        reload=reload,
        log_level="info",
    )
