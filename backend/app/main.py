from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .shinobi_api import get_monitors, set_recording, delete_recordings
from .auth import authenticate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/monitors")
async def monitors(auth: bool = Depends(authenticate)):
    return await get_monitors()

@app.post("/monitors/record")
async def record(action: dict, auth: bool = Depends(authenticate)):
    monitor_ids = action.get("monitors", [])
    enable = action.get("enable", True)
    return await set_recording(monitor_ids, enable)

@app.post("/monitors/delete")
async def delete(action: dict, auth: bool = Depends(authenticate)):
    monitor_ids = action.get("monitors", [])
    from_date = action.get("from")
    to_date = action.get("to")
    return await delete_recordings(monitor_ids, from_date, to_date)
