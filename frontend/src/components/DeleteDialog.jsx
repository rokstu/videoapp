import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox, TextField, Typography } from "@mui/material";

export default function DeleteDialog({ open, onCancel, onDelete }) {
  const [period, setPeriod] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleDelete = () => onDelete(period ? { from, to } : null);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Удаление записей</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={<Checkbox checked={period} onChange={e => setPeriod(e.target.checked)} />}
          label="Удалить за период"
        />
        {period && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <TextField type="date" label="С" value={from} onChange={e => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} />
            <TextField type="date" label="По" value={to} onChange={e => setTo(e.target.value)} InputLabelProps={{ shrink: true }} />
          </div>
        )}
        {!period && <Typography>Будут удалены все записи выбранных мониторов.</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={handleDelete} variant="contained" color="error">Продолжить</Button>
      </DialogActions>
    </Dialog>
  );
}
