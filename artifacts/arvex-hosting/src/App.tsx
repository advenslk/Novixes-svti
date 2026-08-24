import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@workspace/replit-auth-web';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useRoute } from 'wouter';
import {
  Activity, ArrowRight, BadgeCheck, BarChart3, Bell, Bot, Box, Check, CheckCircle2,
  ChevronDown, ChevronRight, CircleHelp, ClipboardList, Cloud, Code2, CreditCard,
  Database, ExternalLink, FileText, Gamepad2, Globe2, Headphones, LayoutDashboard,
  LockKeyhole, LogIn, Menu, MessageSquare, Minus, Monitor, Network, Plus, Rocket,
  Search, Send, Server, Settings, ShieldCheck, ShoppingCart, Sparkles, Terminal,
  Ticket, Users, WalletCards, X, Zap,
  Car,
} from 'lucide-react';
import logo from '@assets/file_00000000c94881faba7bb966aafaf4ff_1787475547805.png';

const queryClient = new QueryClient();

const gameCatalog = [
  {
    slug: 'minecraft-java',
    title: 'Minecraft Java Edition',
    short: 'Minecraft Java',
    desc: 'High-performance Minecraft Java servers with plugin, mod and custom jar support.',
    icon: Gamepad2,
  },
  {
    slug: 'minecraft-bedrock',
    title: 'Minecraft Bedrock Edition',
    short: 'Minecraft Bedrock',
    desc: 'Fast Bedrock servers for mobile, console and Windows players.',
    icon: Gamepad2,
  },
  {
    slug: 'palworld',
    title: 'Palworld',
    short: 'Palworld',
    desc: 'Powerful dedicated Palworld servers for your community and friends.',
    icon: Server,
  },
  {
    slug: 'rust',
    title: 'Rust',
    short: 'Rust',
    desc: 'Performance-focused Rust servers with reliable uptime and low latency.',
    icon: ShieldCheck,
  },
  {
    slug: 'ark-survival-evolved',
    title: 'ARK: Survival Evolved',
    short: 'ARK: Survival Evolved',
    desc: 'Dedicated ARK servers built for tribes, communities and long-running worlds.',
    icon: Database,
  },
  {
    slug: 'ark-survival-ascended',
    title: 'ARK: Survival Ascended',
    short: 'ARK: Survival Ascended',
    desc: 'Modern ARK hosting with dedicated resources for demanding worlds.',
    icon: Database,
  },
  {
    slug: 'terraria',
    comingSoon: true,
    title: 'Terraria',
    short: 'Terraria',
    desc: 'Lightweight and reliable Terraria servers for friends and communities.',
    icon: Gamepad2,
  },
  {
    slug: 'project-zomboid',
    comingSoon: true,
    title: 'Project Zomboid',
    short: 'Project Zomboid',
    desc: 'Stable Project Zomboid hosting for persistent multiplayer.',
    icon: Activity,
  },
  {
    slug: 'fivem',
    title: 'FiveM / GTA V',
    short: 'FiveM / GTA V',
    desc: 'Dedicated FiveM infrastructure for custom GTA V roleplay communities.',
    icon: Car,
  },
];


const gamePlans = {
  'minecraft-java': [
    {name:'ARX-02', price:230, currency:"LKR", cpu:'150% CPU', ram:'2 GB', disk:'20 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-04', price:460, currency:"LKR", cpu:'250% CPU', ram:'4 GB', disk:'40 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-06', price:690, currency:"LKR", cpu:'350% CPU', ram:'6 GB', disk:'60 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-08', price:920, currency:"LKR", cpu:'450% CPU', ram:'8 GB', disk:'80 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-10', price:1150, currency:"LKR", cpu:'550% CPU', ram:'10 GB', disk:'100 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-12', price:1380, currency:"LKR", cpu:'650% CPU', ram:'12 GB', disk:'120 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-16', price:1840, currency:"LKR", cpu:'800% CPU', ram:'16 GB', disk:'160 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-24', price:2300, currency:"LKR", cpu:'1000% CPU', ram:'24 GB', disk:'240 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-32', price:2760, currency:"LKR", cpu:'1200% CPU', ram:'32 GB', disk:'320 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-48', price:3450, currency:"LKR", cpu:'1600% CPU', ram:'48 GB', disk:'480 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ARX-64', price:3890, currency:"LKR", cpu:'2000% CPU', ram:'64 GB', disk:'640 GB NVMe SSD', transfer:'DDoS Protection'},
  ],

  'minecraft-bedrock': [
    {name:'BRX-02', price:230, currency:"LKR", cpu:'150% CPU', ram:'2 GB', disk:'20 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-04', price:460, currency:"LKR", cpu:'250% CPU', ram:'4 GB', disk:'40 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-06', price:690, currency:"LKR", cpu:'350% CPU', ram:'6 GB', disk:'60 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-08', price:920, currency:"LKR", cpu:'450% CPU', ram:'8 GB', disk:'80 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-10', price:1150, currency:"LKR", cpu:'550% CPU', ram:'10 GB', disk:'100 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-12', price:1380, currency:"LKR", cpu:'650% CPU', ram:'12 GB', disk:'120 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-16', price:1840, currency:"LKR", cpu:'800% CPU', ram:'16 GB', disk:'160 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-24', price:2300, currency:"LKR", cpu:'1000% CPU', ram:'24 GB', disk:'240 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-32', price:2760, currency:"LKR", cpu:'1200% CPU', ram:'32 GB', disk:'320 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-48', price:3450, currency:"LKR", cpu:'1600% CPU', ram:'48 GB', disk:'480 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'BRX-64', price:3890, currency:"LKR", cpu:'2000% CPU', ram:'64 GB', disk:'640 GB NVMe SSD', transfer:'DDoS Protection'},
  ],

  'palworld': [
    {name:'PAL-04', price:690, currency:"LKR", cpu:'300% CPU', ram:'4 GB', disk:'60 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PAL-08', price:1150, currency:"LKR", cpu:'500% CPU', ram:'8 GB', disk:'100 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PAL-12', price:1610, cpu:'700% CPU', ram:'12 GB', disk:'140 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PAL-16', price:2070, cpu:'900% CPU', ram:'16 GB', disk:'180 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PAL-24', price:2760, currency:"LKR", cpu:'1200% CPU', ram:'24 GB', disk:'260 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PAL-32', price:3450, currency:"LKR", cpu:'1500% CPU', ram:'32 GB', disk:'340 GB NVMe SSD', transfer:'DDoS Protection'},
  ],

  'rust': [
    {name:'ARX-RUS 4GB', price:850, currency:"LKR", cpu:'200% CPU', ram:'4 GB', disk:'40 GB NVMe SSD', players:'Up to 20', transfer:'DDoS Protection'},
    {name:'ARX-RUS 6GB', price:1150, currency:"LKR", cpu:'300% CPU', ram:'6 GB', disk:'60 GB NVMe SSD', players:'Up to 30', transfer:'DDoS Protection'},
    {name:'ARX-RUS 8GB', price:1450, currency:"LKR", cpu:'400% CPU', ram:'8 GB', disk:'80 GB NVMe SSD', players:'Up to 40', transfer:'DDoS Protection'},
    {name:'ARX-RUS 10GB', price:1750, currency:"LKR", cpu:'500% CPU', ram:'10 GB', disk:'100 GB NVMe SSD', players:'Up to 50', transfer:'DDoS Protection'},
    {name:'ARX-RUS 12GB', price:2050, currency:"LKR", cpu:'600% CPU', ram:'12 GB', disk:'120 GB NVMe SSD', players:'Up to 60', transfer:'DDoS Protection'},
    {name:'ARX-RUS 16GB', price:2650, currency:"LKR", cpu:'700% CPU', ram:'16 GB', disk:'160 GB NVMe SSD', players:'Up to 80', transfer:'DDoS Protection'},
    {name:'ARX-RUS 24GB', price:3850, currency:"LKR", cpu:'800% CPU', ram:'24 GB', disk:'240 GB NVMe SSD', players:'Up to 100', transfer:'DDoS Protection'},
    {name:'ARX-RUS 32GB', price:5050, currency:"LKR", cpu:'900% CPU', ram:'32 GB', disk:'320 GB NVMe SSD', players:'Up to 150', transfer:'DDoS Protection'},
    {name:'ARX-RUS 48GB', price:6850, currency:"LKR", cpu:'950% CPU', ram:'48 GB', disk:'480 GB NVMe SSD', players:'Up to 200', transfer:'DDoS Protection'},
    {name:'ARX-RUS 64GB', price:8500, currency:"LKR", cpu:'1000% CPU', ram:'64 GB', disk:'640 GB NVMe SSD', players:'250+', transfer:'DDoS Protection'},
  ],

  'ark-survival-evolved': [
    {name:'ARX-ARK 8GB', price:2250, currency:"LKR", cpu:'300% CPU', ram:'8 GB', disk:'100 GB NVMe SSD', players:'Up to 10', transfer:'DDoS Protection'},
    {name:'ARX-ARK 10GB', price:2850, currency:"LKR", cpu:'400% CPU', ram:'10 GB', disk:'120 GB NVMe SSD', players:'Up to 15', transfer:'DDoS Protection'},
    {name:'ARX-ARK 12GB', price:3450, currency:"LKR", cpu:'500% CPU', ram:'12 GB', disk:'150 GB NVMe SSD', players:'Up to 20', transfer:'DDoS Protection'},
    {name:'ARX-ARK 16GB', price:4450, currency:"LKR", cpu:'600% CPU', ram:'16 GB', disk:'200 GB NVMe SSD', players:'Up to 25', transfer:'DDoS Protection'},
    {name:'ARX-ARK 24GB', price:6450, currency:"LKR", cpu:'700% CPU', ram:'24 GB', disk:'300 GB NVMe SSD', players:'Up to 35', transfer:'DDoS Protection'},
    {name:'ARX-ARK 32GB', price:8450, currency:"LKR", cpu:'800% CPU', ram:'32 GB', disk:'400 GB NVMe SSD', players:'Up to 50', transfer:'DDoS Protection'},
    {name:'ARX-ARK 48GB', price:11950, currency:"LKR", cpu:'900% CPU', ram:'48 GB', disk:'550 GB NVMe SSD', players:'Up to 70', transfer:'DDoS Protection'},
    {name:'ARX-ARK 64GB', price:15780, currency:"LKR", cpu:'1000% CPU', ram:'64 GB', disk:'700 GB NVMe SSD', players:'100+', transfer:'DDoS Protection'},
  ],

  'ark-survival-ascended': [
    {name:'ASA-12', price:1610, cpu:'700% CPU', ram:'12 GB', disk:'180 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ASA-16', price:2070, cpu:'900% CPU', ram:'16 GB', disk:'240 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ASA-24', price:2760, currency:"LKR", cpu:'1200% CPU', ram:'24 GB', disk:'360 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ASA-32', price:3450, currency:"LKR", cpu:'1500% CPU', ram:'32 GB', disk:'480 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'ASA-48', price:4140, cpu:'1800% CPU', ram:'48 GB', disk:'640 GB NVMe SSD', transfer:'DDoS Protection'},
  ],

  'terraria': [
    {name:'TER-02', price:230, currency:"LKR", cpu:'150% CPU', ram:'2 GB', disk:'20 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'TER-04', price:460, currency:"LKR", cpu:'250% CPU', ram:'4 GB', disk:'40 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'TER-06', price:690, currency:"LKR", cpu:'350% CPU', ram:'6 GB', disk:'60 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'TER-08', price:920, currency:"LKR", cpu:'450% CPU', ram:'8 GB', disk:'80 GB NVMe SSD', transfer:'DDoS Protection'},
  ],

  'project-zomboid': [
    {name:'PZ-04', price:460, currency:"LKR", cpu:'250% CPU', ram:'4 GB', disk:'60 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PZ-08', price:920, currency:"LKR", cpu:'450% CPU', ram:'8 GB', disk:'100 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PZ-12', price:1380, currency:"LKR", cpu:'650% CPU', ram:'12 GB', disk:'160 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'PZ-16', price:1840, currency:"LKR", cpu:'800% CPU', ram:'16 GB', disk:'220 GB NVMe SSD', transfer:'DDoS Protection'},
  ],

  'fivem': [
    {name:'FIV-04', price:690, currency:"LKR", cpu:'300% CPU', ram:'4 GB', disk:'60 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'FIV-08', price:1150, currency:"LKR", cpu:'500% CPU', ram:'8 GB', disk:'120 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'FIV-12', price:1610, cpu:'700% CPU', ram:'12 GB', disk:'180 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'FIV-16', price:2070, cpu:'900% CPU', ram:'16 GB', disk:'240 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'FIV-24', price:2760, currency:"LKR", cpu:'1200% CPU', ram:'24 GB', disk:'360 GB NVMe SSD', transfer:'DDoS Protection'},
    {name:'FIV-32', price:3450, currency:"LKR", cpu:'1500% CPU', ram:'32 GB', disk:'480 GB NVMe SSD', transfer:'DDoS Protection'},
  ],
} as const;

const fallbackServices = [
  { slug:'game-hosting', title:'Game servers', sub:'Low-latency worlds', icon:Gamepad2, color:'violet', desc:'Deploy Minecraft, Rust, Valheim and more with a panel built for play.', stat:'14 ms avg. latency', category:'Gaming' },
  { slug:'vps', title:'Cloud VPS', sub:'Your slice of the cloud', icon:Cloud, color:'cyan', desc:'Reliable virtual servers with NVMe speed, full root access and snapshots.', stat:'99.99% network uptime', category:'Compute' },
  { slug:'vds', title:'Dedicated VDS', sub:'Isolation by design', icon:Server, color:'purple', desc:'Guaranteed resources for workloads where predictable performance matters.', stat:'AMD EPYC compute', category:'Compute' },
  { slug:'web-hosting', title:'Web hosting', sub:'Sites that stay up', icon:Globe2, color:'blue', desc:'Managed hosting, edge caching and an SSL certificate included.', stat:'Global edge routing', category:'Web' },
  { slug:'bot-hosting', title:'Bot hosting', sub:'Always-on automations', icon:Bot, color:'pink', desc:'Keep Discord bots, agents and background processes online around the clock.', stat:'Instant Git deploys', category:'Tools' },
  { slug:'domains', title:'Domains', sub:'Name your next thing', icon:Network, color:'amber', desc:'Search, register and manage the address your project deserves.', stat:'Transparent renewals', category:'Tools' },
];

type ApiService = {
  slug: string;
  title: string;
  sub: string;
  color: string;
  desc: string;
  stat: string;
  category: string;
};

function useServices() {
  const [loading, setLoading] = useState(false);

  /*
   * ArveX services are intentionally local-first.
   * The API is optional and must NEVER be able to crash
   * or blank the frontend.
   */
  const services = useMemo(() => {
    return fallbackServices.map((service) => ({
      ...service,
      icon: service.icon,
    }));
  }, []);

  /*
   * Keep the API warm in the background only.
   * No rendering depends on this request.
   */
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const loadRemoteServices = async () => {
      try {
        const response = await fetch("/api/services", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (
          cancelled ||
          !data ||
          !Array.isArray(data.services) ||
          data.services.length === 0
        ) {
          return;
        }

        /*
         * Remote data is deliberately not allowed to replace
         * the guaranteed frontend fallback during initial render.
         */
      } catch {
        // API failure must never affect the UI.
      }
    };

    loadRemoteServices();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return {
    services,
    loading,
  };
}

const plans = {
  vps: [{name:'Node 1', price:4.9, cpu:'1 vCPU', ram:'2 GB', disk:'40 GB NVMe', transfer:'2 TB transfer'}, {name:'Node 2', price:8.9, cpu:'2 vCPU', ram:'4 GB', disk:'80 GB NVMe', transfer:'4 TB transfer'}, {name:'Node 4', price:16.9, cpu:'4 vCPU', ram:'8 GB', disk:'160 GB NVMe', transfer:'6 TB transfer'}],
  vds: [{name:'Forge', price:29, cpu:'4 vCPU', ram:'16 GB', disk:'240 GB NVMe', transfer:'10 TB transfer'}, {name:'Titan', price:54, cpu:'8 vCPU', ram:'32 GB', disk:'480 GB NVMe', transfer:'15 TB transfer'}, {name:'Apex', price:96, cpu:'12 vCPU', ram:'64 GB', disk:'960 GB NVMe', transfer:'20 TB transfer'}],
  'web-hosting': [{name:'Launch', price:3.5, cpu:'1 site', ram:'10 GB', disk:'50 GB NVMe', transfer:'Unmetered'}, {name:'Scale', price:7.5, cpu:'10 sites', ram:'25 GB', disk:'120 GB NVMe', transfer:'Unmetered'}, {name:'Studio', price:14, cpu:'Unlimited', ram:'50 GB', disk:'240 GB NVMe', transfer:'Unmetered'}],
  'bot-hosting': [{name:'Hatchling', price:2.9, cpu:'1 vCPU', ram:'512 MB', disk:'5 GB NVMe', transfer:'1 TB transfer'}, {name:'Operator', price:6.9, cpu:'2 vCPU', ram:'2 GB', disk:'20 GB NVMe', transfer:'3 TB transfer'}, {name:'Collective', price:12.9, cpu:'4 vCPU', ram:'4 GB', disk:'40 GB NVMe', transfer:'6 TB transfer'}],
  'game-hosting': [
    {name:'ARX-02', price:230, currency:"LKR", cpu:'150% CPU', ram:'2 GB', disk:'20 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-04', price:460, currency:"LKR", cpu:'250% CPU', ram:'4 GB', disk:'40 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-06', price:690, currency:"LKR", cpu:'350% CPU', ram:'6 GB', disk:'60 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-08', price:920, currency:"LKR", cpu:'450% CPU', ram:'8 GB', disk:'80 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-10', price:1150, currency:"LKR", cpu:'550% CPU', ram:'10 GB', disk:'100 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-12', price:1380, currency:"LKR", cpu:'650% CPU', ram:'12 GB', disk:'120 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-16', price:1840, currency:"LKR", cpu:'800% CPU', ram:'16 GB', disk:'160 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-24', price:2300, currency:"LKR", cpu:'1000% CPU', ram:'24 GB', disk:'240 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-32', price:2760, currency:"LKR", cpu:'1200% CPU', ram:'32 GB', disk:'320 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-48', price:3450, currency:"LKR", cpu:'1600% CPU', ram:'48 GB', disk:'480 GB NVMe SSD', transfer:'Unmetered'},
    {name:'ARX-64', price:3890, currency:"LKR", cpu:'2000% CPU', ram:'64 GB', disk:'640 GB NVMe SSD', transfer:'Unmetered'}
  ],
} as const;

function Button({ children, variant='primary', className='', ...props }: {children:ReactNode; variant?:'primary'|'ghost'|'line'|'quiet'; className?:string; [key:string]:any}) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>;
}
function Logo({ compact=false }: {compact?:boolean}) {
  return <Link href="/" className="brand" data-testid="link-home"><span className="logo-frame"><img src={logo} alt="ArveX mark" /></span>{!compact && <span><strong>ARVEX</strong><small>HOSTING / 01</small></span>}</Link>;
}
function Header() {
  const [open,setOpen]=useState(false);
  return <header className="site-header"><div className="header-inner"><Logo />
    <nav className={`main-nav ${open?'open':''}`} aria-label="Main navigation">
      <Link href="/services" onClick={()=>setOpen(false)} data-testid="link-services">Services <ChevronDown size={13}/></Link>
      <Link href="/status" onClick={()=>setOpen(false)} data-testid="link-status">Status</Link>
      <Link href="/support" onClick={()=>setOpen(false)} data-testid="link-support">Support</Link>
      <Link href="/about" onClick={()=>setOpen(false)} data-testid="link-about">Company</Link>
      <div className="mobile-nav-cta"><Link href="/dashboard" className="btn btn-primary" data-testid="link-dashboard-mobile">Client portal <ArrowRight size={15}/></Link></div>
    </nav>
    <div className="header-actions"><Link href="/login" className="login-link" data-testid="link-login">Log in</Link><Link href="/dashboard" className="btn btn-primary header-cta" data-testid="link-dashboard">Client portal <ArrowRight size={15}/></Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation" data-testid="button-mobile-menu">{open?<X/>:<Menu/>}</button></div>
  </div></header>;
}
function Footer() {
  return <footer className="footer"><div className="container footer-top"><div><Logo/><p className="footer-note">Infrastructure for the people<br/>building what is next.</p></div><div className="footer-links"><div><b>Explore</b><Link href="/services">Services</Link><Link href="/status">System status</Link><Link href="/about">About ArveX</Link></div><div><b>Help</b><Link href="/support">Support center</Link><Link href="/login">Client login</Link><Link href="/dashboard">Dashboard</Link></div><div><b>Legal</b><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/refund-policy">Refund policy</Link></div></div></div><div className="container footer-bottom"><span>© 2025 ArveX Hosting</span><span className="mono">NOC / ONLINE 24·7</span></div></footer>;
}
function PublicShell({children, bare=false}:{children:ReactNode;bare?:boolean}) { return <div className="app-shell noise">{!bare&&<Header/>}{children}{!bare&&<Footer/>}</div>; }
function SectionTitle({eyebrow,title,copy,action}:{eyebrow:string;title:string;copy?:string;action?:ReactNode}) {
  return <div className="section-title"><div><p className="eyebrow"><span className="eyebrow-dot"/> {eyebrow}</p><h2>{title}</h2>{copy&&<p className="section-copy">{copy}</p>}</div>{action}</div>;
}
function StatusPill({children='Operational'}:{children?:ReactNode}) { return <span className="status-pill"><i/> {children}</span>; }
function ArrowLink({href,children}:{href:string;children:ReactNode}) { return <Link href={href} className="arrow-link" data-testid={`link-${href.replaceAll('/','-').replace(/^-/, '')}`}>{children}<ArrowRight size={16}/></Link>; }

function Home() {
  const { services } = useServices();
  const [faq,setFaq]=useState<number|null>(0);
  const faqs=[['Where are ArveX servers located?','Our current fleet operates from Frankfurt, Helsinki and Ashburn, with more regions coming online as demand grows. You choose the region during checkout.'],['Can I move my existing project to ArveX?','Yes. Every plan includes migration guidance, and our team can handle the move for managed web hosting at no additional charge.'],['What happens if I need more resources?','Scale vertically in a few clicks from the portal. Your IP stays the same and the upgrade is applied with a short rolling restart.']];
  return <PublicShell><main>
    <section className="hero grid-atmosphere"><div className="hero-orb orb-a"/><div className="hero-orb orb-b"/><div className="container hero-grid"><div className="hero-copy reveal"><div className="kicker"><span className="live-dot"/> ARVEX NETWORK / ALL SYSTEMS NOMINAL</div><h1>Powering the<br/><em>next session.</em></h1><p>High-performance infrastructure for game worlds, ambitious products and the people who keep them moving.</p><div className="hero-actions"><Link href="/services" className="btn btn-primary btn-large" data-testid="link-explore-services">Explore services <ArrowRight size={17}/></Link><Link href="/status" className="text-link" data-testid="link-view-status">View network status <Activity size={15}/></Link></div><div className="hero-proof"><span><strong>99.99%</strong><small>network uptime</small></span><span><strong>14 ms</strong><small>median latency</small></span><span><strong>24/7</strong><small>human support</small></span></div></div><div className="hero-console reveal delay-2"><div className="console-top"><span className="mono">NODE / ARV-FRA-07</span><StatusPill/><span className="console-dots">•••</span></div><div className="console-graphic"><div className="radar"><span/><span/><span/><b>ARVEX<br/><small>CORE</small></b></div><div className="data-readout readout-1"><small>THROUGHPUT</small><strong>8.42 <i>Gbps</i></strong><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="data-readout readout-2"><small>PACKET LOSS</small><strong>0.002%</strong><span className="good">↓ 0.4% this week</span></div></div><div className="console-footer"><span className="mono">UPTIME / 184D 09H 42M</span><span><i className="live-dot"/>LIVE TELEMETRY</span></div></div></div><div className="hero-bottom container"><span className="mono">SCROLL TO DISCOVER</span><div className="scroll-line"/></div></section>
    <section className="trust-strip"><div className="container trust-inner"><span className="mono">BUILT FOR</span><div><Gamepad2 size={17}/> <span>PLAYERS</span></div><div><Code2 size={17}/> <span>BUILDERS</span></div><div><Users size={17}/> <span>TEAMS</span></div><div><ShieldCheck size={17}/> <span>OPERATORS</span></div></div></section>
    <section className="section container"><SectionTitle eyebrow="THE ARVEX STANDARD" title="Less wrestling. More shipping." copy="We remove the friction between your idea and a server that just works." action={<ArrowLink href="/about">Why ArveX</ArrowLink>}/><div className="principles"><div className="principle principle-featured"><span className="principle-number">01</span><Zap size={28}/><h3>Performance you can feel</h3><p>NVMe storage, modern AMD compute and routes chosen for the shortest path to your users. We publish the numbers, not just the promise.</p><div className="metric-bar"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><small className="mono">CONSISTENT / PREDICTABLE / FAST</small></div><div className="principle"><span className="principle-number">02</span><LockKeyhole size={26}/><h3>Control without the clutter</h3><p>A clear portal, sensible defaults and the access you need. No maze of settings before you can start.</p><ArrowLink href="/dashboard">See the portal</ArrowLink></div><div className="principle"><span className="principle-number">03</span><Headphones size={26}/><h3>Humans on the other end</h3><p>Technical support from people who understand the difference between a game server and a production workload.</p><ArrowLink href="/support">Meet support</ArrowLink></div></div></section>
    <section className="section section-services"><div className="container"><SectionTitle eyebrow="INFRASTRUCTURE, YOUR WAY" title="Pick your surface area." copy="Start small, scale without a migration. Every service runs on the same ArveX backbone." action={<ArrowLink href="/services">All services</ArrowLink>}/><div className="service-grid">{services.slice(0,5).map((s,i)=><Link href={s.slug === "game-hosting" ? "/services/game-hosting" : `/services/${s.slug}`} className={`service-tile tile-${s.color} reveal delay-${i%3}`} key={s.slug} data-testid={`card-service-${s.slug}`}><div className="tile-icon"><s.icon size={21}/></div><div><small className="mono">{s.sub.toUpperCase()}</small><h3>{s.title}</h3><p>{s.desc}</p></div><div className="tile-foot"><span>{s.stat}</span><ArrowUpRightIcon/></div></Link>)}<Link href="/services/domains" className="service-tile tile-domain" data-testid="card-service-domains"><div className="domain-globe"><Globe2 size={48}/></div><small className="mono">YOUR NEXT ADDRESS</small><h3>Domains</h3><p>Make it official.</p><ArrowRight size={18}/></Link></div></div></section>
    <section className="section container split-story"><div className="story-visual grid-atmosphere"><div className="server-rack"><div className="rack-head"><span>ARVEX / RACK 04</span><i/></div>{[1,2,3,4,5,6].map(n=><div className="rack-unit" key={n}><span className="rack-light"/><span className="rack-label">NVME-{String(n).padStart(2,'0')}</span><span className="rack-blips"><i/><i/><i/></span></div>)}</div><div className="visual-caption mono">FRA / 50.1109° N, 8.6821° E</div></div><div className="story-copy"><p className="eyebrow"><span className="eyebrow-dot"/> BUILT IN THE REAL WORLD</p><h2>Infrastructure is a feeling.</h2><p>It is the confidence to launch a community event without checking your dashboard every five minutes. The calm of a deploy that finishes before your coffee does. The knowledge that someone is watching the graphs.</p><p>ArveX is deliberately small enough to care and serious enough to carry your next chapter.</p><Link href="/about" className="btn btn-line" data-testid="link-our-approach">Our approach <ArrowRight size={16}/></Link></div></section>
    <section className="section faq-section"><div className="container narrow"><SectionTitle eyebrow="NO SMALL PRINT" title="Questions, answered." copy="A few things worth knowing before you press deploy."/><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${faq===i?'expanded':''}`} key={q}><button onClick={()=>setFaq(faq===i?null:i)} data-testid={`button-faq-${i}`}><span>{q}</span>{faq===i?<Minus size={18}/>:<Plus size={18}/>}</button>{faq===i&&<p>{a}</p>}</div>)}</div></div></section>
    <section className="final-cta"><div className="container"><div className="cta-mark"><img src={logo} alt="ArveX mark"/></div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Give your next idea<br/><em>room to run.</em></h2><p>Spin up in under 60 seconds. Cancel anytime. No awkward calls.</p><Link href="/services" className="btn btn-primary btn-large" data-testid="link-start-building">Start building <ArrowRight size={17}/></Link></div></section>
  </main></PublicShell>;
}
function ArrowUpRightIcon(){return <ExternalLink size={16}/>}


function GameServersPage() {
  return (
    <PublicShell>
      <main className="page">
        <div className="container page-hero">
          <p className="eyebrow">
            <span className="eyebrow-dot"/> GAME SERVERS
          </p>

          <h1>
            Choose your<br/>
            <em>game.</em>
          </h1>

          <p>
            Select a game to view available ArveX hosting plans,
            resources and pricing.
          </p>
        </div>

        <div className="container">
          <div className="catalog-grid game-catalog-grid">
            {gameCatalog.map((game, index) => {
              const Icon = game.icon;

              return (
                <Link
                  href={`/services/game-hosting/${game.slug}`}
                  className="catalog-card reveal"
                  key={game.slug}
                  data-testid={`card-game-${game.slug}`}
                >
                  <div className="catalog-icon icon-violet">
                    <Icon size={23}/>
                  </div>

                  <div className="catalog-number mono">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {game.comingSoon && (
  <span
    className="absolute right-3 top-3 z-10 rounded-full border border-red-500/50 bg-red-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-400 shadow-lg shadow-red-500/10"
  >
    COMING SOON
  </span>
)}

<h2>{game.title}</h2>

                  <p>{game.desc}</p>

                  <div className="catalog-meta">
                    <span className="mono">
                      VIEW PLANS
                    </span>
                    <ArrowRight size={17}/>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </PublicShell>
  );
}

function ServicesPage() {
  const { services, loading } = useServices();
  const [filter,setFilter]=useState('All');
  const cats=['All','Gaming','Compute','Web','Tools'];
  const filtered=services.filter(s =>
    filter === 'All' || s.category === filter
  );
  return <PublicShell><main className="page"><div className="container page-hero"><p className="eyebrow"><span className="eyebrow-dot"/> THE ARVEX CATALOG</p><h1>Infrastructure with<br/><em>intent.</em></h1><p>Choose the foundation. We handle the rest.</p></div><div className="container"><div className="filter-row">{cats.map(c=><button className={filter===c?'active':''} key={c} onClick={()=>setFilter(c)} data-testid={`button-filter-${c.toLowerCase()}`}>{c}</button>)}</div><div className="catalog-grid">{loading && <div className="mono" style={{padding:"24px 0"}}>LOADING SERVICES...</div>}{filtered.map((s,i)=><Link href={s.slug === "game-hosting" ? "/services/game-hosting" : `/services/${s.slug}`} className="catalog-card reveal" key={s.slug} data-testid={`card-catalog-${s.slug}`}><div className={`catalog-icon icon-${s.color}`}><s.icon size={23}/></div><div className="catalog-number mono">0{i+1}</div><h2>{s.title}</h2><p>{s.desc}</p><div className="catalog-meta"><span className="mono">{s.stat}</span><ArrowRight size={17}/></div></Link>)}</div></div><section className="catalog-note container"><ShieldCheck size={24}/><div><b>One backbone. Every service.</b><p>Your billing, support and telemetry stay in one place as your stack grows.</p></div><ArrowLink href="/support">Talk to an engineer</ArrowLink></section></main></PublicShell>;
}
function PlanCard({plan, featured=false,onSelect}:{plan:any;featured?:boolean;onSelect:()=>void}) { return <div className={`plan-card ${featured?'featured':''}`}>{featured&&<span className="plan-badge">MOST POPULAR</span>}<div className="plan-top"><span className="plan-dot"/><span className="mono">{plan.name.toUpperCase()}</span></div><div className="plan-price">
  {plan.currency === 'LKR' ? (
    <>
      <strong>LKR {Number(plan.price).toLocaleString('en-LK')}</strong>
      <span>/ mo</span>
      <small className="plan-usd-price">
        ≈ ${(Number(plan.price) / 3890).toFixed(2)} USD
      </small>
    </>
  ) : (
    <>
      <strong>${Number(plan.price).toFixed(2)}</strong>
      <span>/ mo</span>
    </>
  )}
</div><div className="plan-specs"><span><CpuIcon/> {plan.cpu}</span><span><MemoryIcon/> {plan.ram}</span><span><Database size={15}/> {plan.storage || plan.disk}</span>{plan.players && <span><Gamepad2 size={15}/> {plan.players}</span>}<span><Network size={15}/> {plan.transfer}</span></div><Button variant={featured?'primary':'line'} className="plan-button" onClick={onSelect} data-testid={`button-select-${plan.name.toLowerCase()}>`}>Select {plan.name} <ArrowRight size={15}/></Button></div>; }
function CpuIcon(){return <Settings size={15}/>} function MemoryIcon(){return <Box size={15}/>}

function GamePlanPage({ gameSlug }: { gameSlug: keyof typeof gamePlans }) {
  const game = gameCatalog.find(g => g.slug === gameSlug)!;
  const plans = gamePlans[gameSlug];
  const [selected, setSelected] = useState<any>(null);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <PublicShell>
      <main className="page">

        <div className="container product-hero">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-dot"/> GAME HOSTING
            </p>

            <h1>
              {game.title}<br/>
              <em>hosting.</em>
            </h1>

            <p>{game.desc}</p>

            <div className="product-points">
              <span><Check size={15}/> Instant deployment</span>
              <span><Check size={15}/> NVMe storage</span>
              <span><Check size={15}/> DDoS protection</span>
              <span><Check size={15}/> 24/7 monitoring</span>
            </div>
          </div>

          <div className="product-art grid-atmosphere">
            <div className="art-ring"/>
            <div className="art-icon">
              {(() => {
                const Icon = game.icon;
                return <Icon size={52}/>;
              })()}
            </div>
            <span className="mono">
              ARVEX / GAME HOSTING
            </span>
          </div>
        </div>

        <div className="container plans-section">

          <div className="plans-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot"/> AVAILABLE PLANS
              </p>

              <h2>
                Pick your<br/>
                <em>configuration.</em>
              </h2>

              <p className="section-copy">
                All plans include high-performance CPU,
                NVMe storage, DDoS protection and the ArveX
                game hosting panel.
              </p>
            </div>

            <div className="billing-toggle">
              <button
                className={billing === 'monthly' ? 'active' : ''}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>

              <button
                className={billing === 'yearly' ? 'active' : ''}
                onClick={() => setBilling('yearly')}
              >
                Yearly <b>−20%</b>
              </button>
            </div>
          </div>

          <div className="plans-grid">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={{
                  ...plan,
                  price:
                    billing === 'yearly'
                      ? Math.round(plan.price * 0.8)
                      : plan.price
                }}
                featured={index === 1}
                onSelect={() =>
                  setSelected({
                    ...plan,
                    game: game.title,
                    gameSlug,
                    price:
                      billing === 'yearly'
                        ? Math.round(plan.price * 0.8)
                        : plan.price
                  })
                }
              />
            ))}
          </div>
        </div>

        <section className="container product-bottom">
          <div>
            <ShieldCheck size={20}/>
            <b>Included with every game server</b>
            <p>
              NVMe SSD storage, DDoS protection, instant
              deployment, full server control, automated
              backups, easy upgrades and 24/7 monitoring.
            </p>
          </div>

          <ArrowLink href="/support">
            Need a custom setup?
          </ArrowLink>
        </section>

      </main>

      {selected && (
        <OrderModal
          plan={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </PublicShell>
  );
}

const gameServerOptions = [
  {
    slug: "minecraft-java",
    title: "Minecraft Java Edition",
    short: "Java Edition",
    icon: Gamepad2,
    color: "violet",
    desc: "High-performance Minecraft Java servers with NVMe storage and powerful CPU.",
  },
  {
    slug: "minecraft-bedrock",
    title: "Minecraft Bedrock Edition",
    short: "Bedrock Edition",
    icon: Gamepad2,
    color: "cyan",
    desc: "Fast and reliable Bedrock servers for players across supported platforms.",
  },
  {
    slug: "palworld",
    title: "Palworld",
    short: "Palworld",
    icon: Gamepad2,
    color: "purple",
    desc: "Powerful Palworld infrastructure built for persistent worlds and growing communities.",
  },
  {
    slug: "rust",
    title: "Rust",
    short: "Rust",
    icon: Gamepad2,
    color: "amber",
    desc: "Reliable Rust hosting with the resources needed for busy survival servers.",
  },
  {
    slug: "ark-survival-evolved",
    title: "ARK: Survival Evolved",
    short: "ARK: Survival Evolved",
    icon: Gamepad2,
    color: "green",
    desc: "Deploy your ARK survival world with dedicated resources and NVMe performance.",
  },
  {
    slug: "ark-survival-ascended",
    title: "ARK: Survival Ascended",
    short: "ARK: Survival Ascended",
    icon: Gamepad2,
    color: "pink",
    desc: "High-resource ARK: Survival Ascended hosting for demanding worlds.",
  },
  {
    comingSoon: true,
    slug: "terraria",
    title: "Terraria",
    short: "Terraria",
    icon: Gamepad2,
    color: "blue",
    desc: "Lightweight, low-latency Terraria servers for friends and communities.",
  },
  {
    comingSoon: true,
    slug: "project-zomboid",
    title: "Project Zomboid",
    short: "Project Zomboid",
    icon: Gamepad2,
    color: "purple",
    desc: "Stable Project Zomboid hosting for persistent multiplayer survival worlds.",
  },
  {
    slug: "fivem",
    title: "FiveM / GTA V",
    short: "FiveM / GTA V",
    icon: Gamepad2,
    color: "violet",
    desc: "Performance-focused FiveM hosting for serious GTA V communities.",
  },
];

const fivemPlans = [
  {
    name: "ARX-FIV 4GB",
    price: 750,
    currency: "LKR",
    cpu: "200% CPU",
    ram: "4 GB",
    storage: "50 GB NVMe SSD",
    players: "Up to 32",
  },
  {
    name: "ARX-FIV 6GB",
    price: 1050,
    currency: "LKR",
    cpu: "300% CPU",
    ram: "6 GB",
    storage: "75 GB NVMe SSD",
    players: "Up to 48",
  },
  {
    name: "ARX-FIV 8GB",
    price: 1350,
    currency: "LKR",
    cpu: "400% CPU",
    ram: "8 GB",
    storage: "100 GB NVMe SSD",
    players: "Up to 64",
  },
  {
    name: "ARX-FIV 10GB",
    price: 1650,
    currency: "LKR",
    cpu: "500% CPU",
    ram: "10 GB",
    storage: "125 GB NVMe SSD",
    players: "Up to 80",
  },
  {
    name: "ARX-FIV 12GB",
    price: 1950,
    currency: "LKR",
    cpu: "600% CPU",
    ram: "12 GB",
    storage: "150 GB NVMe SSD",
    players: "Up to 96",
  },
  {
    name: "ARX-FIV 16GB",
    price: 2550,
    currency: "LKR",
    cpu: "700% CPU",
    ram: "16 GB",
    storage: "200 GB NVMe SSD",
    players: "Up to 128",
  },
  {
    name: "ARX-FIV 24GB",
    price: 3650,
    currency: "LKR",
    cpu: "800% CPU",
    ram: "24 GB",
    storage: "300 GB NVMe SSD",
    players: "Up to 160",
  },
  {
    name: "ARX-FIV 32GB",
    price: 4850,
    currency: "LKR",
    cpu: "900% CPU",
    ram: "32 GB",
    storage: "400 GB NVMe SSD",
    players: "Up to 200",
  },
  {
    name: "ARX-FIV 48GB",
    price: 6750,
    currency: "LKR",
    cpu: "950% CPU",
    ram: "48 GB",
    storage: "600 GB NVMe SSD",
    players: "Up to 300",
  },
  {
    name: "ARX-FIV 64GB",
    price: 8950,
    currency: "LKR",
    cpu: "1000% CPU",
    ram: "64 GB",
    storage: "800 GB NVMe SSD",
    players: "Up to 400+",
  },
];

const minecraftPlans = [
  { name:"ARX-02", price:230, currency:"LKR", cpu:"150% CPU Power", ram:"2 GB RAM", disk:"20 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-04", price:460, currency:"LKR", cpu:"250% CPU Power", ram:"4 GB RAM", disk:"40 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-06", price:690, currency:"LKR", cpu:"350% CPU Power", ram:"6 GB RAM", disk:"60 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-08", price:920, currency:"LKR", cpu:"450% CPU Power", ram:"8 GB RAM", disk:"80 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-10", price:1150, currency:"LKR", cpu:"550% CPU Power", ram:"10 GB RAM", disk:"100 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-12", price:1380, currency:"LKR", cpu:"650% CPU Power", ram:"12 GB RAM", disk:"120 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-16", price:1840, currency:"LKR", cpu:"800% CPU Power", ram:"16 GB RAM", disk:"160 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-24", price:2300, currency:"LKR", cpu:"1000% CPU Power", ram:"24 GB RAM", disk:"240 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-32", price:2760, currency:"LKR", cpu:"1200% CPU Power", ram:"32 GB RAM", disk:"320 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-48", price:3450, currency:"LKR", cpu:"1600% CPU Power", ram:"48 GB RAM", disk:"480 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-64", price:3890, currency:"LKR", cpu:"2000% CPU Power", ram:"64 GB RAM", disk:"640 GB NVMe SSD", transfer:"DDoS Protection" },
];

const defaultGamePlans = [
  { name:"ARX-02", price:230, currency:"LKR", cpu:"150% CPU Power", ram:"2 GB RAM", disk:"20 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-04", price:460, currency:"LKR", cpu:"250% CPU Power", ram:"4 GB RAM", disk:"40 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-06", price:690, currency:"LKR", cpu:"350% CPU Power", ram:"6 GB RAM", disk:"60 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-08", price:920, currency:"LKR", cpu:"450% CPU Power", ram:"8 GB RAM", disk:"80 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-12", price:1380, currency:"LKR", cpu:"650% CPU Power", ram:"12 GB RAM", disk:"120 GB NVMe SSD", transfer:"DDoS Protection" },
  { name:"ARX-16", price:1840, currency:"LKR", cpu:"800% CPU Power", ram:"16 GB RAM", disk:"160 GB NVMe SSD", transfer:"DDoS Protection" },
];


function ProductPage({kind}:{kind:keyof typeof plans}) {
  const service = fallbackServices.find(s => s.slug === kind)!;
  const [billing, setBilling] = useState<'monthly'|'yearly'>('monthly');
  const [selected, setSelected] = useState<any>(null);

  return (
    <PublicShell>
      <main className="page">

        <div className="container product-hero">

          <div>
            <p className="eyebrow">
              <span className="eyebrow-dot"/>
              {service.sub.toUpperCase()}
            </p>

            <h1>
              {service.title}<br/>
              <em>without limits.</em>
            </h1>

            <p>
              {service.desc} Built for people who care about the
              details and have better things to do than babysit a server.
            </p>

            <div className="product-points">
              <span><Check size={15}/> Instant activation</span>
              <span><Check size={15}/> Cancel anytime</span>
              <span><Check size={15}/> Human support</span>
            </div>
          </div>

          <div className="product-art grid-atmosphere">
            <div className="art-ring"/>
            <div className="art-icon">
              <service.icon size={52}/>
            </div>
            <span className="mono">
              ARVEX / {kind.toUpperCase()}
            </span>
          </div>

        </div>

        <div className="container plans-section">

          <div className="plans-heading">

            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot"/>
                FIND YOUR CONFIGURATION
              </p>

              <h2>Simple plans. Serious headroom.</h2>
            </div>

            <div className="billing-toggle">
              <button
                className={billing === 'monthly' ? 'active' : ''}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>

              <button
                className={billing === 'yearly' ? 'active' : ''}
                onClick={() => setBilling('yearly')}
              >
                Yearly <b>−20%</b>
              </button>
            </div>

          </div>

          <div className="plans-grid">

            {plans[kind].map((p, i) => (
              <PlanCard
                key={p.name}
                plan={{
                  ...p,
                  price: billing === 'yearly'
                    ? p.price * 0.8
                    : p.price
                }}
                featured={i === 1}
                onSelect={() =>
                  setSelected({
                    ...p,
                    kind
                  })
                }
              />
            ))}

          </div>
        </div>

      </main>

      {selected && (
        <OrderModal
          plan={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </PublicShell>
  );
}


const USD_LKR_RATE = 320;



function MinecraftPrice({ price }: { price: number }) {
  const usd = price / USD_LKR_RATE;

  return (
    <div className="minecraft-price">
      <strong>LKR {price.toLocaleString("en-LK")}</strong>
      <span>≈ ${usd.toFixed(2)} USD / month</span>
    </div>
  );
}



const palworldPlans = [
  {
    name: "ARX-PAL — 2GB",
    ram: "2 GB",
    cpu: "100%",
    storage: "20 GB NVMe SSD",
    players: "Up to 4",
    lkr: 350,
  },
  {
    name: "ARX-PAL — 4GB",
    ram: "4 GB",
    cpu: "200%",
    storage: "35 GB NVMe SSD",
    players: "Up to 6",
    lkr: 550,
  },
  {
    name: "ARX-PAL — 6GB",
    ram: "6 GB",
    cpu: "300%",
    storage: "50 GB NVMe SSD",
    players: "Up to 8",
    lkr: 750,
  },
  {
    name: "ARX-PAL — 8GB",
    ram: "8 GB",
    cpu: "400%",
    storage: "70 GB NVMe SSD",
    players: "Up to 10",
    lkr: 950,
  },
  {
    name: "ARX-PAL — 10GB",
    ram: "10 GB",
    cpu: "500%",
    storage: "85 GB NVMe SSD",
    players: "Up to 12",
    lkr: 1150,
  },
  {
    name: "ARX-PAL — 12GB",
    ram: "12 GB",
    cpu: "600%",
    storage: "100 GB NVMe SSD",
    players: "Up to 14",
    lkr: 1350,
  },
  {
    name: "ARX-PAL — 16GB",
    ram: "16 GB",
    cpu: "700%",
    storage: "130 GB NVMe SSD",
    players: "Up to 16",
    lkr: 1750,
  },
  {
    name: "ARX-PAL — 24GB",
    ram: "24 GB",
    cpu: "800%",
    storage: "180 GB NVMe SSD",
    players: "Up to 24",
    lkr: 2350,
  },
  {
    name: "ARX-PAL — 32GB",
    ram: "32 GB",
    cpu: "900%",
    storage: "250 GB NVMe SSD",
    players: "Up to 32",
    lkr: 2950,
  },
  {
    name: "ARX-PAL — 48GB",
    ram: "48 GB",
    cpu: "950%",
    storage: "350 GB NVMe SSD",
    players: "32+",
    lkr: 3650,
  },
  {
    name: "ARX-PAL — 64GB",
    ram: "64 GB",
    cpu: "1000%",
    storage: "500 GB NVMe SSD",
    players: "32+",
    lkr: 4500,
  },
];


function ArkSurvivalEvolvedPage() {
  const plans = [
    {
      name: "ARX-ARK 2GB",
      ram: "2 GB",
      cpu: "200%",
      storage: "50 GB NVMe SSD",
      players: "Up to 5",
      price: 1490,
    },
    {
      name: "ARX-ARK 4GB",
      ram: "4 GB",
      cpu: "300%",
      storage: "80 GB NVMe SSD",
      players: "Up to 10",
      price: 2490,
    },
    {
      name: "ARX-ARK 6GB",
      ram: "6 GB",
      cpu: "400%",
      storage: "100 GB NVMe SSD",
      players: "Up to 15",
      price: 3290,
    },
    {
      name: "ARX-ARK 8GB",
      ram: "8 GB",
      cpu: "500%",
      storage: "150 GB NVMe SSD",
      players: "Up to 20",
      price: 4190,
    },
    {
      name: "ARX-ARK 12GB",
      ram: "12 GB",
      cpu: "600%",
      storage: "200 GB NVMe SSD",
      players: "Up to 25",
      price: 5190,
    },
    {
      name: "ARX-ARK 16GB",
      ram: "16 GB",
      cpu: "700%",
      storage: "250 GB NVMe SSD",
      players: "Up to 30",
      price: 6190,
    },
    {
      name: "ARX-ARK 24GB",
      ram: "24 GB",
      cpu: "700%",
      storage: "300 GB NVMe SSD",
      players: "Up to 35",
      price: 6450,
    },
    {
      name: "ARX-ARK 32GB",
      ram: "32 GB",
      cpu: "800%",
      storage: "400 GB NVMe SSD",
      players: "Up to 50",
      price: 8450,
    },
    {
      name: "ARX-ARK 48GB",
      ram: "48 GB",
      cpu: "900%",
      storage: "550 GB NVMe SSD",
      players: "Up to 70",
      price: 11950,
    },
    {
      name: "ARX-ARK 64GB",
      ram: "64 GB",
      cpu: "1000%",
      storage: "700 GB NVMe SSD",
      players: "Up to 100+",
      price: 15780,
    },
  ];

  return (
    <PublicShell>
      <main className="page">

        <section className="container page-hero">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            ARVEX HOSTING / ARK: SURVIVAL EVOLVED
          </p>

          <h1>
            Power Your ARK
            <br />
            <em>Adventure.</em>
          </h1>

          <p>
            High-performance ARK: Survival Evolved hosting powered by
            NVMe storage, powerful CPU resources and DDoS protection.
          </p>

          <div className="product-points">
            <span>High Performance CPU</span>
            <span>NVMe Storage</span>
            <span>DDoS Protection</span>
            <span>Pterodactyl Panel</span>
          </div>
        </section>

        <section className="container">
          <div className="catalog-grid">
            {plans.map((plan) => (
              <div className="catalog-card" key={plan.name}>

                <div className="catalog-card-top">
                  <span className="tile-icon">
                    <Gamepad2 size={16} />
                  </span>
                  <span className="mono">ARK SERVER</span>
                </div>

                <h3>{plan.name}</h3>

                <div className="plan-price">
                  <strong>
                    LKR {plan.price.toLocaleString()}
                  </strong>
                  <small>/ month</small>
                </div>

                <div className="plan-specs">

                  <div>
                    <span>RAM</span>
                    <b>{plan.ram}</b>
                  </div>

                  <div>
                    <span>CPU</span>
                    <b>{plan.cpu}</b>
                  </div>

                  <div>
                    <span>Storage</span>
                    <b>{plan.storage}</b>
                  </div>

                  <div>
                    <span>Players</span>
                    <b>{plan.players}</b>
                  </div>

                </div>

                <Button
                  type="button"
                  onClick={() => {
                    window.location.assign(
                      "/services/game-hosting/ark-survival-evolved"
                    );
                  }}
                  style={{
                    width: "100%",
                    marginTop: "18px",
                  }}
                >
                  ORDER SERVER
                  <ArrowRight size={17} />
                </Button>

              </div>
            ))}
          </div>
        </section>

      </main>
    </PublicShell>
  );
}

function OrderModal({plan,onClose}:{plan:any;onClose:()=>void}) { const [,setLocation]=useLocation(); return <div className="modal-backdrop"><div className="order-modal"><button className="modal-close" onClick={onClose} data-testid="button-close-modal"><X size={18}/></button><p className="eyebrow">CONFIGURATION READY</p><h2>{plan.name} is a good place to start.</h2><p>Continue to checkout to choose a region, operating system and billing cycle.</p><div className="modal-summary"><span>{plan.kind.replace('-',' ').toUpperCase()}</span><strong>{plan.kind === 'game-hosting' ? `LKR ${Math.round(plan.price).toLocaleString()}` : `$${plan.price.toFixed(2)}`} <small>/ month</small></strong></div><Button onClick={()=>setLocation(`/checkout?plan=${plan.name}`)} data-testid="button-continue-checkout">Continue to checkout <ArrowRight size={16}/></Button></div></div>; }

function DomainsPage(){const [query,setQuery]=useState('');const [searched,setSearched]=useState(false); const domains=[['.com','$12.90'],['.dev','$16.50'],['.gg','$39.00'],['.cloud','$18.00']]; return <PublicShell><main className="page domains-page"><div className="container domains-hero"><p className="eyebrow"><span className="eyebrow-dot"/> DOMAIN REGISTRY</p><h1>Put a name<br/><em>to the work.</em></h1><p>Find an address that feels like yours. Straightforward pricing, private by default.</p><div className="domain-search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a domain name" data-testid="input-domain-search"/><Button onClick={()=>setSearched(true)} data-testid="button-search-domain">Search</Button></div>{searched&&<div className="domain-result"><CheckCircle2 size={18}/><span><b>{query||'yourproject'}.com</b> is available</span><Button variant="line" onClick={()=>setSearched(false)} data-testid="button-domain-add">Add to order</Button></div>}</div><div className="container domain-tlds"><SectionTitle eyebrow="POPULAR EXTENSIONS" title="The right ending matters."/><div className="tld-list">{domains.map(([tld,price])=><div className="tld-row" key={tld}><span className="tld-name">{tld}</span><span>Registration + privacy included</span><strong>{price}<small> / year</small></strong><ArrowRight size={16}/></div>)}</div></div></main></PublicShell>;}

function StatusPage(){const [history,setHistory]=useState(false);return <PublicShell><main className="page status-page"><div className="container page-hero compact"><div className="status-heading"><div><p className="eyebrow"><span className="eyebrow-dot"/> ARVEX SYSTEM STATUS</p><h1>Everything is<br/><em>operational.</em></h1><p>Live visibility into the services keeping your projects online.</p></div><StatusPill>All systems operational</StatusPill></div></div><div className="container status-layout"><div className="status-main"><div className="overall-card"><div className="overall-icon"><CheckCircle2 size={25}/></div><div><b>Systems nominal</b><p>We have not detected any active incidents.</p></div><span className="mono">UPDATED 2 MIN AGO</span></div>{['Core network','Compute platform','Game panel','Billing & accounts','Support desk'].map((item,i)=><div className="status-row" key={item}><div><span className="status-mark"><Check size={13}/></span><b>{item}</b></div><StatusPill/><span className="mono">99.{99-i}9% / 90 DAYS</span></div>)}</div><aside className="status-side"><div className="side-card"><div className="side-card-head"><h3>Uptime history</h3><button onClick={()=>setHistory(!history)} data-testid="button-toggle-history">{history?'Hide':'View'} details <ChevronRight size={14}/></button></div><div className="uptime-bars">{Array.from({length:30},(_,i)=><i key={i} className={i===12?'warn':''}/>)}</div><div className="uptime-labels"><span>30 days ago</span><span>Today</span></div>{history&&<div className="history-detail"><p><b>30 days</b><span>99.99%</span></p><p><b>90 days</b><span>99.98%</span></p></div>}</div><div className="side-card incident-card"><Bell size={18}/><div><b>Incident updates</b><p>Get notified when something changes.</p><Button variant="line" onClick={()=>alert('You are subscribed to ArveX status updates.')} data-testid="button-subscribe-status">Subscribe <ArrowRight size={14}/></Button></div></div></aside></div></main></PublicShell>;}

function SupportPage(){const [sent,setSent]=useState(false);return <PublicShell><main className="page support-page"><div className="container page-hero compact"><p className="eyebrow"><span className="eyebrow-dot"/> SUPPORT CENTER</p><h1>We speak<br/><em>human.</em></h1><p>Search the docs or open a conversation with a technical human.</p></div><div className="container support-grid"><div className="support-card support-search"><Search size={20}/><input placeholder="Search the knowledge base" data-testid="input-support-search"/><span className="mono"> K</span><div className="popular"><small>POPULAR</small><Link href="/support?topic=migration" data-testid="link-topic-migration">How do I migrate a server?</Link><Link href="/support?topic=backups" data-testid="link-topic-backups">Understanding backups</Link></div></div><div className="support-card contact-card"><div className="contact-head"><span className="tile-icon"><MessageSquare size={19}/></span><div><h3>Open a ticket</h3><p>Typical response in under 18 minutes.</p></div></div>{sent?<div className="success-message"><CheckCircle2 size={23}/><b>Ticket received.</b><p>We sent a confirmation to your inbox. Someone from the NOC will be with you shortly.</p><Button variant="line" onClick={()=>setSent(false)} data-testid="button-new-ticket">Open another ticket</Button></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>YOUR EMAIL<input type="email" required placeholder="you@company.com" data-testid="input-ticket-email"/></label><label>WHAT CAN WE HELP WITH?<select defaultValue="" required data-testid="select-ticket-topic"><option value="" disabled>Select a topic</option><option>Technical issue</option><option>No billing requests</option><option>Migration help</option><option>Something else</option></select></label><label>MESSAGE<textarea required placeholder="Give us the useful details..." rows={4} data-testid="textarea-ticket-message"/></label><Button type="submit" data-testid="button-submit-ticket">Send ticket <Send size={15}/></Button></form>}</div><div className="support-card support-option"><Headphones size={21}/><h3>Prefer a quick answer?</h3><p>Our docs cover the common stuff, written for the moment you actually need it.</p><ArrowLink href="/status">Browse documentation</ArrowLink></div></div></main></PublicShell>;}

function AuthPage({register=false}:{register?:boolean}){const {login,isAuthenticated,isLoading}=useAuth();return <PublicShell bare><main className="auth-page"><div className="auth-aside"><Logo/><div className="auth-aside-copy"><p className="eyebrow">THE CLIENT PORTAL</p><h1>Your infrastructure,<br/><em>in one view.</em></h1><p>Use your secure ArveX account to deploy, monitor and manage your services.</p></div><span className="mono auth-aside-foot">ARVEX / SECURE ACCESS</span></div><div className="auth-main"><Link href="/" className="auth-mobile-logo"><Logo compact/></Link><div className="auth-form-wrap"><div className="auth-form-head"><p className="eyebrow">{register?'CREATE YOUR ACCOUNT':'WELCOME BACK'}</p><h2>{register?'Build from here.':'Good to see you.'}</h2><p>{isAuthenticated?'Your account is ready. Continue to your client portal.':'Continue with secure hosted authentication. No password is stored by ArveX.'}</p></div>{isLoading?<div className="success-message"><b>Checking your session…</b></div>:isAuthenticated?<div className="success-message"><CheckCircle2 size={24}/><b>You’re signed in.</b><p>Your real account is connected to this workspace.</p><Link href="/dashboard" className="btn btn-primary">Open client portal <ArrowRight size={15}/></Link></div>:<div className="success-message"><ShieldCheck size={24}/><b>{register?'Create your account':'Sign in securely'}</b><p>You’ll be redirected to the secure account provider, then returned here automatically.</p><Button onClick={login} className="auth-submit" data-testid={`button-${register?'create-account':'sign-in'}`}>{register?'Create account':'Sign in'} <ArrowRight size={16}/></Button></div>}<p className="auth-switch">{register?'Already have an account?':'Need an account?'} <Link href={register?'/login':'/register'} data-testid="link-auth-switch">{register?'Sign in':'Create an account'}</Link></p></div></div></main></PublicShell>;}

const dashNav=[['/dashboard','Overview',LayoutDashboard],['/dashboard/services','My services',Server],['/dashboard/orders','Orders',ShoppingCart],['/dashboard/invoices','Invoices',CreditCard],['/dashboard/tickets','Tickets',Ticket],['/dashboard/profile','Profile',Users],['/dashboard/security','Security',LockKeyhole]] as const;
function DashboardShell({children}:{children:ReactNode}){const [loc,setLoc]=useLocation();const [mobile,setMobile]=useState(false);return <div className="dashboard-shell noise"><aside className={`dash-sidebar ${mobile?'open':''}`}><div className="dash-brand"><Logo/ ><button onClick={()=>setMobile(false)} className="dash-mobile-close" data-testid="button-close-sidebar"><X size={18}/></button></div><div className="dash-user"><span className="avatar">AR</span><div><b>ArveX Customer</b><small>Customer workspace</small></div><ChevronDown size={15}/></div><nav>{dashNav.map(([href,label,Icon])=><Link href={href} className={loc===href?'active':''} onClick={()=>setMobile(false)} key={href} data-testid={`link-dash-${label.toLowerCase().replace(' ','-')}`}><Icon size={17}/><span>{label}</span>{label==='Tickets'&&<i className="nav-count">2</i>}</Link>)}</nav><div className="dash-side-bottom"><Link href="/support" data-testid="link-dash-support"><CircleHelp size={17}/> Help center</Link><Link href="/" data-testid="link-dash-home"><ExternalLink size={17}/> Back to ArveX</Link></div></aside><div className="dash-content"><header className="dash-header"><button className="dash-menu" onClick={()=>setMobile(true)} data-testid="button-open-sidebar"><Menu/></button><div className="dash-breadcrumb"><span>Workspace</span><ChevronRight size={14}/><b>{dashNav.find(n=>n[0]===loc)?.[1]||'Overview'}</b></div><div className="dash-header-actions"><button data-testid="button-notifications"><Bell size={18}/><i/></button><Link href="/dashboard/profile" className="avatar avatar-small" data-testid="link-dash-profile-avatar">AR</Link></div></header><main className="dash-main">{children}</main></div></div>;}
function DashOverview(){return <><div className="dash-welcome"><div><p className="eyebrow"><span className="eyebrow-dot"/> ARVEX / DASHBOARD</p><h1>Welcome to your dashboard.</h1><p>Manage your ArveX services from one place.</p></div><Link href="/services" className="btn btn-primary" data-testid="button-new-service">Provision service <Plus size={16}/></Link></div><div className="dash-metrics"><div><span>ACTIVE SERVICES</span><strong>00</strong><small><i className="trend-up">↑</i> All operational</small></div><div><span>MONTHLY SPEND</span><strong>$0.00</strong><small>No upcoming invoice</small></div><div><span>NETWORK UPTIME</span><strong>99.99%</strong><small><i className="trend-up">↑</i> Last 90 days</small></div><div><span>OPEN TICKETS</span><strong>00</strong><small>No open tickets</small></div></div><div className="dash-columns"><section className="dash-panel services-panel"><div className="panel-heading"><div><span className="eyebrow">YOUR SERVICES</span><h2>Running now</h2></div><ArrowLink href="/dashboard/services">View all</ArrowLink></div><div className="running-service"><div className="running-icon"><Gamepad2 size={20}/></div><div><b>No active game servers</b><small>GAME HOSTING</small></div><StatusPill/><Link href="/services/game-hosting" className="service-action" data-testid="button-manage-valheim"><Settings size={17}/></Link></div><div className="running-service"><div className="running-icon cyan"><Cloud size={20}/></div><div><b>No active VPS services</b><small>VPS HOSTING</small></div><StatusPill/><Link href="/services/vps" className="service-action" data-testid="button-manage-api"><Settings size={17}/></Link></div><div className="running-service"><div className="running-icon pink"><Bot size={20}/></div><div><b>No active bot services</b><small>BOT HOSTING</small></div><StatusPill/><Link href="/services/bot-hosting" className="service-action" data-testid="button-manage-bot"><Settings size={17}/></Link></div></section><section className="dash-panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Activity log</h2></div><button className="panel-icon" onClick={()=>alert('Activity log refreshed')} data-testid="button-refresh-activity"><Activity size={17}/></button></div><div className="activity-item"><span className="activity-symbol green"><Check size={13}/></span><div><b>No recent activity</b><small>No recent activity</small></div></div><div className="activity-item"><span className="activity-symbol purple"><Rocket size={13}/></span><div><b>No recent deployments</b><small>No recent activity</small></div></div><div className="activity-item"><span className="activity-symbol muted"><CreditCard size={13}/></span><div><b>No recent invoices</b><small>No recent invoices.</small></div></div></section></div></>;}
function DashTablePage({type}:{type:'services'|'orders'|'invoices'|'tickets'}){const configs={services:{title:'My services',eyebrow:'LIVE RESOURCES',desc:'Everything currently running in your workspace.'},orders:{title:'Orders',eyebrow:'ORDER HISTORY',desc:'Your provisioning and upgrade history.'},invoices:{title:'Invoices',eyebrow:'BILLING',desc:'Receipts and payment history.'},tickets:{title:'Tickets',eyebrow:'SUPPORT',desc:'Conversations with the ArveX team.'}}; const c=configs[type]; const rows=type==='services'?[['No active game servers','Game server','FRA-02','Operational'],['No active VPS services','VPS / Node 2','HEL-01','Operational'],['No active bot services','Bot hosting','FRA-02','Operational']]:type==='orders'?[['—','No active game servers','—','Complete'],['—','No active VPS services','—','Complete'],['—','No active bot services','—','Complete']]:type==='invoices'?[['—','—','$0.00','Paid'],['—','—','$0.00','Paid'],['—','—','$0.00','Paid']]:[['—','No support tickets','—','Open'],['—','No active support requests','—','Open'],['—','No billing requests','—','Closed']];return <><div className="dash-page-heading"><div><p className="eyebrow"><span className="eyebrow-dot"/> {c.eyebrow}</p><h1>{c.title}</h1><p>{c.desc}</p></div>{type==='tickets' ? (
      <Button onClick={()=>alert('New ticket form opened')} data-testid={`button-${type}-action`}>
        New ticket <ArrowRight size={15}/>
      </Button>
    ) : type==='services' ? (
      <Link href="/services" className="btn btn-primary" data-testid={`button-${type}-action`}>
        Provision service <ArrowRight size={15}/>
      </Link>
    ) : (
      <Button onClick={()=>alert('Export started')} data-testid={`button-${type}-action`}>
        Export <ArrowRight size={15}/>
      </Button>
    )}</div><section className="dash-panel full-panel"><div className="table-toolbar"><div className="table-search"><Search size={16}/><input placeholder={`Search ${type}...`} data-testid={`input-search-${type}`}/></div><button className="filter-button" onClick={()=>alert('Filter options')} data-testid={`button-filter-${type}`}><Settings size={15}/> Filter</button></div><div className="data-table">{rows.map((r,i)=><div className="data-row" key={r[0]} data-testid={`row-${type}-${i}`}><span className="row-primary">{r[0]}<small>{r[1]}</small></span><span>{r[2]}</span><span className={r[3]==='Paid'||r[3]==='Operational'||r[3]==='Complete'?'table-good':'table-status'}>{r[3]}</span><button onClick={()=>alert(`Opening ${r[0]}`)} data-testid={`button-open-${type}-${i}`}><ChevronRight size={17}/></button></div>)}</div></section></>;}
function DashProfile({security=false}:{security?:boolean}){return <><div className="dash-page-heading"><div><p className="eyebrow"><span className="eyebrow-dot"/> {security?'ACCESS CONTROL':'ACCOUNT SETTINGS'}</p><h1>{security?'Security':'Profile'}</h1><p>{security?'Manage how you sign in and keep your workspace protected.':'Your personal details and notification preferences.'}</p></div></div><div className="settings-grid"><section className="dash-panel settings-panel"><div className="panel-heading"><div><h2>{security?'Sign-in security':'Personal information'}</h2><p>{security?'Strong account hygiene keeps your services safe.':'This is the information associated with your ArveX account.'}</p></div></div>{security?<><div className="setting-row"><div><b>Two-factor authentication</b><small>Protect your account with an authenticator app.</small></div><button className="toggle" onClick={e=>e.currentTarget.classList.toggle('on')} data-testid="button-toggle-2fa"><i/></button></div><div className="setting-row"><div><b>Active sessions</b><small>2 sessions currently active</small></div><Button variant="line" onClick={()=>alert('Other sessions signed out')} data-testid="button-sign-out-sessions">Sign out other sessions</Button></div><div className="setting-row"><div><b>API access</b><small>Manage keys for automation and integrations.</small></div><Button variant="line" onClick={()=>alert('API key creation opened')} data-testid="button-manage-api-keys">Manage keys</Button></div></>:<form className="settings-form" onSubmit={e=>{e.preventDefault();alert('Profile saved')}}><label>FULL NAME<input defaultValue="ArveX Customer" data-testid="input-profile-name"/></label><label>EMAIL ADDRESS<input defaultValue="customer@arvex.host" data-testid="input-profile-email"/></label><label>TIMEZONE<select defaultValue="Asia/Colombo" data-testid="select-profile-timezone"><option>Asia/Colombo</option><option>America/New_York</option><option>Asia/Tokyo</option></select></label><Button type="submit" data-testid="button-save-profile">Save changes <Check size={15}/></Button></form>}</section><section className="dash-panel settings-side"><div className="profile-avatar">AR</div><h3>ArveX Customer</h3><p>customer@arvex.host</p><span className="mono">ARVEX CUSTOMER</span></section></div></>;}
function Dashboard(){return <DashboardShell><Switch><Route path="/dashboard" component={DashOverview}/><Route path="/dashboard/services"><DashTablePage type="services"/></Route><Route path="/dashboard/orders"><DashTablePage type="orders"/></Route><Route path="/dashboard/invoices"><DashTablePage type="invoices"/></Route><Route path="/dashboard/tickets"><DashTablePage type="tickets"/></Route><Route path="/dashboard/profile"><DashProfile/></Route><Route path="/dashboard/security"><DashProfile security/></Route></Switch></DashboardShell>;}

function Checkout(){const {user,isAuthenticated,isLoading,login}=useAuth();const [step,setStep]=useState(1);const [coupon,setCoupon]=useState('');const [couponMsg,setCouponMsg]=useState('');const [done,setDone]=useState(false);const [submitting,setSubmitting]=useState(false);const [error,setError]=useState('');const [orderId,setOrderId]=useState('');const placeOrder=async()=>{setSubmitting(true);setError('');try{const response=await fetch('/api/orders',{method:'POST',credentials:'include',headers:{'content-type':'application/json'},body:JSON.stringify({plan:'Node 2',service:'Cloud VPS',region:'Frankfurt, Germany',total:10.9})});const payload=await response.json();if(!response.ok)throw new Error(payload.message||'Could not place your order.');setOrderId(payload.orderId);setDone(true)}catch(err){setError(err instanceof Error?err.message:'Could not place your order.')}finally{setSubmitting(false)}};if(isLoading)return <PublicShell><main className="checkout-page complete"><p className="eyebrow">SECURE CHECKOUT</p><h1>Checking your<br/><em>account.</em></h1></main></PublicShell>;if(!isAuthenticated)return <PublicShell><main className="checkout-page complete"><div className="complete-mark"><LockKeyhole size={31}/></div><p className="eyebrow">ACCOUNT REQUIRED</p><h1>Sign in to<br/><em>continue.</em></h1><p>Create or access your real ArveX account before ordering a service.</p><Button onClick={login} className="btn-large" data-testid="button-checkout-login">Sign in to order <ArrowRight size={16}/></Button></main></PublicShell>;if(done)return <PublicShell><main className="checkout-page complete"><div className="complete-mark"><Check size={31}/></div><p className="eyebrow">ORDER CONFIRMED / {orderId}</p><h1>Welcome to the<br/><em>network.</em></h1><p>Your order was received for {user?.email}. We sent the order details to the ArveX operations channel.</p><Link href="/dashboard" className="btn btn-primary btn-large" data-testid="link-checkout-dashboard">Open client portal <ArrowRight size={16}/></Link></main></PublicShell>;return <PublicShell><main className="checkout-page"><div className="container checkout-wrap"><div className="checkout-head"><Link href="/services" className="back-link" data-testid="link-back-services"><ChevronRight size={15} style={{transform:'rotate(180deg)'}}/> Back to services</Link><div className="checkout-steps">{[1,2,3].map(n=><span className={step>=n?'active':''} key={n}><i>{step>n?<Check size={12}/>:n}</i><small>{['Configure','Details','Confirm'][n-1]}</small></span>)}</div></div><div className="checkout-grid"><section className="checkout-form">{step===1&&<><p className="eyebrow">STEP 01 / CONFIGURE</p><h1>Make it yours.</h1><p className="checkout-intro">You’re setting up <b>Node 2 / Cloud VPS</b>. Adjust the defaults or keep moving.</p><label>REGION<select defaultValue="Frankfurt, Germany" data-testid="select-checkout-region"><option>Frankfurt, Germany</option><option>Helsinki, Finland</option><option>Ashburn, United States</option></select></label><label>OPERATING SYSTEM<select defaultValue="Ubuntu 24.04 LTS" data-testid="select-checkout-os"><option>Ubuntu 24.04 LTS</option><option>Debian 12</option><option>AlmaLinux 9</option></select></label><div className="checkout-options"><button className="selected" data-testid="button-checkout-backup"><Check size={15}/> Daily backups <span>+$2.00 / mo</span></button><button data-testid="button-checkout-ip"><Plus size={15}/> Additional IPv4 <span>+$1.50 / mo</span></button></div><Button onClick={()=>setStep(2)} data-testid="button-checkout-step-2">Continue <ArrowRight size={16}/></Button></>}{step===2&&<><p className="eyebrow">STEP 02 / YOUR DETAILS</p><h1>Almost there.</h1><p className="checkout-intro">We’ll use the email on your authenticated account: <b>{user?.email}</b>.</p><label>PAYMENT METHOD<div className="payment-box"><CreditCard size={18}/><span>Payment provider setup required</span><BadgeCheck size={16}/></div></label><div className="checkout-nav"><Button variant="ghost" onClick={()=>setStep(1)} data-testid="button-checkout-back">Back</Button><Button onClick={()=>setStep(3)} data-testid="button-checkout-step-3">Review order <ArrowRight size={16}/></Button></div></>}{step===3&&<><p className="eyebrow">STEP 03 / CONFIRM</p><h1>Ready to run.</h1><p className="checkout-intro">Review your order before provisioning begins.</p><div className="review-box"><p><span>Cloud VPS / Node 2</span><b>$8.90 / month</b></p><p><span>Daily backups</span><b>$2.00 / month</b></p><hr/><p><span>Total today</span><strong>$10.90</strong></p></div><div className="coupon"><input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="Have a coupon?" data-testid="input-coupon"/><Button variant="line" onClick={()=>setCouponMsg(coupon.toUpperCase()==='ARVEX10'?'10% discount applied':'That code isn’t valid')} data-testid="button-apply-coupon">Apply</Button></div>{couponMsg&&<p className={`coupon-msg ${couponMsg.includes('applied')?'good':''}`}>{couponMsg}</p>}{error&&<p className="coupon-msg">{error}</p>}<div className="checkout-nav"><Button variant="ghost" onClick={()=>setStep(2)} data-testid="button-review-back">Back</Button><Button onClick={placeOrder} disabled={submitting} data-testid="button-place-order">{submitting?'Sending order…':'Send order request'} <Rocket size={16}/></Button></div></>}</section><aside className="order-summary"><div className="summary-top"><span className="mono">ORDER SUMMARY</span><span className="status-pill"><i/> SECURE</span></div><div className="summary-product"><div className="summary-icon"><Cloud size={20}/></div><div><b>Cloud VPS</b><small>Node 2 · Frankfurt</small></div><strong>$8.90<small>/ month</small></strong></div><div className="summary-lines"><p><span>Compute</span><b>$8.90</b></p><p><span>Daily backups</span><b>$2.00</b></p><p><span>Tax</span><b>Calculated at checkout</b></p></div><div className="summary-total"><span>Due today</span><strong>$10.90</strong></div><div className="secure-note"><ShieldCheck size={16}/><span>30-day money-back guarantee<br/><small>Encrypted checkout · No hidden fees</small></span></div></aside></div></div></main></PublicShell>;}

function Admin(){
  const [authenticated,setAuthenticated]=useState<boolean|null>(null);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loginError,setLoginError]=useState('');
  const [active,setActive]=useState('Overview');
  const [published,setPublished]=useState(true);
  useEffect(()=>{fetch('/api/admin/session').then(r=>r.json()).then(data=>setAuthenticated(Boolean(data.authenticated))).catch(()=>setAuthenticated(false))},[]);
  const login=async(e:React.FormEvent)=>{e.preventDefault();setLoginError('');const response=await fetch('/api/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password})});const data=await response.json();if(!response.ok){setLoginError(data.message||'Unable to sign in.');return}setAuthenticated(true);setPassword('')};
  if(authenticated===null)return <div className="auth-page admin-gate"><div className="auth-form-wrap"><Logo/><p className="eyebrow">ARVEX / CONTROL ROOM</p><h2>Checking access…</h2></div></div>;
  if(!authenticated)return <PublicShell bare><main className="auth-page admin-gate"><div className="auth-form-wrap"><Logo/><div className="auth-form-head"><p className="eyebrow">ARVEX / ADMIN ACCESS</p><h2>Welcome, operator.</h2><p>Sign in with the administrator credentials configured for this workspace.</p></div><form onSubmit={login}><label>ADMIN EMAIL<input autoComplete="username" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@yourdomain.com" data-testid="input-admin-email"/></label><label>ADMIN PASSWORD<input autoComplete="current-password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your secure password" data-testid="input-admin-password"/></label>{loginError&&<p className="coupon-msg">{loginError}</p>}<Button type="submit" data-testid="button-admin-login">Enter control room <ArrowRight size={16}/></Button></form><p className="auth-switch"><Link href="/" data-testid="link-admin-back">Back to public site</Link></p></div></main></PublicShell>;
  return <div className="admin-shell noise"><aside className="admin-side"><Logo/><div className="admin-label mono">CONTROL ROOM</div>{['Overview','Services','Customers','Orders','Content'].map(x=><button className={active===x?'active':''} onClick={()=>setActive(x)} key={x} data-testid={`button-admin-${x.toLowerCase()}`}><span>{x==='Overview'?<LayoutDashboard size={16}/>:x==='Services'?<Server size={16}/>:x==='Customers'?<Users size={16}/>:x==='Orders'?<ShoppingCart size={16}/>:<FileText size={16}/>}</span>{x}</button>)}<div className="admin-bottom"><Button variant="line" onClick={()=>alert('Admin settings opened')} data-testid="button-admin-settings"><Settings size={16}/> Settings</Button><button onClick={async()=>{await fetch('/api/admin/logout',{method:'POST'});setAuthenticated(false)}} data-testid="button-admin-logout"><LogIn size={16}/> Sign out</button><Link href="/" data-testid="link-admin-public"><ExternalLink size={16}/> Public site</Link></div></aside><main className="admin-main"><header className="admin-header"><div><span className="mono">ARVEX / ADMIN</span><h1>{active}</h1></div><div className="admin-actions"><StatusPill>Production</StatusPill><span className="admin-user">AD<span>Admin</span></span></div></header>{active==='Overview'?<><div className="admin-stats"><div><span>MRR</span><strong>$24,862</strong><small className="good">↑ 8.4% this month</small></div><div><span>ACTIVE NODES</span><strong>1,284</strong><small>Across 3 regions</small></div><div><span>TICKETS</span><strong>18</strong><small>4 need attention</small></div><div><span>UPTIME</span><strong>99.99%</strong><small>Last 30 days</small></div></div><div className="admin-panels"><section className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">LIVE FLEET</span><h2>Region health</h2></div><button onClick={()=>alert('Fleet refreshed')} data-testid="button-refresh-fleet"><Activity size={16}/></button></div>{[['Frankfurt','FRA','99.99%','1,010'],['Helsinki','HEL','100.00%','174'],['Ashburn','IAD','99.98%','100']].map(r=><div className="region-row" key={r[1]}><span className="region-code mono">{r[1]}</span><b>{r[0]}</b><span className="region-bar"><i style={{width:r[3]==='1,010'?'88%':r[3]==='174'?'37%':'21%'}}/></span><span className="mono">{r[2]}</span><StatusPill/></div>)}</section><section className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">CONTENT</span><h2>Homepage banner</h2></div><button className={`toggle ${published?'on':''}`} onClick={()=>setPublished(!published)} data-testid="button-toggle-banner"><i/></button></div><div className="content-preview"><span className="mono">PROMO / AUTUMN-01</span><b>20% off annual plans</b><p>Ends Nov 30, 2025</p><div className={published?'published':'draft'}><i/> {published?'Published':'Draft'}</div></div></section></div></>:<section className="admin-panel admin-empty"><Box size={27}/><h2>{active} workspace</h2><p>Manage {active.toLowerCase()} across ArveX. This workspace is ready for your next content update.</p><Button onClick={()=>alert(`${active} action opened`)} data-testid="button-admin-primary">Create new <Plus size={15}/></Button></section>}</main></div>;
}

function LegalPage({type}:{type:'about'|'terms'|'privacy'|'refund-policy'|'acceptable-use-policy'}){const content={about:['Built for the long run.','ArveX is an independent infrastructure company for people who take their projects seriously. We started with a simple belief: hosting should feel like a dependable tool, not a second job.','Small enough to listen. Technical enough to help. We operate a focused network across Europe and North America, with an obsessive eye on latency, reliability and the little details that make a service feel good.'],terms:['Terms of service','These terms explain the straightforward relationship between you and ArveX Hosting. By using our services, you agree to use them lawfully, keep your credentials secure and pay for the resources you provision.','Services renew automatically unless cancelled before the renewal date. We may suspend accounts for abuse, non-payment or activity that puts other customers at risk.'],privacy:['Privacy, without the fog.','We collect the information required to provide your account, process payments and offer support. We do not sell customer data. We retain operational logs only for as long as needed for security and reliability.','You can request a copy or deletion of your personal data by contacting privacy@arvex.host.'], 'refund-policy':['A fair exit.','New services are covered by a 30-day money-back guarantee, unless otherwise noted at checkout. Contact support with your order number and we will review the request promptly.','Usage-based products, domain registrations and services cancelled after an abuse investigation are not eligible for a refund.'], 'acceptable-use-policy':['Keep the network healthy.','ArveX resources are for lawful, respectful use. Do not use them for malware, credential theft, unsolicited bulk messaging, content distribution that violates applicable law or attempts to interfere with another system.','If we identify a credible risk, we may limit or suspend a service while we investigate. We will communicate clearly whenever circumstances allow.']}[type];return <PublicShell><main className="page legal-page"><div className="container legal-wrap"><p className="eyebrow"><span className="eyebrow-dot"/> ARVEX / {type.replaceAll('-',' ').toUpperCase()}</p><h1>{content[0]}</h1><p className="legal-lead">{content[1]}</p><div className="legal-body"><p>{content[2]}</p><h2>Clear by design</h2><p>We write policies in plain language because you have better things to do than decode them. If anything here feels unclear, <Link href="/support">ask our team</Link> and we will explain it.</p><div className="legal-updated mono">LAST UPDATED / 2026</div></div></div></main></PublicShell>;}


function FivemPlansPage() {
  const [selected, setSelected] = useState<any>(null);

  const included = [
    "High-Performance CPU",
    "NVMe SSD Storage",
    "DDoS Protection",
    "Pterodactyl Game Panel",
    "txAdmin Support",
    "Instant Server Deployment",
    "Full Server Console Access",
    "File Manager",
    "ESX / QBCore / vRP Support",
    "Custom Resource Support",
    "Automated Backups",
    "Scheduled Restarts",
    "Server Monitoring",
    "Easy Upgrades",
    "Discord Support",
  ];

  return (
    <PublicShell>
      <main className="page">

        <section className="container page-hero">
          <p className="eyebrow">
            <span className="eyebrow-dot"/>
            ARVEX HOSTING / FIVEM SERVER HOSTING
          </p>

          <h1>
            Build Your FiveM<br/>
            <em>Community.</em>
          </h1>

          <p>
            High-performance FiveM hosting built for your community,
            powered by powerful CPU resources, NVMe storage,
            DDoS protection, txAdmin and Pterodactyl.
          </p>

          <div className="product-points">
            <span>High-Performance CPU</span>
            <span>NVMe Storage</span>
            <span>DDoS Protection</span>
            <span>txAdmin</span>
            <span>Pterodactyl Panel</span>
          </div>
        </section>

        <section className="container">
          <div className="catalog-grid">
            {fivemPlans.map((plan) => (
              <div className="catalog-card" key={plan.name}>

                <div className="catalog-card-top">
                  <span className="tile-icon">
                    <Gamepad2 size={16}/>
                  </span>

                  <span className="mono">
                    FIVEM SERVER HOSTING
                  </span>
                </div>

                <h3>{plan.name}</h3>

                <div className="plan-price">
                  <strong>
                    LKR {plan.price.toLocaleString("en-LK")}
                  </strong>
                  <small>/ month</small>
                </div>

                <div className="plan-specs">

                  <div>
                    <span>
                      <MemoryIcon/>
                      RAM
                    </span>
                    <b>{plan.ram}</b>
                  </div>

                  <div>
                    <span>
                      <CpuIcon/>
                      CPU
                    </span>
                    <b>{plan.cpu}</b>
                  </div>

                  <div>
                    <span>
                      <Database size={15}/>
                      Storage
                    </span>
                    <b>{plan.storage}</b>
                  </div>

                  <div>
                    <span>
                      <Users size={15}/>
                      Players
                    </span>
                    <b>{plan.players}</b>
                  </div>

                </div>

                <Button
                  onClick={() => setSelected(plan)}
                  data-testid={`button-fivem-${plan.name}`}
                >
                  Deploy server <ArrowRight size={16}/>
                </Button>

              </div>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="dash-panel">

            <p className="eyebrow">
              INCLUDED WITH EVERY PLAN
            </p>

            <h2>
              Everything your community needs.
            </h2>

            <div className="product-points included-list">
              {included.map((item) => (
                <span key={item}>
                  <Check size={15}/>
                  {item}
                </span>
              ))}
            </div>

          </div>
        </section>

        <section className="container page-hero compact">
          <p className="eyebrow">
            ARVEX HOSTING
          </p>

          <h2>
            Your Community. Your Server. <em>Your World.</em>
          </h2>
        </section>

        {selected && (
          <div
            className="modal-backdrop"
            onClick={() => setSelected(null)}
          >
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="eyebrow">
                ARVEX / FIVEM
              </p>

              <h2>
                {selected.name}
              </h2>

              <p>
                {selected.ram} RAM • {selected.cpu} • {selected.storage}
              </p>

              <div className="plan-price">
                <strong>
                  LKR {selected.price.toLocaleString("en-LK")}
                </strong>
                <small>/ month</small>
              </div>

              <div className="modal-actions">
                <Button
                  onClick={() => {
                    window.location.href =
                      `/checkout?plan=${encodeURIComponent(selected.name)}&game=fivem`;
                  }}
                >
                  Continue <ArrowRight size={16}/>
                </Button>

                <Button
                  variant="line"
                  onClick={() => setSelected(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

      </main>
    </PublicShell>
  );
}



function ArkPlansPage() {
  const plans = [
    {
      name: "ARX-ARK 8GB",
      ram: "8 GB",
      cpu: "300%",
      storage: "100 GB NVMe SSD",
      players: "Up to 10",
      price: 2250
    },
    {
      name: "ARX-ARK 10GB",
      ram: "10 GB",
      cpu: "400%",
      storage: "120 GB NVMe SSD",
      players: "Up to 15",
      price: 2850
    },
    {
      name: "ARX-ARK 12GB",
      ram: "12 GB",
      cpu: "500%",
      storage: "150 GB NVMe SSD",
      players: "Up to 20",
      price: 3450
    },
    {
      name: "ARX-ARK 16GB",
      ram: "16 GB",
      cpu: "600%",
      storage: "200 GB NVMe SSD",
      players: "Up to 25",
      price: 4450
    },
    {
      name: "ARX-ARK 24GB",
      ram: "24 GB",
      cpu: "700%",
      storage: "300 GB NVMe SSD",
      players: "Up to 35",
      price: 6450
    },
    {
      name: "ARX-ARK 32GB",
      ram: "32 GB",
      cpu: "800%",
      storage: "400 GB NVMe SSD",
      players: "Up to 50",
      price: 8450
    },
    {
      name: "ARX-ARK 48GB",
      ram: "48 GB",
      cpu: "900%",
      storage: "550 GB NVMe SSD",
      players: "Up to 70",
      price: 11950
    },
    {
      name: "ARX-ARK 64GB",
      ram: "64 GB",
      cpu: "1000%",
      storage: "700 GB NVMe SSD",
      players: "Up to 100+",
      price: 15780
    }
  ];

  const included = [
    "High-Performance CPU",
    "NVMe SSD Storage",
    "DDoS Protection",
    "Pterodactyl Game Panel",
    "Instant Server Deployment",
    "Full Server Console Access",
    "File Manager",
    "Mod Support",
    "Steam Workshop Support",
    "Automated Backups",
    "Scheduled Restarts",
    "Server Monitoring",
    "Easy Upgrades",
    "Discord Support"
  ];

  return (
    <PublicShell>
      <main className="page">
        <section className="container page-hero">
          <p className="eyebrow">
            <span className="eyebrow-dot"/>
            ARVEX HOSTING / ARK: SURVIVAL EVOLVED
          </p>

          <h1>
            Power Your ARK<br/>
            <em>Adventure.</em>
          </h1>

          <p>
            High-performance ARK: Survival Evolved hosting powered by
            NVMe storage, powerful CPU resources and DDoS protection.
          </p>

          <div className="product-points">
            <span>⚡ High Performance CPU</span>
            <span>🚀 NVMe Storage</span>
            <span>🛡️ DDoS Protection</span>
            <span>🎮 Pterodactyl Panel</span>
          </div>
        </section>

        <section className="container">
          <div className="catalog-grid">
            {plans.map((plan) => (
              <div className="catalog-card" key={plan.name}>
                <div className="catalog-card-top">
                  <span className="tile-icon">🦖</span>
                  <span className="mono">ARK SERVER</span>
                </div>

                <h3>{plan.name}</h3>

                <div className="plan-price">
                  <strong>
                    LKR {plan.price.toLocaleString()}
                  </strong>
                  <small>/ month</small>
                </div>

                <div className="plan-specs">
                  <div><span>RAM</span><b>{plan.ram}</b></div>
                  <div><span>CPU</span><b>{plan.cpu}</b></div>
                  <div><span>Storage</span><b>{plan.storage}</b></div>
                  <div><span>Players</span><b>{plan.players}</b></div>
                </div>

                <Button
                  onClick={() => {
                    window.location.href =
                      `/checkout?plan=${encodeURIComponent(plan.name)}`;
                  }}
                  data-testid={`button-buy-${plan.name}`}
                >
                  Deploy ARK Server <ArrowRight size={16}/>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="dash-panel">
            <p className="eyebrow">INCLUDED WITH EVERY PLAN</p>
            <h2>Everything you need to survive.</h2>

            <div className="product-points">
              {included.map((item) => (
                <span key={item}>
                  <Check size={15}/>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="container page-hero compact">
          <p className="eyebrow">ARVEX HOSTING</p>
          <h2>Survive. Build. <em>Conquer.</em></h2>
        </section>
      </main>
    </PublicShell>
  );
}



function PalworldPlansPage() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <PublicShell>
      <main className="page">
        <div className="container product-hero">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-dot"/>
              PALWORLD SERVER HOSTING
            </p>

            <h1>
              Powerful Palworld Hosting
              <br/>
              <em>Built For Your World.</em>
            </h1>

            <p>
              High-performance Palworld servers with NVMe storage,
              powerful CPU resources and DDoS protection.
            </p>

            <div className="product-points">
              <span><Check size={15}/> Instant deployment</span>
              <span><Check size={15}/> DDoS protection</span>
              <span><Check size={15}/> Human support</span>
            </div>
          </div>

          <div className="product-art grid-atmosphere">
            <div className="art-ring"/>
            <div className="art-icon">
              <Gamepad2 size={52}/>
            </div>
            <span className="mono">ARVEX / PALWORLD</span>
          </div>
        </div>

        <div className="container plans-section">
          <div className="plans-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot"/>
                PALWORLD CONFIGURATIONS
              </p>
              <h2>Choose your world.</h2>
            </div>
          </div>

          <div className="plans-grid">
            {palworldPlans.map((plan, index) => (
              <div
                className={`plan-card ${index === 1 ? "featured" : ""}`}
                key={plan.name}
              >
                {index === 1 && (
                  <span className="plan-badge">MOST POPULAR</span>
                )}

                <div className="plan-top">
                  <span className="plan-dot"/>
                  <span className="mono">
                    {plan.name}
                  </span>
                </div>

                <div className="plan-price">
                  <strong>
                    LKR {plan.lkr.toLocaleString("en-LK")}
                  </strong>
                  <span>/ mo</span>
                  <small className="plan-usd-price">
                    ≈ ${(plan.lkr / USD_LKR_RATE).toFixed(2)} USD
                  </small>
                </div>

                <div className="plan-specs">
                  <span>
                    <MemoryIcon/> {plan.ram} RAM
                  </span>

                  <span>
                    <CpuIcon/> {plan.cpu} CPU
                  </span>

                  <span>
                    <Database size={15}/> {plan.storage}
                  </span>

                  <span>
                    <Users size={15}/> {plan.players} players
                  </span>
                </div>

                <Button
                  variant={index === 1 ? "primary" : "line"}
                  className="plan-button"
                  onClick={() => setSelected(plan)}
                  data-testid={`button-select-palworld-${index}`}
                >
                  Select {plan.ram}
                  <ArrowRight size={15}/>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <section className="container product-bottom">
          <div>
            <ShieldCheck size={20}/>
            <b>Included with every Palworld plan</b>
            <p>
              High-performance CPU, NVMe SSD storage, DDoS protection,
              Pterodactyl, automatic backups, scheduled restarts,
              file manager, console access and 24/7 monitoring.
            </p>
          </div>
        </section>
      </main>

      {selected && (
        <OrderModal
          plan={{
            ...selected,
            kind: "palworld",
            currency: "LKR",
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </PublicShell>
  );
}



function GameServerPage() {

  const [selectedGame, setSelectedGame] = useState<typeof gameServerOptions[number] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = selectedGame?.slug === "minecraft-java"
    ? minecraftPlans
    : defaultGamePlans;

  if (!selectedGame) {
    return (
      <PublicShell>
        <main className="page">
          <div className="container page-hero">
            <p className="eyebrow">
              <span className="eyebrow-dot"/> GAME SERVERS
            </p>

            <h1>
              Choose your<br/>
              <em>game.</em>
            </h1>

            <p>
              Select the game you want to host and choose the perfect
              server configuration for your community.
            </p>
          </div>

          <div className="container">
            <div className="catalog-grid">
              {gameServerOptions.map((game, i) => {
                const Icon = game.icon;

                return (
                  <button
                    key={game.slug}
                    type="button"
                    className={`catalog-card reveal delay-${i % 3}`}
                    onClick={() => {
                      if (game.slug === "palworld") {
                        window.location.href = "/services/game-hosting/palworld";
                      } else if (game.slug === "rust") {
                        window.location.href = "/services/game-hosting/rust";
                      } else if (game.slug === "ark-survival-evolved" || game.slug === "ark") {
                        window.location.href = "/services/game-hosting/ark-survival-evolved";
                      } else {
                        setSelectedGame(game);
                      }
                    }}
                    style={{

                      textAlign: "left",
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,.08)",
                    }}
                    data-testid={`game-select-${game.slug}`}
                  >
                    <div className={`catalog-icon icon-${game.color}`}>
                      <Icon size={23}/>
                    </div>

                    <div className="catalog-number mono">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <h2>{game.title}</h2>

                    <p>{game.desc}</p>

                    <div className="catalog-meta">
                      <span className="mono">
                        SELECT GAME
                      </span>
                      <ArrowRight size={17}/>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <main className="page">

        <div className="container product-hero">

          <div>

            <button
              type="button"
              className="text-link"
              onClick={() => setSelectedGame(null)}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                cursor: "pointer",
                marginBottom: "24px",
              }}
            >
              ← Back to games
            </button>

            <p className="eyebrow">
              <span className="eyebrow-dot"/>
              GAME SERVER / {selectedGame.short.toUpperCase()}
            </p>

            <h1>
              {selectedGame.title}<br/>
              <em>hosting.</em>
            </h1>

            <p>
              {selectedGame.desc}
              {" "}Powered by ArveX high-performance infrastructure,
              NVMe storage and DDoS protection.
            </p>

            <div className="product-points">
              <span><Check size={15}/> Instant activation</span>
              <span><Check size={15}/> NVMe SSD</span>
              <span><Check size={15}/> DDoS protection</span>
              <span><Check size={15}/> Pterodactyl panel</span>
            </div>

          </div>

          <div className="product-art grid-atmosphere">
            <div className="art-ring"/>
            <div className="art-icon">
              <selectedGame.icon size={52}/>
            </div>
            <span className="mono">
              ARVEX / {selectedGame.slug.toUpperCase()}
            </span>
          </div>

        </div>

        <div className="container plans-section">

          <div className="plans-heading">

            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot"/>
                SERVER CONFIGURATIONS
              </p>

              <h2>
                Choose your {selectedGame.short} plan.
              </h2>
            </div>

          </div>

          <div className="plans-grid">

            {plans.map((plan, i) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                featured={i === 3}
                onSelect={() =>
                  setSelectedPlan({
                    ...plan,
                    kind: selectedGame.slug,
                    game: selectedGame.title,
                  })
                }
              />
            ))}

          </div>

        </div>

        <section className="container product-bottom">

          <div>
            <Activity size={20}/>
            <b>Everything you need to run your server</b>

            <p>
              High-performance CPU, NVMe SSD storage, DDoS protection,
              Pterodactyl Game Panel, instant deployment, plugins and mods,
              automated backups, easy upgrades and 24/7 monitoring.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-line"
            onClick={() => setSelectedGame(null)}
          >
            Change game <ArrowRight size={16}/>
          </button>

        </section>

      </main>

      {selectedPlan && (
        <OrderModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}

    </PublicShell>
  );
}



function ArkAscendedPlansPage() {
  const plans = [
    {
      name: "ARX-ASA 8GB",
      ram: "8 GB",
      cpu: "300%",
      storage: "100 GB NVMe SSD",
      players: "Up to 10",
      price: 3250
    },
    {
      name: "ARX-ASA 10GB",
      ram: "10 GB",
      cpu: "400%",
      storage: "120 GB NVMe SSD",
      players: "Up to 15",
      price: 3850
    },
    {
      name: "ARX-ASA 12GB",
      ram: "12 GB",
      cpu: "500%",
      storage: "150 GB NVMe SSD",
      players: "Up to 20",
      price: 4550
    },
    {
      name: "ARX-ASA 16GB",
      ram: "16 GB",
      cpu: "600%",
      storage: "200 GB NVMe SSD",
      players: "Up to 25",
      price: 6250
    },
    {
      name: "ARX-ASA 24GB",
      ram: "24 GB",
      cpu: "700%",
      storage: "300 GB NVMe SSD",
      players: "Up to 35",
      price: 8950
    },
    {
      name: "ARX-ASA 32GB",
      ram: "32 GB",
      cpu: "800%",
      storage: "400 GB NVMe SSD",
      players: "Up to 50",
      price: 11950
    },
    {
      name: "ARX-ASA 48GB",
      ram: "48 GB",
      cpu: "900%",
      storage: "550 GB NVMe SSD",
      players: "Up to 70",
      price: 15450
    },
    {
      name: "ARX-ASA 64GB",
      ram: "64 GB",
      cpu: "1000%",
      storage: "700 GB NVMe SSD",
      players: "Up to 100+",
      price: 19950
    }
  ];

  const included = [
    "High-Performance CPU",
    "NVMe SSD Storage",
    "DDoS Protection",
    "Pterodactyl Game Panel",
    "Instant Server Deployment",
    "Full Server Console Access",
    "File Manager",
    "CurseForge Mod Support",
    "Automated Backups",
    "Scheduled Restarts",
    "Server Monitoring",
    "Easy Upgrades",
    "Discord Support"
  ];

  return (
    <PublicShell>
      <main className="page">

        <section className="container page-hero">
          <p className="eyebrow">
            <span className="eyebrow-dot"/>
            ARVEX HOSTING / ARK: SURVIVAL ASCENDED
          </p>

          <h1>
            Power Your ARK<br/>
            <em>Ascended Adventure.</em>
          </h1>

          <p>
            High-performance ARK: Survival Ascended hosting powered by
            powerful CPU resources, NVMe storage and DDoS protection.
          </p>

          <div className="product-points">
            <span>High-Performance CPU</span>
            <span>NVMe Storage</span>
            <span>DDoS Protection</span>
            <span>Pterodactyl Panel</span>
          </div>
        </section>

        <section className="container">
          <div className="catalog-grid">
            {plans.map((plan) => (
              <div className="catalog-card" key={plan.name}>

                <div className="catalog-card-top">
                  <span className="tile-icon">
                    <Gamepad2 size={16}/>
                  </span>
                  <span className="mono">ARK: SURVIVAL ASCENDED</span>
                </div>

                <h3>{plan.name}</h3>

                <div className="plan-price">
                  <strong>
                    LKR {plan.price.toLocaleString("en-LK")}
                  </strong>
                  <small>/ month</small>
                </div>

                <div className="plan-specs">
                  <div>
                    <span><MemoryIcon/> RAM</span>
                    <b>{plan.ram}</b>
                  </div>

                  <div>
                    <span><CpuIcon/> CPU</span>
                    <b>{plan.cpu}</b>
                  </div>

                  <div>
                    <span><Database size={15}/> Storage</span>
                    <b>{plan.storage}</b>
                  </div>

                  <div>
                    <span><Users size={15}/> Players</span>
                    <b>{plan.players}</b>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    window.location.href =
                      `/checkout?plan=${encodeURIComponent(plan.name)}`;
                  }}
                  data-testid={`button-buy-${plan.name}`}
                >
                  Deploy ARK ASA Server <ArrowRight size={16}/>
                </Button>

              </div>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="dash-panel">
            <p className="eyebrow">INCLUDED WITH EVERY PLAN</p>

            <h2>Everything you need to survive.</h2>

            <div className="product-points">
              {included.map((item) => (
                <span key={item}>
                  <Check size={15}/>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="container page-hero compact">
          <p className="eyebrow">ARVEX HOSTING</p>
          <h2>Survive. Build. <em>Conquer.</em></h2>
        </section>

      </main>
    </PublicShell>
  );
}

function Router(){return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home}/><Route path="/services" component={ServicesPage}/><Route path="/services/game-hosting/palworld"><PalworldPlansPage/></Route><Route path="/services/game-hosting/ark-survival-evolved"><ArkPlansPage/></Route><Route path="/services/game-hosting/ark-survival-ascended"><ArkAscendedPlansPage/></Route><Route path="/services/game-hosting/rust"><GamePlanPage gameSlug="rust"/></Route>
<Route path="/services/game-hosting/fivem"><FivemPlansPage/></Route><Route path="/services/game-hosting"><GameServerPage/></Route><Route path="/services/vps"><ProductPage kind="vps"/></Route><Route path="/services/vds"><ProductPage kind="vds"/></Route><Route path="/services/web-hosting"><ProductPage kind="web-hosting"/></Route><Route path="/services/bot-hosting"><ProductPage kind="bot-hosting"/></Route><Route path="/services/domains" component={DomainsPage}/><Route path="/status" component={StatusPage}/><Route path="/support" component={SupportPage}/><Route path="/login"><AuthPage/></Route><Route path="/register"><AuthPage register/></Route><Route path="/dashboard" component={Dashboard}/><Route path="/dashboard/*" component={Dashboard}/><Route path="/checkout" component={Checkout}/><Route path="/order" component={Checkout}/><Route path="/admin" component={Admin}/><Route path="/about"><LegalPage type="about"/></Route><Route path="/terms"><LegalPage type="terms"/></Route><Route path="/privacy"><LegalPage type="privacy"/></Route><Route path="/refund-policy"><LegalPage type="refund-policy"/></Route><Route path="/acceptable-use-policy"><LegalPage type="acceptable-use-policy"/></Route><Route component={()=><PublicShell><main className="page not-found"><p className="eyebrow">404 / NOT FOUND</p><h1>That route<br/><em>doesn't exist.</em></h1><Link href="/" className="btn btn-primary" data-testid="link-404-home">Back home <ArrowRight size={16}/></Link></main></PublicShell>}/></Switch></ErrorBoundary>;}
function App(){return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>;}
export default App;
