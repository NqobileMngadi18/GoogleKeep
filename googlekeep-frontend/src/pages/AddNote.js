import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reminder, setReminder] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, content, reminder };

    try {
      await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      navigate("/"); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card
        sx={{
          width: 400,
          p: 2,
          borderRadius: 3,
          boxShadow: 6,
          mt: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add a Note ✍️
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="datetime-local"
              label="Reminder"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Note
            </Button>

            <Button type="cancel" variant="contained" color="white" fullWidth sx={{ mt: 2}}>
              Cancel
            </Button>

          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddNote;
