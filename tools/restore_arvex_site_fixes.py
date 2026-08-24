from pathlib import Path
import re

APP = Path('artifacts/arvex-hosting/src/App.tsx')
s = APP.read_text(encoding='utf-8')

# Restore the unavailable state for Bedrock without touching the existing game plans.
s = s.replace("slug: 'minecraft-bedrock',\n    title:", "slug: 'minecraft-bedrock',\n    unavailable: true,\n    title:", 1)

# Add a production-safe VPS page that uses the existing ArveX design system/classes.
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

  const included = [
    'Full Root / Administrator Access', 'NVMe SSD Storage', 'Dedicated IPv4 Address',
    'DDoS Protection', 'Multiple Linux OS Options', 'OS Reinstallation',
    'Instant Deployment', 'Virtualization Isolation', 'Full VPS Control',
    '24/7 Server Monitoring', 'Network Protection', 'Easy Upgrades', 'Discord Support'
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
              <PlanCard
                key={plan.name}
                plan={plan}
                featured={index === 3}
                onSelect={() => { window.location.href = `/support?service=vps&plan=${encodeURIComponent(plan.name)}`; }}
              />
            ))}
          </div>
        </section>

        <section className="container product-bottom">
          <div>
            <ShieldCheck size={20}/>
            <b>Included with every VPS</b>
            <p>{included.join(' • ')}</p>
          </div>
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

# Use the dedicated VPS page instead of the generic three-plan product page.
s = s.replace('<Route path="/services/vps"><ProductPage kind="vps"/></Route>', '<Route path="/services/vps"><VpsPlansPage/></Route>', 1)

# Restore the visual/interaction behavior for Coming Soon and Not Available cards in the React app.
old = '''                    className={`catalog-card reveal delay-${i % 3}`}\n                    onClick={() => {\n                      if (game.slug === "palworld") {'''
new = '''                    className={`catalog-card reveal delay-${i % 3} ${game.comingSoon || game.unavailable ? 'unavailable-card' : ''}`}\n                    onClick={() => {\n                      if (game.comingSoon || game.unavailable) return;\n                      if (game.slug === "palworld") {'''
if old in s:
    s = s.replace(old, new, 1)
else:
    raise SystemExit('GameServerPage card block not found')

needle = '''                    <div className="catalog-number mono">\n                      {String(i + 1).padStart(2, "0")}\n                    </div>\n\n                    <h2>{game.title}</h2>'''
replacement = '''                    <div className="catalog-number mono">\n                      {String(i + 1).padStart(2, "0")}\n                    </div>\n\n                    {(game.comingSoon || game.unavailable) && (\n                      <span className="unavailable-badge">{game.comingSoon ? 'COMING SOON' : 'NOT AVAILABLE'}</span>\n                    )}\n\n                    <h2>{game.title}</h2>'''
if needle in s:
    s = s.replace(needle, replacement, 1)
else:
    raise SystemExit('GameServerPage card content block not found')

# Also protect the alternate catalog component if it is used by a future route.
old2 = '''                  className="catalog-card reveal"\n                  key={game.slug}\n                  data-testid={`card-game-${game.slug}`}'''
new2 = '''                  className={`catalog-card reveal ${game.comingSoon || game.unavailable ? 'unavailable-card' : ''}`}\n                  key={game.slug}\n                  aria-disabled={game.comingSoon || game.unavailable ? 'true' : undefined}\n                  onClick={(e) => { if (game.comingSoon || game.unavailable) e.preventDefault(); }}\n                  data-testid={`card-game-${game.slug}`}'''
if old2 in s:
    s = s.replace(old2, new2, 1)

needle2 = '''                  <div className="catalog-number mono">\n                    {String(index + 1).padStart(2, '0')}\n                  </div>\n\n                  {game.comingSoon && ('''
replacement2 = '''                  <div className="catalog-number mono">\n                    {String(index + 1).padStart(2, '0')}\n                  </div>\n\n                  {(game.comingSoon || game.unavailable) && (\n                    <span className="unavailable-badge">{game.comingSoon ? 'COMING SOON' : 'NOT AVAILABLE'}</span>\n                  )}\n\n                  {game.comingSoon && ('''
if needle2 in s:
    s = s.replace(needle2, replacement2, 1)

APP.write_text(s, encoding='utf-8')
print('ArveX fixes restored: VPS page + Coming Soon/Not Available behavior')
