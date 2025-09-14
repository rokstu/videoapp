import httpx
import os

SHINOBI_URL = os.getenv("SHINOBI_URL", "http://shinobi:8080")
API_KEY = os.getenv("SHINOBI_API_KEY", "your_api_key")

async def get_monitors():
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{SHINOBI_URL}/api/monitor", params={"token": API_KEY})
        data = r.json()
        monitors = []
        for m in data.get("monitors", {}).values():
            monitors.append({
                "id": m["id"],
                "name": m["name"],
                "status": "Recording" if m["isRecording"] else "Watching",
                "image": f"{SHINOBI_URL}/{m['image']}"
            })
        return monitors

async def set_recording(monitor_ids, enable=True):
    async with httpx.AsyncClient() as client:
        for monitor_id in monitor_ids:
            await client.post(
                f"{SHINOBI_URL}/api/monitor/{monitor_id}/record",
                params={"token": API_KEY, "on": int(enable)}
            )
        return {"success": True}

async def delete_recordings(monitor_ids, from_date=None, to_date=None):
    async with httpx.AsyncClient() as client:
        for monitor_id in monitor_ids:
            await client.post(
                f"{SHINOBI_URL}/api/monitor/{monitor_id}/delete",
                params={"token": API_KEY, "from": from_date, "to": to_date}
            )
        return {"success": True}
