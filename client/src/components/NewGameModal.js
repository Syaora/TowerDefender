import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react"

export default function NewGameModal({ open, onClose, handleNewGame}) {
  const [name, setName] = useState("")

  function onNameChange(event) {
    setName(event.target.value)
  }

  function onSubmit() {
    setName("")
    handleNewGame(name)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Game</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          value={name}
          onChange={onNameChange}
          fullWidth
          required
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}