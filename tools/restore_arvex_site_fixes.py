from pathlib import Path

APP = Path('artifacts/arvex-hosting/src/App.tsx')
s = APP.read_text(encoding='utf-8')

# Mark Bedrock unavailable in both game catalog definitions used by the app.
s = s.replace("slug: 'minecraft-bedrock',\n    title:", "slug: 'minecraft-bedrock',\n    unavailable: true,\n    title:", 1)
s = s.replace("slug: \"minecraft-bedrock\",\n    title:", "slug: \"minecraft-bedrock\",\n    unavailable: true,\n    title:", 1)

# Keep these games visible in the catalog, but make their state explicit.
# Only add the flag when the property is not already present.
s = s.replace("slug: 'terraria',\n    comingSoon: true", "slug: 'terraria',\n    comingSoon: true", 1)
s = s.replace("slug: 'project-zomboid',\n    comingSoon: true", "slug: 'project-zomboid',\n    comingSoon: true", 1)

# Add a dedicated VPS page if the previous repair is not already present.
if 'function VpsPlansPage()' not in s:
    marker = 'function Router(){'
    vps = r'''function VpsPlansPage() {
  const vpsPlans = [
    { name:'ARX-VPS 2GB', price:680, currency:'LKR', cpu:'1 vCore', ram:'2 GB', disk:'40 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 4GB', price:1350, currency:'LKR', cpu:'2 vCore', ram:'4 GB', disk:'80 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 6GB', price:1950, currency:'LKR', cpu:'3 vCore', ram:'6 GB', disk:'120 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 8GB', price:2650, currency:'LKR', cpu:'4 vCore', ram:'8 GB', disk:'160 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 12GB', price:3850, currency:'LKR', cpu:'6 vCore', ram:'12 GB', disk:'240 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 16GB', price:5200, currency:'LKR', cpu:'8 vCore', ram:'16 GB', disk:'320 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 24GB', price:7250, currency:'LKR', cpu:'10 vCore', ram:'24 GB', disk:'480 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 32GB', price:9500, currency:'LKR', cpu:'12 vCore', ram:'32 GB', disk:'640 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 48GB', price:14250, currency:'LKR', cpu:'16 vCore', ram:'48 GB', disk:'960 GB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 64GB', price:18500, currency:'LKR', cpu:'20 vCore', ram:'64 GB', disk:'1.28 TB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 96GB', price:24000, currency:'LKR', cpu:'28 vCore', ram:'96 GB', disk:'1.92 TB NVMe SSD', transfer:'Unmetered' },
    { name:'ARX-VPS 128GB', price:29000, currency:'LKR', cpu:'32 vCore', ram:'128 GB', disk:'2.56 TB NVMe SSD', transfer:'Unmetered' },
  ];

  return (
    <PublicShell>
      <main className="page">
        <section className="container product-hero">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot"/> CLOUD VPS</p>
            <h1>Powerful VPS<br/><em>for every project.</em></h1>
            <p>High-performance cloud VPS infrastructure with full root access, NVMe storage and reliable network protection.</p>
            <div className="product-points">
              <span><Check size={15}/> Full root access</span>
              <span><Check size={15}/> Dedicated IPv4</span>
              <span><Check size={15}/> DDoS protection</span>
              <span><Check size={15}/> Instant deployment</span>
            </div>
          </div>
          <div className="product-art grid-atmosphere">
            <div className="art-ring"/>
            <div className="art-icon"><Cloud size={52}/></div>
            <span className="mono">ARVEX / CLOUD VPS</span>
          </div>
        </section>
        <section className="container plans-section">
          <div className="plans-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot"/> VPS CONFIGURATIONS</p>
              <h2>Scale from 2GB<br/><em>to 128GB RAM.</em></h2>
              <p className="section-copy">Choose the resources you need today and upgrade as your workload grows.</p>
            </div>
          </div>
          <div className="plans-grid">
            {vpsPlans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} featured={index === 3}
                onSelect={() => { window.location.href = `/support?service=vps&plan=${encodeURIComponent(plan.name)}`; }} />
            ))}
          </div>
        </section>
        <section className="container product-bottom">
          <div><ShieldCheck size={20}/><b>Included with every VPS</b><p>Full root access • NVMe SSD • Dedicated IPv4 • DDoS protection • Instant deployment • 24/7 monitoring</p></div>
          <ArrowLink href="/support">Need a custom VPS?</ArrowLink>
        </section>
      </main>
    </PublicShell>
  );
}

'''
    if marker not in s:
        raise SystemExit('Router marker not found')
    s = s.replace(marker, vps + marker, 1)

s = s.replace('<Route path="/services/vps"><ProductPage kind="vps"/></Route>', '<Route path="/services/vps"><VpsPlansPage/></Route>', 1)

# Make the game catalog use dedicated pages for ASA and FiveM.
old_routes = '''                      if (game.slug === "palworld") {
                        window.location.href = "/services/game-hosting/palworld";
                      } else if (game.slug === "rust") {
                        window.location.href = "/services/game-hosting/rust";
                      } else if (game.slug === "ark-survival-evolved" || game.slug === "ark") {
                        window.location.href = "/services/game-hosting/ark-survival-evolved";
                      } else {
                        setSelectedGame(game);
                      }'''
new_routes = '''                      if (game.slug === "palworld") {
                        window.location.href = "/services/game-hosting/palworld";
                      } else if (game.slug === "rust") {
                        window.location.href = "/services/game-hosting/rust";
                      } else if (game.slug === "ark-survival-evolved" || game.slug === "ark") {
                        window.location.href = "/services/game-hosting/ark-survival-evolved";
                      } else if (game.slug === "ark-survival-ascended") {
                        window.location.href = "/services/game-hosting/ark-survival-ascended";
                      } else if (game.slug === "fivem") {
                        window.location.href = "/services/game-hosting/fivem";
                      } else {
                        setSelectedGame(game);
                      }'''
if old_routes in s:
    s = s.replace(old_routes, new_routes, 1)
else:
    raise SystemExit('Game routing block not found')

# Block unavailable / coming-soon games and render a large red status badge.
old_class = 'className={`catalog-card reveal delay-${i % 3}`}\n                    onClick={() => {'
new_class = 'className={`catalog-card reveal delay-${i % 3} ${game.comingSoon || game.unavailable ? \'unavailable-card\' : \'\'}`}\n                    aria-disabled={game.comingSoon || game.unavailable ? \'true\' : undefined}\n                    onClick={() => {'
if old_class in s:
    s = s.replace(old_class, new_class, 1)
else:
    raise SystemExit('Game card class block not found')

old_guard = '                    onClick={() => {\n                      if (game.slug === "palworld") {'
new_guard = '                    onClick={() => {\n                      if (game.comingSoon || game.unavailable) return;\n                      if (game.slug === "palworld") {'
if old_guard in s:
    s = s.replace(old_guard, new_guard, 1)

needle = '''                    <div className="catalog-number mono">\n                      {String(i + 1).padStart(2, "0")}\n                    </div>\n\n                    <h2>{game.title}</h2>'''
replacement = '''                    <div className="catalog-number mono">\n                      {String(i + 1).padStart(2, "0")}\n                    </div>\n\n                    {(game.comingSoon || game.unavailable) && (\n                      <span className="unavailable-badge" style={{fontSize: '14px', padding: '11px 18px', color: '#ff5b5b', border: '1px solid rgba(248,113,113,.72)', background: 'rgba(127,29,29,.32)', boxShadow: '0 0 22px rgba(239,68,68,.18)'}}>\n                        {game.comingSoon ? 'COMING SOON' : 'NOT AVAILABLE'}\n                      </span>\n                    )}\n\n                    <h2>{game.title}</h2>'''
if needle in s:
    s = s.replace(needle, replacement, 1)
else:
    raise SystemExit('Game card content block not found')

# Protect the alternate Link-based catalog as well.
old_link = '''                  className="catalog-card reveal"\n                  key={game.slug}'''
new_link = '''                  className={`catalog-card reveal ${game.comingSoon || game.unavailable ? 'unavailable-card' : ''}`}\n                  key={game.slug}'''
if old_link in s:
    s = s.replace(old_link, new_link, 1)

old_link_key = '''                  data-testid={`card-game-${game.slug}`}'''
new_link_key = '''                  aria-disabled={game.comingSoon || game.unavailable ? 'true' : undefined}\n                  onClick={(e) => { if (game.comingSoon || game.unavailable) e.preventDefault(); }}\n                  data-testid={`card-game-${game.slug}`}'''
if old_link_key in s:
    s = s.replace(old_link_key, new_link_key, 1)

APP.write_text(s, encoding='utf-8')
print('ArveX game states and dedicated routes repaired')
