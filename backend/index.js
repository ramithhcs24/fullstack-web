const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

function isGoogleFormsUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    return host === "forms.gle" || host === "docs.google.com";
  } catch (error) {
    return false;
  }
}

async function verifyGoogleFormsRedirect(urlString) {
  if (!isGoogleFormsUrl(urlString)) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(urlString, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response || !response.url) {
      return false;
    }

    return isGoogleFormsUrl(response.url);
  } catch (error) {
    return false;
  }
}

function normalizeIncomingEvent(body) {
  const type = String(body.type || "").toLowerCase();
  if (!["volunteer", "register", "both"].includes(type)) {
    return { ok: false, message: "Type must be volunteer, register, or both." };
  }

  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const club = String(body.club || "").trim();
  if (!title || !description || !club) {
    return { ok: false, message: "Title, description, and club are required." };
  }

  const volunteerLink = body.volunteerLink ? String(body.volunteerLink).trim() : "";
  const registerLink = body.registerLink ? String(body.registerLink).trim() : "";

  if (type === "volunteer" && !volunteerLink) {
    return { ok: false, message: "Volunteer link is required for volunteer type." };
  }

  if (type === "register" && !registerLink) {
    return { ok: false, message: "Register link is required for register type." };
  }

  if (type === "both" && (!volunteerLink || !registerLink)) {
    return { ok: false, message: "Both volunteer and register links are required." };
  }

  return {
    ok: true,
    event: {
      title,
      description,
      club,
      type,
      volunteerLink,
      registerLink
    }
  };
}

let events = [
  {
    id: 1,
    title: "Test Event",
    description: "24-hour coding event",
    club: "Coding Club",
    type: "both",
    volunteerLink: "https://forms.gle/demoVolunteer",
    registerLink: "https://forms.gle/demoRegister"
  }
];

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    endpoints: {
      getEvents: "GET /events",
      addEvent: "POST /events",
      deleteEvent: "DELETE /events/:id"
    }
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET events
app.get("/events", (req, res) => {
  res.json(events);
});

// POST event
app.post("/events", async (req, res) => {
  const normalized = normalizeIncomingEvent(req.body);
  if (!normalized.ok) {
    return res.status(400).json({ message: normalized.message });
  }

  const { type, volunteerLink, registerLink } = normalized.event;
  const linksToCheck = [];
  if (type === "volunteer" || type === "both") {
    linksToCheck.push({ label: "Volunteer", url: volunteerLink });
  }
  if (type === "register" || type === "both") {
    linksToCheck.push({ label: "Register", url: registerLink });
  }

  for (const link of linksToCheck) {
    const valid = await verifyGoogleFormsRedirect(link.url);
    if (!valid) {
      return res.status(400).json({
        message: `${link.label} link must be a valid Google Form URL (forms.gle or docs.google.com/forms).`
      });
    }
  }

  const newEvent = { id: Date.now(), ...normalized.event };
  events.push(newEvent);
  res.json(newEvent);
});

// DELETE event
app.delete("/events/:id", (req, res) => {
  events = events.filter(e => e.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});