import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const colors = [
  "#FFF9C4",
  "#C8E6C9", 
  "#BBDEFB", 
  "#FFE0B2", 
  "#F8BBD0", 
  "#D1C4E9", 
];

function Home() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then(setNotes)
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Google Keep Notes
      </Typography>

      <Grid container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
            <Card
              sx={{
                backgroundColor: colors[index % colors.length],
                borderRadius: 2,
                boxShadow: 3,
                minHeight: 120,
                position: "relative",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {note.title}
                </Typography>
                <Typography variant="body2">{note.content}</Typography>
                {note.reminder && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1, color: "text.secondary" }}
                  >
                    ⏰ {new Date(note.reminder).toLocaleString()}
                  </Typography>
                )}
              </CardContent>

              <IconButton
                onClick={() => handleDelete(note.id)}
                sx={{ position: "absolute", top: 5, right: 5 }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => navigate("/add")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default Home;
