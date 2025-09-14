import React from "react";
import { Card, CardContent, CardMedia, Typography, Checkbox, Box } from "@mui/material";

export default function MonitorCard({ monitor, selected, setSelected }) {
  const toggle = () => setSelected(prev => prev.includes(monitor.id) ? prev.filter(id => id !== monitor.id) : [...prev, monitor.id]);

  return (
    <Card>
      <CardMedia component="img" height="140" image={monitor.image} alt={monitor.name} />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{monitor.name}</Typography>
          <Checkbox checked={selected.includes(monitor.id)} onChange={toggle} />
        </Box>
        <Typography>
          <span style={{ color: monitor.status === "Recording" ? "red" : "gray" }}>●</span> {monitor.status}
        </Typography>
      </CardContent>
    </Card>
  );
}
