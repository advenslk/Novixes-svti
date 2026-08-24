import { Router } from "express";

const router = Router();

const services = [
  {
    slug: "game-hosting",
    title: "Game servers",
    sub: "Low-latency worlds",
    color: "violet",
    desc: "Deploy Minecraft, Rust, Valheim and more with a panel built for play.",
    stat: "14 ms avg. latency",
    category: "Gaming",
  },
  {
    slug: "vps",
    title: "Cloud VPS",
    sub: "Your slice of the cloud",
    color: "cyan",
    desc: "Reliable virtual servers with NVMe speed, full root access and snapshots.",
    stat: "99.99% network uptime",
    category: "Compute",
  },
  {
    slug: "vds",
    title: "Dedicated VDS",
    sub: "Isolation by design",
    color: "purple",
    desc: "Guaranteed resources for workloads where predictable performance matters.",
    stat: "AMD EPYC compute",
    category: "Compute",
  },
  {
    slug: "web-hosting",
    title: "Web hosting",
    sub: "Sites that stay up",
    color: "blue",
    desc: "Managed hosting, edge caching and an SSL certificate included.",
    stat: "Global edge routing",
    category: "Web",
  },
  {
    slug: "bot-hosting",
    title: "Bot hosting",
    sub: "Always-on automations",
    color: "pink",
    desc: "Keep Discord bots, agents and background processes online around the clock.",
    stat: "Instant Git deploys",
    category: "Tools",
  },
  {
    slug: "domains",
    title: "Domains",
    sub: "Name your next thing",
    color: "amber",
    desc: "Search, register and manage the address your project deserves.",
    stat: "Transparent renewals",
    category: "Tools",
  },
];

router.get("/services", (_req, res) => {
  return res.json({ services });
});

export default router;
