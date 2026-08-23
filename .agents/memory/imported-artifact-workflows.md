---
name: Imported artifact workflows
description: Replit-specific behavior when imported artifact metadata is present but the artifact registry and workflow list are empty.
---

Imported projects can contain a valid `.replit-artifact/artifact.toml` while still having no registered artifact or managed workflow. In that state, the preview can appear blank even when the frontend source is healthy.

**Why:** A stopped or never-created workflow prevents Vite from receiving the required runtime environment and opening the preview port; artifact preview helpers may also reject the unregistered artifact.

**How to apply:** Check `listArtifacts()` and `listWorkflows()` early. If both are empty, use a descriptive project workflow for the existing app, provide its required `PORT` and `BASE_PATH`, and verify the local response/logs directly.