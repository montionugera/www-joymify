import { s as ssr_context, b as attr_class, e as escape_html, c as attr_style, d as stringify, a as attr, f as ensure_array_like, i as derived, j as store_get, u as unsubscribe_stores, h as head } from "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { w as writable } from "../../chunks/index.js";
import "clsx";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const activePillar = writable(null);
const personaStore = writable(null);
const navigatorOpen = writable(false);
function JoymifyPulse($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { initialPulse, isBullMode = false } = $$props;
    let pulse = initialPulse;
    let volumeDisplayed = 0;
    let priceFlash = null;
    initialPulse.volume;
    onDestroy(() => {
    });
    function formatCurrency(n) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }).format(n);
    }
    function formatVolume(n) {
      return `$${n}`;
    }
    $$renderer2.push(`<header class="joymify-pulse svelte-r9femk"><div class="pulse-grid-bg svelte-r9femk"></div> <div class="orb orb-blue svelte-r9femk"></div> <div class="orb orb-gold svelte-r9femk"></div> <div class="pulse-content svelte-r9femk"><div class="brand-section svelte-r9femk"><div class="brand-badge svelte-r9femk"><span class="badge-dot svelte-r9femk"></span> <span>LIVE COMMAND CENTER</span></div> <h1 class="brand-title svelte-r9femk"><span class="gradient-text-electric">Joymify</span> <span class="text-gold shimmer-text">Universe</span></h1> <p class="brand-subtitle svelte-r9femk">The ecosystem where every pillar runs on Lyzda.</p></div> <div class="lyzda-ticker glass-gold svelte-r9femk"><div class="ticker-header svelte-r9femk"><span class="ticker-label svelte-r9femk">LZD / USD</span> <span class="ticker-live svelte-r9femk">● LIVE</span></div> <div${attr_class("ticker-price svelte-r9femk", void 0, {
      "flash-up": priceFlash === "up",
      "flash-down": priceFlash === "down"
    })}>${escape_html(formatCurrency(pulse.price))}</div> <div${attr_class("ticker-change svelte-r9femk", void 0, {
      "positive": pulse.priceChange >= 0,
      "negative": pulse.priceChange < 0
    })}>${escape_html(pulse.priceChange >= 0 ? "▲" : "▼")}
				${escape_html(Math.abs(pulse.priceChange).toFixed(4))}
				(${escape_html(pulse.priceChangePct >= 0 ? "+" : "")}${escape_html(pulse.priceChangePct)}%)</div></div> <div class="stats-grid svelte-r9femk"><div class="stat-card glass svelte-r9femk"><div class="stat-label svelte-r9femk">Ecosystem Volume</div> <div class="stat-value text-electric svelte-r9femk">${escape_html(formatVolume(volumeDisplayed))}+</div> <div class="stat-sub svelte-r9femk">Total 24h</div></div> <div class="stat-card glass svelte-r9femk"><div class="stat-label svelte-r9femk">Network Health</div> <div class="stat-value svelte-r9femk" style="color: var(--color-success)">${escape_html(pulse.networkHealth)}%</div> <div class="health-bar svelte-r9femk"><div class="health-fill svelte-r9femk"${attr_style(`width: ${stringify(pulse.networkHealth)}%`)}></div></div></div> <div class="stat-card glass svelte-r9femk"><div class="stat-label svelte-r9femk">Global Node Status</div> <div class="node-status svelte-r9femk"><span class="node-dot svelte-r9femk"></span> <span class="node-text svelte-r9femk">${escape_html(pulse.nodeStatus)}</span></div> <div class="stat-sub svelte-r9femk">All regions nominal</div></div></div></div> `);
    if (isBullMode) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="bull-banner svelte-r9femk">🚀 BULL MODE ACTIVE — All metrics showing success scenario projections</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header>`);
  });
}
function AlgoTrading($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { chartData, isBullMode = false } = $$props;
    const W = 280;
    const H = 100;
    const PAD = 8;
    const points = derived(() => chartData.map((p) => ({
      x: PAD + p.x / 100 * (W - PAD * 2),
      y: H - PAD - p.y / 100 * (H - PAD * 2)
    })));
    const pathD = derived(() => points().length === 0 ? "" : points().map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" "));
    const areaD = derived(() => pathD() ? `${pathD()} L ${(points().at(-1)?.x ?? W).toFixed(1)} ${H} L ${PAD} ${H} Z` : "");
    const lastPoint = derived(() => points().at(-1));
    const firstY = derived(() => points()[0]?.y ?? H / 2);
    const lastY = derived(() => lastPoint()?.y ?? H / 2);
    const isPositive = derived(() => lastY() < firstY());
    const lineColor = derived(() => isBullMode ? "#00ff88" : isPositive() ? "#10b981" : "#0070f3");
    $$renderer2.push(`<div class="algo-trading svelte-72wysi"><div class="algo-header svelte-72wysi"><div class="algo-info svelte-72wysi"><span class="strategy-badge svelte-72wysi">Safe Strategy</span> <span${attr_class(`strategy-status ${stringify(isBullMode ? "bull" : "nominal")}`, "svelte-72wysi")}>${escape_html(isBullMode ? "🚀 Bull Run" : "● Active")}</span></div> <div class="algo-pnl svelte-72wysi"${attr_style(`color: ${stringify(lineColor())}`)}>${escape_html(isPositive() ? "+" : "")}${escape_html(((lastPoint()?.y ?? 50) - 50).toFixed(1))}% vs Base</div></div> <div class="chart-wrapper svelte-72wysi"><svg${attr("viewBox", `0 0 ${stringify(W)} ${stringify(H)}`)} width="100%" preserveAspectRatio="none" class="chart-svg svelte-72wysi"><defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%"${attr("stop-color", lineColor())} stop-opacity="0.3"></stop><stop offset="100%"${attr("stop-color", lineColor())} stop-opacity="0"></stop></linearGradient></defs>`);
    if (areaD()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<path${attr("d", areaD())} fill="url(#lineGrad)"></path>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--><!--[-->`);
    const each_array = ensure_array_like([0.25, 0.5, 0.75]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let t = each_array[$$index];
      $$renderer2.push(`<line${attr("x1", PAD)}${attr("y1", PAD + t * (H - PAD * 2))}${attr("x2", W - PAD)}${attr("y2", PAD + t * (H - PAD * 2))} stroke="rgba(255,255,255,0.06)" stroke-width="1"></line>`);
    }
    $$renderer2.push(`<!--]-->`);
    if (pathD()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<path${attr("d", pathD())} fill="none"${attr("stroke", lineColor())} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chart-line svelte-72wysi" style="stroke-dasharray: 600; animation: draw-line 1.5s ease forwards;"></path>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (lastPoint()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<circle${attr("cx", lastPoint().x)}${attr("cy", lastPoint().y)} r="4"${attr("fill", lineColor())} class="price-dot svelte-72wysi"></circle><circle${attr("cx", lastPoint().x)}${attr("cy", lastPoint().y)} r="8"${attr("fill", lineColor())} opacity="0.2" class="price-ping"></circle>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></svg> <div class="y-labels svelte-72wysi"><span>+${escape_html(isBullMode ? "15" : "8")}%</span> <span>Base</span> <span>-5%</span></div></div> <div class="algo-stats svelte-72wysi"><div class="as-item svelte-72wysi"><span class="as-val svelte-72wysi"${attr_style(`color: ${stringify(lineColor())}`)}>${escape_html(isBullMode ? "78.4" : "72.1")}%</span> <span class="as-label svelte-72wysi">Win Rate</span></div> <div class="as-item svelte-72wysi"><span class="as-val text-electric svelte-72wysi">${escape_html(isBullMode ? "2.1" : "1.84")}</span> <span class="as-label svelte-72wysi">Sharpe</span></div> <div class="as-item svelte-72wysi"><span class="as-val text-gold svelte-72wysi">${escape_html(isBullMode ? "$4,820" : "$1,240")}/d</span> <span class="as-label svelte-72wysi">Avg PnL</span></div></div></div>`);
  });
}
function LyzdaCrypto($$renderer, $$props) {
  let { isBullMode = false } = $$props;
  const price = derived(() => isBullMode ? 1.65 : 1.24);
  const reserve = derived(() => isBullMode ? 18.2 : 12.4);
  const apy = derived(() => isBullMode ? "14.2%" : "8.6%");
  const supply = 42e6;
  const staked = derived(() => isBullMode ? 284e5 : 187e5);
  const stakedPct = derived(() => Math.round(staked() / supply * 100));
  $$renderer.push(`<div class="lyzda-crypto svelte-1h51a3b"><div class="coin-container svelte-1h51a3b"><div class="coin svelte-1h51a3b" aria-label="Lyzda Coin"><div class="coin-face front svelte-1h51a3b"><div class="coin-symbol svelte-1h51a3b">₿</div> <div class="coin-name svelte-1h51a3b">LYD</div></div> <div class="coin-face back svelte-1h51a3b"><div class="coin-symbol svelte-1h51a3b">⊕</div></div> <div class="orbit-ring svelte-1h51a3b"><div class="orbit-particle svelte-1h51a3b"></div></div></div> <div class="coin-price svelte-1h51a3b"><div class="price-value text-gold svelte-1h51a3b">$${escape_html(price().toFixed(4))}</div> <div class="price-label svelte-1h51a3b">LZD / USD</div></div></div> <div class="treasury-section svelte-1h51a3b"><div class="treasury-header svelte-1h51a3b"><span class="t-label svelte-1h51a3b">Centralized Treasury Reserve</span> <span class="t-value text-gold svelte-1h51a3b">$${escape_html(reserve())}M</span></div> <div class="treasury-bar svelte-1h51a3b"><div class="treasury-fill svelte-1h51a3b"${attr_style(`width: ${stringify(Math.min(100, reserve() / 25 * 100))}%`)}></div></div> <div class="treasury-legend svelte-1h51a3b"><span>0</span> <span>Target: $25M</span></div></div> <div class="staking-row svelte-1h51a3b"><div class="staking-item svelte-1h51a3b"><span class="s-val text-gold svelte-1h51a3b">${escape_html(stakedPct())}%</span> <span class="s-label svelte-1h51a3b">Supply Staked</span></div> <div class="staking-item svelte-1h51a3b"><span class="s-val text-electric svelte-1h51a3b">${escape_html(apy())}</span> <span class="s-label svelte-1h51a3b">Staking APY</span></div> <div class="staking-item svelte-1h51a3b"><span class="s-val svelte-1h51a3b" style="color: var(--color-success)">42M</span> <span class="s-label svelte-1h51a3b">Max Supply</span></div></div></div>`);
}
function AIAgentHub($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { agentFeed, isBullMode = false } = $$props;
    const doubled = derived(() => [...agentFeed, ...agentFeed]);
    const statusColors = {
      Done: "#10b981",
      "In Progress": "#0070f3",
      Queued: "#6b7280",
      Failed: "#ef4444"
    };
    const statusDots = { Done: "✓", "In Progress": "◉", Queued: "○", Failed: "✗" };
    $$renderer2.push(`<div class="ai-agent-hub svelte-c7cda4"><div class="hub-header svelte-c7cda4"><span class="hub-title svelte-c7cda4">Live Job Feed</span> <div class="hub-stats svelte-c7cda4"><span class="live-badge svelte-c7cda4">● ${escape_html(agentFeed.filter((a) => a.status === "In Progress").length)} Active</span> <span class="done-badge svelte-c7cda4">✓ ${escape_html(agentFeed.filter((a) => a.status === "Done").length)} Done</span></div></div> <div class="feed-container svelte-c7cda4" aria-label="Agent task feed"><div class="feed-track svelte-c7cda4"><!--[-->`);
    const each_array = ensure_array_like(doubled());
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let task = each_array[i];
      $$renderer2.push(`<div class="feed-item svelte-c7cda4"><span class="agent-id svelte-c7cda4">${escape_html(task.agentId)}</span> <div class="task-info svelte-c7cda4"><span class="task-role svelte-c7cda4">${escape_html(task.role)}</span> <span class="task-name svelte-c7cda4">${escape_html(task.task)}</span></div> <span class="status-badge svelte-c7cda4"${attr_style(`color: ${stringify(statusColors[task.status])}; border-color: ${stringify(statusColors[task.status])}40;`)}>${escape_html(statusDots[task.status])}
						${escape_html(task.status)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="hub-footer svelte-c7cda4"><div class="hf-stat svelte-c7cda4"><span class="hf-val svelte-c7cda4" style="color: #8b5cf6">${escape_html(isBullMode ? "2,847" : "1,209")}</span> <span class="hf-label svelte-c7cda4">Total Agents</span></div> <div class="hf-stat svelte-c7cda4"><span class="hf-val text-electric svelte-c7cda4">${escape_html(isBullMode ? "38.4K" : "12.7K")}</span> <span class="hf-label svelte-c7cda4">Tasks/Day</span></div> <div class="hf-stat svelte-c7cda4"><span class="hf-val text-gold svelte-c7cda4">${escape_html(isBullMode ? "4.93" : "4.76")}</span> <span class="hf-label svelte-c7cda4">Avg Rating</span></div></div></div>`);
  });
}
function BusinessPlatform($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { stats } = $$props;
    function formatMRR(n) {
      if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
      return `$${(n / 1e3).toFixed(0)}K`;
    }
    function formatUsers(n) {
      if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
      return `${n}`;
    }
    $$renderer2.push(`<div class="business-platform svelte-1cpwlpl"><div class="kpi-row svelte-1cpwlpl"><div class="kpi-card kpi-mrr svelte-1cpwlpl"><div class="kpi-label svelte-1cpwlpl">MRR</div> <div class="kpi-value svelte-1cpwlpl" style="color: #10b981">${escape_html(formatMRR(stats.mrr))}</div> <div class="kpi-trend positive svelte-1cpwlpl">↑ ${escape_html(stats.mrrGrowth.toFixed(1))}% mo/mo</div></div> <div class="kpi-card kpi-users svelte-1cpwlpl"><div class="kpi-label svelte-1cpwlpl">Active Users</div> <div class="kpi-value text-electric svelte-1cpwlpl">${escape_html(formatUsers(stats.activeUsers))}</div> <div class="kpi-sub svelte-1cpwlpl">Across all orgs</div></div> <div class="kpi-card kpi-nps svelte-1cpwlpl"><div class="kpi-label svelte-1cpwlpl">NPS Score</div> <div class="kpi-value text-gold svelte-1cpwlpl">${escape_html(stats.nps)}</div> <div class="kpi-sub svelte-1cpwlpl">${escape_html(stats.nps >= 70 ? "World Class" : stats.nps >= 50 ? "Excellent" : "Good")}</div></div></div> <div class="funnel svelte-1cpwlpl"><div class="funnel-label svelte-1cpwlpl">Sales Funnel</div> <div class="funnel-bars svelte-1cpwlpl"><div class="funnel-row svelte-1cpwlpl"><span class="funnel-stage svelte-1cpwlpl">Leads</span> <div class="funnel-bar-wrap svelte-1cpwlpl"><div class="funnel-bar svelte-1cpwlpl" style="width: 100%; background: rgba(16,185,129,0.6);"></div></div> <span class="funnel-count svelte-1cpwlpl">${escape_html((stats.leads / 1e3).toFixed(1))}K</span></div> <div class="funnel-row svelte-1cpwlpl"><span class="funnel-stage svelte-1cpwlpl">Qualified</span> <div class="funnel-bar-wrap svelte-1cpwlpl"><div class="funnel-bar svelte-1cpwlpl" style="width: 65%; background: rgba(16,185,129,0.5);"></div></div> <span class="funnel-count svelte-1cpwlpl">${escape_html((stats.leads * 0.65 / 1e3).toFixed(1))}K</span></div> <div class="funnel-row svelte-1cpwlpl"><span class="funnel-stage svelte-1cpwlpl">Customers</span> <div class="funnel-bar-wrap svelte-1cpwlpl"><div class="funnel-bar svelte-1cpwlpl"${attr_style(`width: ${stringify(stats.conversion * 6)}%; background: rgba(16,185,129,0.8);`)}></div></div> <span class="funnel-count positive svelte-1cpwlpl">${escape_html(stats.conversion.toFixed(1))}%</span></div></div></div> <div class="growth-row svelte-1cpwlpl"><div class="g-item svelte-1cpwlpl"><span class="g-val positive svelte-1cpwlpl">+${escape_html(stats.leadsGrowth.toFixed(0))}%</span> <span class="g-label svelte-1cpwlpl">Lead Growth</span></div> <div class="g-divider svelte-1cpwlpl"></div> <div class="g-item svelte-1cpwlpl"><span class="g-val svelte-1cpwlpl" style="color: #10b981">+${escape_html(stats.mrrGrowth.toFixed(1))}%</span> <span class="g-label svelte-1cpwlpl">Revenue MoM</span></div> <div class="g-divider svelte-1cpwlpl"></div> <div class="g-item svelte-1cpwlpl"><span class="g-val text-gold svelte-1cpwlpl">${escape_html(stats.conversion.toFixed(1))}%</span> <span class="g-label svelte-1cpwlpl">Conversion</span></div></div></div>`);
  });
}
function AppDailyBundle($$renderer, $$props) {
  let { isBullMode = false } = $$props;
  const dau = derived(() => isBullMode ? "94K" : "38K");
  const session = derived(() => isBullMode ? "48m" : "32m");
  const apps = [
    { name: "Joy Music", icon: "🎵", color: "#8b5cf6" },
    { name: "Joy Map", icon: "🗺️", color: "#0070f3" },
    { name: "Joy Finance", icon: "💰", color: "#10b981" },
    { name: "Joy Social", icon: "💬", color: "#f59e0b" },
    { name: "Joy Work", icon: "📋", color: "#ef4444" },
    { name: "Joy AI", icon: "🤖", color: "#6366f1" }
  ];
  $$renderer.push(`<div class="app-daily-bundle svelte-zvxarq"><div class="phone-frame-wrapper svelte-zvxarq"><div class="phone-frame svelte-zvxarq" aria-label="Air Mirroring demo"><div class="phone-status svelte-zvxarq"><span>9:41</span> <div class="phone-indicators svelte-zvxarq"><span>●●●</span> <span>WiFi</span> <span>⚡</span></div></div> <div class="air-mirror-badge svelte-zvxarq"><span class="am-dot svelte-zvxarq"></span> AIR MIRRORING</div> <div class="phone-app-grid svelte-zvxarq"><!--[-->`);
  const each_array = ensure_array_like(apps);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let app = each_array[$$index];
    $$renderer.push(`<div class="phone-app svelte-zvxarq"${attr_style(`--app-color: ${stringify(app.color)}`)}><div class="app-icon svelte-zvxarq">${escape_html(app.icon)}</div> <div class="app-name svelte-zvxarq">${escape_html(app.name.replace("Joy ", ""))}</div></div>`);
  }
  $$renderer.push(`<!--]--></div> <div class="phone-home-bar svelte-zvxarq"></div></div> <div class="mirror-arrow svelte-zvxarq">→</div> <div class="tv-frame svelte-zvxarq"><div class="tv-label svelte-zvxarq">Any Screen</div> <div class="tv-content svelte-zvxarq"><div class="tv-mirrored svelte-zvxarq"><span>🖥️</span> <span class="tv-text svelte-zvxarq">Mirroring Active</span></div></div></div></div> <div class="bundle-stats svelte-zvxarq"><div class="bs-item svelte-zvxarq"><span class="bs-val text-gold svelte-zvxarq">24</span> <span class="bs-label svelte-zvxarq">Apps Bundled</span></div> <div class="bs-item svelte-zvxarq"><span class="bs-val svelte-zvxarq" style="color: #f59e0b">${escape_html(dau())}</span> <span class="bs-label svelte-zvxarq">Daily Users</span></div> <div class="bs-item svelte-zvxarq"><span class="bs-val text-electric svelte-zvxarq">${escape_html(session())}</span> <span class="bs-label svelte-zvxarq">Avg Session</span></div></div></div>`);
}
function GamePlatform($$renderer, $$props) {
  let { isBullMode = false } = $$props;
  const concurrent = derived(() => isBullMode ? "128K" : "47K");
  const lyd = derived(() => isBullMode ? "840K" : "210K");
  const guilds = derived(() => isBullMode ? "3,200" : "890");
  $$renderer.push(`<div class="game-platform svelte-1jmov2t"><div class="game-hero svelte-1jmov2t"><img src="/images/game-platform-hero.png" alt="MMORPG World — Joymify Game Platform" loading="lazy" class="svelte-1jmov2t"/> <div class="game-overlay svelte-1jmov2t"><div class="overlay-top svelte-1jmov2t"><div class="world-badge svelte-1jmov2t"><span class="world-dot svelte-1jmov2t"></span> SERVERS ONLINE</div></div> <div class="overlay-bottom svelte-1jmov2t"><div class="game-title-badge svelte-1jmov2t">Joymify Online</div> <p class="game-tagline svelte-1jmov2t">Epic Worlds. Real Rewards.</p></div></div></div> <div class="earn-banner svelte-1jmov2t"><span class="earn-icon svelte-1jmov2t">🪙</span> <span class="earn-text">Every quest completed earns <strong class="text-gold">Lyzda (LYD)</strong> tokens</span></div> <div class="game-stats svelte-1jmov2t"><div class="gs-item svelte-1jmov2t"><span class="gs-val svelte-1jmov2t" style="color: #ef4444">${escape_html(concurrent())}</span> <span class="gs-label svelte-1jmov2t">Online Now</span></div> <div class="gs-item svelte-1jmov2t"><span class="gs-val text-gold svelte-1jmov2t">${escape_html(lyd())}</span> <span class="gs-label svelte-1jmov2t">LZD Earned</span></div> <div class="gs-item svelte-1jmov2t"><span class="gs-val text-electric svelte-1jmov2t">${escape_html(guilds())}</span> <span class="gs-label svelte-1jmov2t">Active Guilds</span></div></div></div>`);
}
function ContextualSidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { algoChart, agentFeed, crmStats, isBullMode = false } = $$props;
    const pillar = derived(() => store_get($$store_subs ??= {}, "$activePillar", activePillar));
    $$renderer2.push(`<aside class="contextual-sidebar svelte-1qdle79">`);
    if (!pillar()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty-state svelte-1qdle79"><div class="empty-icon svelte-1qdle79">⬡</div> <p class="empty-title svelte-1qdle79">Select a Pillar</p> <p class="empty-sub svelte-1qdle79">Click any card to explore detailed metrics and live data for that business pillar.</p> <div class="hint-list svelte-1qdle79"><!--[-->`);
      const each_array = ensure_array_like([
        "📈 Algo Trading — strategy performance",
        "🪙 Lyzda — treasury reserve",
        "🤖 AI Hub — live agent feed",
        "📊 Business — CRM funnel",
        "📱 App Bundle — mirroring demo",
        "⚔️ Game — MMORPG world"
      ]);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let hint = each_array[$$index];
        $$renderer2.push(`<span class="hint-item svelte-1qdle79">${escape_html(hint)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="pillar-detail svelte-1qdle79"${attr_style(`--pillar-color: ${stringify(pillar().color)}; --pillar-glow: ${stringify(pillar().glowColor)};`)}><div class="detail-header svelte-1qdle79"><div class="detail-top svelte-1qdle79"><div class="detail-icon svelte-1qdle79">`);
      if (pillar().id === "algo-trading") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`📈`);
      } else if (pillar().id === "lyzda-crypto") {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`🪙`);
      } else if (pillar().id === "ai-agent-hub") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`🤖`);
      } else if (pillar().id === "business-platform") {
        $$renderer2.push("<!--[3-->");
        $$renderer2.push(`📊`);
      } else if (pillar().id === "app-daily-bundle") {
        $$renderer2.push("<!--[4-->");
        $$renderer2.push(`📱`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`⚔️`);
      }
      $$renderer2.push(`<!--]--></div> <div><h2 class="detail-name svelte-1qdle79" style="color: var(--pillar-color)">${escape_html(pillar().name)}</h2> <p class="detail-tagline svelte-1qdle79">${escape_html(pillar().tagline)}</p></div></div> <p class="detail-desc svelte-1qdle79">${escape_html(pillar().description)}</p></div> <div class="detail-visual svelte-1qdle79">`);
      if (pillar().id === "algo-trading") {
        $$renderer2.push("<!--[0-->");
        AlgoTrading($$renderer2, { chartData: algoChart, isBullMode });
      } else if (pillar().id === "lyzda-crypto") {
        $$renderer2.push("<!--[1-->");
        LyzdaCrypto($$renderer2, { isBullMode });
      } else if (pillar().id === "ai-agent-hub") {
        $$renderer2.push("<!--[2-->");
        AIAgentHub($$renderer2, { agentFeed, isBullMode });
      } else if (pillar().id === "business-platform") {
        $$renderer2.push("<!--[3-->");
        BusinessPlatform($$renderer2, { stats: crmStats });
      } else if (pillar().id === "app-daily-bundle") {
        $$renderer2.push("<!--[4-->");
        AppDailyBundle($$renderer2, { isBullMode });
      } else if (pillar().id === "game-platform") {
        $$renderer2.push("<!--[5-->");
        GamePlatform($$renderer2, { isBullMode });
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="metric-pills svelte-1qdle79"><!--[-->`);
      const each_array_1 = ensure_array_like(pillar().metrics);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let m = each_array_1[$$index_1];
        $$renderer2.push(`<div class="pill svelte-1qdle79"${attr_style(`border-color: ${stringify(pillar().glowColor)}`)}><span class="pill-label svelte-1qdle79">${escape_html(m.label)}</span> <span class="pill-value svelte-1qdle79" style="color: var(--pillar-color)">${escape_html(m.value)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div> <button class="close-btn svelte-1qdle79" aria-label="Deselect pillar">Deselect</button></div>`);
    }
    $$renderer2.push(`<!--]--></aside>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function NavigatorModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let step = 0;
    const steps = [
      {
        question: "What best describes your primary goal?",
        options: [
          { label: "Grow my wealth", value: "investor", emoji: "💰" },
          { label: "Build products", value: "builder", emoji: "🔨" },
          { label: "Play & earn", value: "gamer", emoji: "🎮" },
          { label: "Trade markets", value: "trader", emoji: "📈" }
        ]
      },
      {
        question: "Which ecosystem excites you most?",
        options: [
          { label: "AI & Automation", value: "builder", emoji: "🤖" },
          { label: "Crypto & DeFi", value: "investor", emoji: "🪙" },
          { label: "Gaming & NFTs", value: "gamer", emoji: "⚔️" },
          { label: "Algorithmic Trading", value: "trader", emoji: "⚡" }
        ]
      },
      {
        question: "What is your investment time horizon?",
        options: [
          {
            label: "Long-term (3+ years)",
            value: "investor",
            emoji: "🏛️"
          },
          {
            label: "Mid-term (6–18 months)",
            value: "builder",
            emoji: "📅"
          },
          { label: "Short-term (weeks)", value: "trader", emoji: "⚡" },
          { label: "I'm just here to play!", value: "gamer", emoji: "🎲" }
        ]
      }
    ];
    const currentStep = derived(() => steps[step]);
    const progress = derived(() => step / steps.length * 100);
    if (store_get($$store_subs ??= {}, "$navigatorOpen", navigatorOpen)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="modal-backdrop svelte-1fe03lw" role="dialog" aria-modal="true" aria-label="Joymify Navigator" tabindex="-1"><div class="modal-panel glass svelte-1fe03lw" role="document"><div class="modal-header svelte-1fe03lw"><div class="modal-brand svelte-1fe03lw"><span class="modal-icon svelte-1fe03lw">🧭</span> <div><h2 class="modal-title gradient-text-electric svelte-1fe03lw">Joymify Navigator</h2> <p class="modal-sub svelte-1fe03lw">Personalize your portal experience</p></div></div> <button class="modal-close svelte-1fe03lw" aria-label="Close navigator">✕</button></div> <div class="progress-bar svelte-1fe03lw"><div class="progress-fill svelte-1fe03lw"${attr_style(`width: ${stringify(progress())}%`)}></div></div> <div class="step-indicator svelte-1fe03lw">Step ${escape_html(step + 1)} of ${escape_html(steps.length)}</div> <div class="question-section svelte-1fe03lw"><p class="question-text svelte-1fe03lw">${escape_html(currentStep().question)}</p> <div class="options-grid svelte-1fe03lw"><!--[-->`);
      const each_array = ensure_array_like(currentStep().options);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let opt = each_array[$$index];
        $$renderer2.push(`<button class="option-btn svelte-1fe03lw"${attr("aria-label", opt.label)}><span class="opt-emoji svelte-1fe03lw">${escape_html(opt.emoji)}</span> <span class="opt-label svelte-1fe03lw">${escape_html(opt.label)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <button class="skip-btn svelte-1fe03lw">Skip — Show default view</button></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function PillarCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { pillar } = $$props;
    let isActive = derived(() => store_get($$store_subs ??= {}, "$activePillar", activePillar)?.id === pillar.id);
    const lucideMap = {
      TrendingUp: "📈",
      Coins: "🪙",
      Bot: "🤖",
      BarChart3: "📊",
      Smartphone: "📱",
      Swords: "⚔️"
    };
    const emoji = lucideMap[pillar.icon] ?? "⬡";
    function trendSymbol(trend) {
      if (trend === 1) return "↑";
      if (trend === -1) return "↓";
      return "—";
    }
    $$renderer2.push(`<article${attr_class("pillar-card svelte-9gobgx", void 0, { "active": isActive() })}${attr_style(`--pillar-color: ${stringify(pillar.color)}; --pillar-glow: ${stringify(pillar.glowColor)};`)} role="button" tabindex="0"${attr("aria-label", `View ${stringify(pillar.name)} pillar`)}${attr("aria-pressed", isActive())}><div class="card-glow svelte-9gobgx" aria-hidden="true"></div> <div class="card-header svelte-9gobgx"><div class="card-icon svelte-9gobgx" aria-hidden="true">${escape_html(emoji)}</div> <div class="card-meta svelte-9gobgx"><h3 class="card-name svelte-9gobgx">${escape_html(pillar.name)}</h3> <p class="card-tagline svelte-9gobgx">${escape_html(pillar.tagline)}</p></div> `);
    if (isActive()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="active-badge svelte-9gobgx">Selected</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="card-metrics svelte-9gobgx"><!--[-->`);
    const each_array = ensure_array_like(pillar.metrics);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let metric = each_array[$$index];
      $$renderer2.push(`<div class="metric svelte-9gobgx"><span class="metric-value svelte-9gobgx" style="color: var(--pillar-color)">${escape_html(metric.value)}</span> <span class="metric-label svelte-9gobgx">${escape_html(metric.label)} ${escape_html(trendSymbol(metric.trend))}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="accent-bar svelte-9gobgx"></div></article>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let pillars = data.pillars;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>
		${escape_html(data.isBullMode ? "🚀 BULL MODE — " : "")}Joymify Universe | Investor Portal
	</title>`);
      });
    });
    NavigatorModal($$renderer2);
    $$renderer2.push(`<!----> <main${attr_class("portal-layout svelte-1uha8ag", void 0, { "bull": data.isBullMode })}>`);
    JoymifyPulse($$renderer2, { initialPulse: data.pulse, isBullMode: data.isBullMode });
    $$renderer2.push(`<!----> <div class="content-grid svelte-1uha8ag"><section class="pillars-section svelte-1uha8ag" aria-label="Joymify Universe Pillars"><div class="section-header svelte-1uha8ag"><div class="section-meta"><h2 class="section-title svelte-1uha8ag">The <span class="gradient-text-gold">6 Pillars</span></h2> <p class="section-sub svelte-1uha8ag">`);
    if (store_get($$store_subs ??= {}, "$personaStore", personaStore)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`Ordered for <strong class="text-electric">${escape_html(store_get($$store_subs ??= {}, "$personaStore", personaStore))}</strong> profile`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Click any pillar to explore its live data`);
    }
    $$renderer2.push(`<!--]--></p></div> <button class="navigator-btn svelte-1uha8ag" aria-label="Start the Joymify Navigator persona quiz" id="navigator-cta"><span class="nb-icon svelte-1uha8ag">🧭</span> <span>Start Journey</span></button></div> <div class="pillar-grid svelte-1uha8ag" role="list" aria-label="6 pillar cards"><!--[-->`);
    const each_array = ensure_array_like(pillars);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let pillar = each_array[i];
      $$renderer2.push(`<div role="listitem">`);
      PillarCard($$renderer2, { pillar });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <aside class="sidebar-section glass svelte-1uha8ag" aria-label="Pillar detail panel"><div class="sidebar-inner svelte-1uha8ag">`);
    ContextualSidebar($$renderer2, {
      algoChart: data.algoChart,
      agentFeed: data.agentFeed,
      crmStats: data.crmStats,
      isBullMode: data.isBullMode
    });
    $$renderer2.push(`<!----></div></aside></div> <footer class="portal-footer svelte-1uha8ag"><div class="footer-inner svelte-1uha8ag"><div class="footer-brand svelte-1uha8ag"><span class="gradient-text-gold">Joymify Universe</span> <span class="footer-sep svelte-1uha8ag">·</span> <span class="footer-version svelte-1uha8ag">Portal v1.0 — BFF Edition</span></div> <div class="footer-links svelte-1uha8ag"><span class="footer-link svelte-1uha8ag">Powered by <span class="text-electric">SvelteKit BFF</span></span> <span class="footer-sep svelte-1uha8ag">·</span> <span class="footer-link svelte-1uha8ag">Currency: <span class="text-gold">LYD</span></span> `);
    if (data.isBullMode) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="footer-sep svelte-1uha8ag">·</span> <span class="bull-tag svelte-1uha8ag">🚀 BULL MODE</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></footer></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
