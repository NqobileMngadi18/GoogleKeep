import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Google Keep Backend is running 🚀");
});

// Create a note
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = await prisma.note.create({
    data: { title, content }
  });
  res.json(note);
});

// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
