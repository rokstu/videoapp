import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MonitorCard from "./components/MonitorCard";
import { fetchMonitors } from "./api";
import { Container, Grid } from "@mui/material";

export default function App() {
  const [monitors, setMonitors] = useState([]);
  const [selected, setSelected] = useState([]);

  const loadMonitors = async () => {
    const res = await fetchMonitors();
    setMonitors(res.data);
  };

  useEffect(() => { loadMonitors(); }, []);

  return (
    <>
      <Header monitors={monitors} selected={selected} setSelected={setSelected} reload={loadMonitors} />
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          {monitors.map(m => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={m.id}>
              <MonitorCard monitor={m} selected={selected} setSelected={setSelected} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
