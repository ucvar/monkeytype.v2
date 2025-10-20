from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.text import router as router_generate_words
from app.api.auth import router as auth_router
from app.db import init_models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_generate_words)
app.include_router(auth_router)

@app.get("/")
async def get_root():
    await init_models()
    return {"what": "what"}
