# Supercycle

**Live Dashboard:** [https://newanforbi.github.io/supercycle/](https://newanforbi.github.io/supercycle/)

---

## Overview

Supercycle is a **historical proof-of-concept dashboard** validating the rotating capital rotation thesis across cryptocurrency infrastructure layers using actual 2023–2026 price data. It demonstrates **$100K → $660.8M (6,608x return)** over 19 months through four distinct phases anchored to Bitcoin's 2028 halving cycle.

Built with a comprehensive **design token system** for maintainability, consistency, and easy theme switching.

### The Thesis

Capital rotates systematically through three infrastructure layers, each maturing at different timescales relative to Bitcoin's 4-year halving cycle:

1. **AI Compute Layer (TAO)** - Decentralized neural network infrastructure
2. **Settlement Layer (XRP)** - Institutional bridges and CBDC integration  
3. **Privacy Layer (ZEC)** - Financial sovereignty & regulatory hedges

## Realized Returns (2023–2026)

| Phase | Asset | Entry | Exit | Multiple | Timeline | Capital |
|-------|-------|-------|------|----------|----------|---------|
| 1 | TAO (Bittensor) | Oct 19, 2023 @ $46.44 | Mar 8, 2024 @ $699.94 | **15.0x** | 4.5 months | $100K → $1.5M |
| 2 | XRP (Ripple) | Oct 2, 2024 @ $0.5241 | Jan 8, 2025 @ $3.14 | **6.0x** | 3 months | $1.5M → $7.2M |
| 3 | ZEC W1 (Zcash) | Apr 9, 2025 @ $31.17 | Nov 12, 2025 @ $674 | **21.6x** | 7 months | $7.2M → $124.4M |
| 4 | ZEC W2 (Zcash) | Mar 7, 2026 @ $197.82 | May 19, 2026 @ $673.46 | **3.4x** | 2.5 months | $124.4M → $660.8M |
| **Total** | — | — | — | **6,608x** | **19 months** | **$100K → $660.8M** |

## Design System

This project uses a **comprehensive design token system** for consistency, maintainability, and scalability.

### CSS Custom Properties (40+ tokens)

#### Colors
```css
--color-bg-base: #0A0B0F;                    /* Main background */
--color-text-primary: #ffffff;               /* Primary text */
--color-tao: #9D4EDD;                        /* Phase 1 accent */
--color-xrp: #23F0C6;                        /* Phase 2 accent */
--color-zec: #F4B728;                        /* Phase 3-4 accent */
```

#### Typography
```css
--font-sans: 'DM Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--font-display: 'Space Grotesk', sans-serif;
--font-serif: 'Source Serif 4', serif;

--font-size-lg: 13px;
--font-size-2xl: 18px;
--font-size-5xl: 28px;

--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Spacing (4px-based scale)
```css
--spacing-md: 8px;
--spacing-lg: 10px;
--spacing-xl: 12px;
--spacing-6xl: 24px;
--spacing-7xl: 30px;
```

#### Other
```css
--radius-lg: 6px;
--radius-2xl: 10px;
--transition-normal: 0.3s ease;
```

### Token Files

- **`src/design-system.css`** - CSS custom properties for styling
- **`src/design-tokens.json`** - Machine-readable tokens for design tools
- **`src/LiquidityCascade.jsx`** - All components use `var(--token-name)` instead of hardcoded values

## Dashboard Features

### 8 Interactive Tabs

1. **Overview** - Phase cards, capital flow visualization, portfolio summary
2. **Macro** - Bitcoin halving history, cycle analysis, pre/post-halving patterns
3. **Phases** - Deep dives into mechanics, entry/exit signals, key insights for each phase
4. **Signals** - Real-time trading signal grid with RSI thresholds and status
5. **Cycles** - Historical comparison (2020, 2024) vs 2028 projections
6. **Execution** - Pre-entry checklist, risk allocation framework, discipline trading
7. **Calculator** - Interactive 4-phase capital flow simulator (50-100% risk splits)
8. **Blackpaper** - 3,000-word narrative thesis with macro cycle analysis

### Live Data Integration

- **CoinGecko API** - Real-time prices for BTC, TAO, XRP, ZEC
- **Binance API** - TAO weekly RSI (14-period, updated every 5 minutes)
- Automatic fallbacks when APIs unavailable
- Dark theme optimized for long-form reading

### Interactive Capital Calculator

Input initial capital ($10K–$1M) and risk allocation (50–100%), see projected portfolio:
- After Phase 1 (TAO): Capital × 15.0
- After Phase 2 (XRP): Deployed capital × 6.0
- After Phase 3 (ZEC W1): Deployed capital × 21.6
- After Phase 4 (ZEC W2): Deployed capital × 3.4

## Tech Stack

- **Frontend:** React 18.3.1
- **Build Tool:** Vite 5.4.10
- **Design:** CSS Custom Properties (design tokens)
- **Styling:** Inline styles with token references
- **Deployment:** GitHub Pages + GitHub Actions
- **APIs:** CoinGecko + Binance for live market data
- **Fonts:** Google Fonts (DM Sans, JetBrains Mono, Space Grotesk, Source Serif 4)

## Project Structure

```
supercycle/
├── .github/workflows/
│   └── deploy.yml                    # GitHub Actions CI/CD
├── src/
│   ├── design-system.css            # CSS tokens (40+ custom properties)
│   ├── design-tokens.json           # Machine-readable tokens
│   ├── LiquidityCascade.jsx         # Main dashboard (token-based)
│   ├── hooks/
│   │   └── useMarketData.js         # CoinGecko + Binance integration
│   └── main.jsx                      # React root
├── index.html                        # Entry point
├── vite.config.js                    # Vite build config
├── package.json                      # Dependencies
└── README.md                         # This file
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Runs at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Output in `dist/` folder (179 KB, 54 KB gzipped)

### Deploy to GitHub Pages
```bash
git push origin claude/supercycle-design-tokens
```
GitHub Actions automatically builds and deploys.

## Customization

### Changing Colors

Edit `src/design-system.css`:
```css
--color-tao: #9D4EDD;      /* Phase 1 */
--color-xrp: #23F0C6;      /* Phase 2 */
--color-zec: #F4B728;      /* Phase 3-4 */
```

All components automatically update via token references.

### Adjusting Spacing

Modify `src/design-system.css` spacing scale:
```css
--spacing-md: 8px;   /* Body padding */
--spacing-lg: 10px;  /* Component gaps */
--spacing-6xl: 24px; /* Card padding */
```

### Adding New Tokens

1. Add to `src/design-system.css`:
   ```css
   --color-new: #NEWCOLOR;
   ```

2. Add to `src/design-tokens.json`:
   ```json
   "new": "#NEWCOLOR"
   ```

3. Use in components:
   ```jsx
   color: 'var(--color-new)'
   ```

### Linking Live Prices

Update `src/hooks/useMarketData.js`:
- Change CoinGecko IDs: `bitcoin`, `bittensor`, `ripple`, `zcash`
- Change Binance symbol: `TAOUSDT`

## Key Insights

### Phase 1: AI Discovers Money (Oct 2023 – Mar 2024)
- Retail FOMO on AGI narrative and compute scarcity
- Leverage amplifies small moves into exponential returns
- TAO 15x proved capital could rotate with momentum

### Phase 2: Institution Arrives (Oct 2024 – Jan 2025)
- Regulatory clarity on stablecoins and CBDCs
- XRP becomes bridge for institutional settlement
- 6x with higher conviction, lower leverage

### Phase 3: Privacy Detonation (Apr 2025 – Nov 2025)
- CBDC rollouts trigger financial surveillance anxiety
- Privacy becomes non-negotiable human right
- ZEC 21.6x captures both institutional hedge + retail flight

### Phase 4: Discipline Trade (Mar 2026 – May 2026)
- Buy proven winners on dips, not new narratives
- ZEC 3.4x proves discipline beats greed
- Foundation for 2028 cycle

## The Halving Clock

Bitcoin's halving is not a trigger—it's a **clock** that divides time into predictable segments. The 19 months following each halving create a window of opportunity:

- **Macro conditions align** (Fed policy, regulatory environment)
- **Retail FOMO peaks** (narrative euphoria)
- **Institutional capital dormant** (positioning for next cycle)

The 2028 halving (April 19, 2028) anchors our projection.

## Risk Management

### Pre-Entry Checklist
- Capital reserves ≥ 3 months operating expenses
- Market signals confirmed (2+ indicators aligned)
- Position size calculated (risk allocation %)
- Stop-loss and exit targets defined
- Emotional readiness for -30% drawdowns
- Tax implications reviewed

### Risk Allocation Framework
Same $100K initial capital, different risk profiles:

| Risk Posture | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Final |
|---|---|---|---|---|---|
| 50% | $50K | $750K | $2.6M | $62.2M | $62.2M |
| 75% | $75K | $1.1M | $3.9M | $93.3M | $93.3M |
| 100% | $100K | $1.5M | $5.2M | $124.4M | $124.4M |

**Execution discipline matters more than market timing.**

## Design Token Benefits

✅ **Centralized** - All design decisions in one place  
✅ **Consistent** - Every component follows same spacing/colors  
✅ **Maintainable** - Change one token, updates everywhere  
✅ **Scalable** - New components automatically follow system  
✅ **Themeable** - Easy to create variants or light mode  
✅ **Documented** - Tokens define the design spec  

## Performance

**Build Size:**
- JavaScript bundle: 179.16 KB (54.15 KB gzipped)
- CSS file: 2.19 KB (0.78 KB gzipped)
- Total: ~191 KB (55 KB gzipped)

**Load Time:** < 2 seconds on 4G

**Refresh:** Live data updates every 5 minutes

## Testing Checklist

- [x] All 4 phases load correctly with token colors
- [x] Calculator computes with 50–100% risk splits
- [x] Live prices update from CoinGecko
- [x] TAO RSI calculates (0–100 range)
- [x] All 8 tabs render without errors
- [x] Dark theme applies consistently
- [x] Galaxy background renders smoothly
- [x] Responsive on mobile/tablet/desktop
- [x] Build succeeds with no errors
- [x] GitHub Pages deployment works

## Troubleshooting

### Build Fails
```bash
npm install  # Reinstall dependencies
npm run build  # Rebuild from scratch
```

### API Data Not Loading
- Check CoinGecko: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,bittensor,ripple,zcash&vs_currencies=usd`
- Check Binance: `https://api.binance.com/api/v3/klines?symbol=TAOUSDT&interval=1w&limit=14`

### Colors Not Applying
- Verify CSS imports in `src/main.jsx`
- Check CSS custom property names in components
- Clear browser cache and hard refresh

## Version History

**v1.0 (May 2026) - Design Tokens Edition**
- Comprehensive design token system
- 40+ CSS custom properties
- Token-based component refactor
- All 8 dashboard tabs
- Live market data integration
- GitHub Pages deployment
- Production-ready build

## License

MIT License - See LICENSE file for details

## Contact

Built with Claude Code. For questions, see the [GitHub repository](https://github.com/newanforbi/supercycle).

---

**Supercycle v1.0** • Historical proof-of-concept dashboard • Design Token System • May 2026
