import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Create HTTP + Socket.IO server
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // allow frontend
});

// Health check
app.get("/", (req, res) => {
  res.send("Google Keep Backend is running 🚀");
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
});

// Create a note
app.post("/api/notes", async (req, res) => {
  const { title, content, reminder } = req.body;

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        reminder: reminder ? new Date(reminder) : null,
      },
    });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes
app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});


app.get("/api/reminders", async (req, res) => {
  const reminders = await prisma.note.findMany({
    where: { reminder: { not: null } },
  });
  res.json(reminders);
});


cron.schedule("* * * * *", async () => {
  console.log("⏰ Checking reminders...");

  const now = new Date();
  const upcoming = new Date(now.getTime() + 60 * 1000);

  const dueReminders = await prisma.note.findMany({
    where: {
      reminder: { gte: now, lt: upcoming },
    },
  });

  if (dueReminders.length > 0) {
    dueReminders.forEach((note) => {
      console.log(`🔔 Reminder: ${note.title}`);
      io.emit("reminder", note); 
    });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
