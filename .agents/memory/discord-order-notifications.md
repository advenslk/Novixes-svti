---
name: Discord order notifications
description: How ArveX purchase notifications reach Discord.
---

ArveX cannot post to a Discord channel from a channel URL alone. The order endpoint requires a Discord webhook URL stored as a Replit Secret; keep that credential server-side and never expose it in the browser.

**Why:** Discord channel links identify a location but do not grant an application permission to send messages.

**How to apply:** For future order, support, or admin notifications, use the configured webhook through the API server and keep the frontend limited to calling the server endpoint.