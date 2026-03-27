const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

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
      signal: controller.signal,
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

  if (!title) {
    return { ok: false, message: "Title is required." };
  }

  const volunteerLink = body.volunteerLink ? String(body.volunteerLink).trim() : "";
  const registerLink = body.registerLink ? String(body.registerLink).trim() : "";
  const category = String(body.category || "upcoming").toLowerCase();

  if (!["upcoming", "past", "marquee"].includes(category)) {
    return { ok: false, message: "Category must be upcoming, past, or marquee." };
  }

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
      category,
      volunteerLink,
      registerLink,
    },
  };
}

// GET /events
router.get("/", async (req, res) => {
  try {
    const category = req.query.category ? String(req.query.category).toLowerCase() : "";
    const query = {};
    if (category) {
      if (!["upcoming", "past", "marquee"].includes(category)) {
        return res.status(400).json({ message: "Invalid category filter." });
      }
      query.category = category;
    }
    const events = await Event.find(query).sort({ createdAt: -1 });
    return res.json(events);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events." });
  }
});

// POST /events
router.post("/", async (req, res) => {
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
        message: `${link.label} link must be a valid Google Form URL (forms.gle or docs.google.com/forms).`,
      });
    }
  }

  try {
    const createdEvent = await Event.create(normalized.event);
    return res.status(201).json(createdEvent);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create event." });
  }
});

// DELETE /events/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found." });
    }
    return res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid event id." });
  }
});

module.exports = router;
