import axios from "axios";

const API = axios.create({
  baseURL: "http://10.0.0.38:8000",
  auth: { username: "admin", password: "password" }
});

export const fetchMonitors = () => API.get("/monitors");
export const toggleRecording = (monitors, enable) => API.post("/monitors/record", { monitors, enable });
export const deleteRecordings = (monitors, from, to) => API.post("/monitors/delete", { monitors, from, to });
