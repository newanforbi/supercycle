import React, { useState, useEffect } from 'react';
import { useMarketData } from './hooks/useMarketData';

const PHASES = [
  {
    id: 1,
    asset: 'TAO',
    name: 'Bittensor',
    role: 'AI Compute Vanguard',
    color: 'var(--color-tao)',
    colorDim: 'var(--color-tao-dim)',
    entryDate: 'Oct 19, 2023',
    exitDate: 'Mar 8, 2024',
    entryPrice: '$46.44',
    exitPrice: '$699.94',
    multiple: '15.0x',
    capitalIn: 100000,
    capitalOut: 1500000,
    halvingDistance: 'N/A',
    monthsFromHalving: -16,
    entryMonths: '-16 to -1',
    description: 'AI compute layer gaining recognition as foundational infrastructure for AGI.',
    mechanics: [
      'Retail FOMO on AGI narrative and compute scarcity',
      'Institutional validation of distributed AI training models',
      'Supply constraints from network growth requirements',
      'Leverage and perpetual futures amplification',
    ],
    exitSignal: 'When regulatory scrutiny increases or market-wide correction begins',
    entrySignal: 'Positive FOMC signals, falling BTC dominance, RSI oversold recovery',
    keyInsight: 'TAO gained 15x by riding AI euphoria before institutional rotation to settlement layer.',
  },
  {
    id: 2,
    asset: 'XRP',
    name: 'Ripple',
    role: 'Institutional Settlement',
    color: 'var(--color-xrp)',
    colorDim: 'var(--color-xrp-dim)',
    entryDate: 'Oct 2, 2024',
    exitDate: 'Jan 8, 2025',
    entryPrice: '$0.5241',
    exitPrice: '$3.14',
    multiple: '6.0x',
    capitalIn: 1200000,
    capitalOut: 7200000,
    halvingDistance: 'N/A',
    monthsFromHalving: -4,
    entryMonths: '-4 to -1',
    description: 'Institutional settlement layer powered by regulatory clarity and CBDC integration.',
    mechanics: [
      'Regulatory green lights from SEC and global banking regulators',
      'CBDC integration accelerates ODL (On-Demand Liquidity) adoption',
      'Institutional capital rotation from compute to settlement infrastructure',
      'ETF and mainstream adoption narratives build',
    ],
    exitSignal: 'When privacy concerns dominate headlines or geopolitical tensions rise',
    entrySignal: 'Post-TAO exit, XRP at support levels, regulatory tailwinds',
    keyInsight: 'XRP 6x returned as institutions recognized settlement layer as critical infrastructure.',
  },
  {
    id: 3,
    asset: 'ZEC (W1)',
    name: 'Zcash Wave 1',
    role: 'Privacy Detonation',
    color: 'var(--color-zec)',
    colorDim: 'var(--color-accent-zec-dim)',
    entryDate: 'Apr 9, 2025',
    exitDate: 'Nov 12, 2025',
    entryPrice: '$31.17',
    exitPrice: '$674',
    multiple: '21.6x',
    capitalIn: 5760000,
    capitalOut: 124416000,
    halvingDistance: '2.5 years',
    monthsFromHalving: -7,
    entryMonths: '-7 to 0',
    description: 'Privacy becomes critical as CBDC rollout triggers regulatory crackdowns and personal finance anxiety.',
    mechanics: [
      'CBDC anxiety drives demand for privacy-native infrastructure',
      'Regulatory pressure on transaction surveillance globally',
      'Institutional hedge against future digital financial control',
      'Supply dynamics shift as privacy gains systemic importance',
    ],
    exitSignal: 'When institutional adoption plateaus or regulatory compromise emerges',
    entrySignal: 'Post-XRP exit, global privacy concerns peak, geopolitical tensions high',
    keyInsight: 'ZEC W1 achieved 21.6x as privacy became non-negotiable in CBDC-dominated world.',
  },
  {
    id: 4,
    asset: 'ZEC (W2)',
    name: 'Zcash Wave 2',
    role: 'Discipline Trade',
    color: 'var(--color-zec)',
    colorDim: 'var(--color-accent-zec-dim)',
    entryDate: 'Mar 7, 2026',
    exitDate: 'May 19, 2026',
    entryPrice: '$197.82',
    exitPrice: '$673.46',
    multiple: '3.4x',
    capitalIn: 79737600,
    capitalOut: 271107840,
    halvingDistance: '2 years',
    monthsFromHalving: -2,
    entryMonths: '0 to +2.5',
    description: 'Swing trade discipline: buying dips in proven winners rather than chasing new narratives.',
    mechanics: [
      'Reduced capital but proven execution—redeployment to high-conviction asset',
      'Market volatility increases near halving, creating dip-buying opportunities',
      'Disciplined position sizing avoids emotional over-leverage',
      'Psychological acceptance of smaller multiples from mature assets',
    ],
    exitSignal: 'When halving event approaches and market euphoria peaks',
    entrySignal: 'Post-ZEC W1 correction, buying dips near support levels, risk management',
    keyInsight: 'ZEC W2 proved discipline beats chasing: 3.4x on proven asset outperforms gambling.',
  },
];

const PREDICTIONS_2028 = [
  { phase: 1, asset: 'TAO', action: 'Entry', timing: 'Sep 2026 – Aug 2027', note: 'AI narrative reignites pre-halving' },
  { phase: 1, asset: 'TAO', action: 'Exit → XRP Entry', timing: 'Mar 2028', note: 'Rotation to settlement layer' },
  { phase: 2, asset: 'XRP', action: 'Exit → ZEC Entry', timing: 'Jun 2028', note: 'Privacy dominates post-halving' },
  { phase: 3, asset: 'ZEC (W1)', action: 'Exit to Fiat', timing: 'Jan 2029', note: 'Taking profits into strength' },
  { phase: 4, asset: 'ZEC (W2)', action: 'Re-entry on Dip', timing: 'Mar 2029', note: 'Discipline trade on retracement' },
  { phase: 4, asset: 'ZEC (W2)', action: 'Exit to Fiat', timing: 'May 2029', note: 'Final exit ahead of bear market' },
];

const SIGNAL_GRID = [
  {
    phase: 1,
    asset: 'TAO',
    color: 'var(--color-tao)',
    entryWindow: 'Sep 2026 – Aug 2027',
    historicalPrecedent: 'Oct 2023 entry during AI enthusiasm, pre-ETF approval narratives',
    signals: [
      { id: 'S1-1', threshold: 'BTC Dominance ≤ 45%', action: 'Accumulate TAO', status: 'ARMED' },
      { id: 'S1-2', threshold: 'TAO RSI ≤ 30 (oversold)', action: 'Add to position', status: 'ARMED' },
      { id: 'S1-3', threshold: 'Fed funds rate cut cycle begins', action: 'Increase allocation', status: 'ARMED' },
      { id: 'S1-4', threshold: 'TAO breaks $50 resistance', action: 'Position confirmation', status: 'ARMED' },
    ],
  },
  {
    phase: 2,
    asset: 'XRP',
    color: 'var(--color-xrp)',
    entryWindow: 'Mar 2028 – Jun 2028',
    historicalPrecedent: 'Oct 2024 entry on regulatory clarity, pre-CBDC adoption wave',
    signals: [
      { id: 'S2-1', threshold: 'TAO exits, XRP ≤ $1', action: 'Deploy capital', status: 'PENDING' },
      { id: 'S2-2', threshold: 'Fed pivot to rate cuts', action: 'Scale position', status: 'PENDING' },
      { id: 'S2-3', threshold: 'CBDC integration announcements', action: 'Hold & accumulate', status: 'PENDING' },
      { id: 'S2-4', threshold: 'XRP breaks $2 resistance', action: 'Confirm rotation', status: 'PENDING' },
    ],
  },
  {
    phase: 3,
    asset: 'ZEC',
    color: 'var(--color-zec)',
    entryWindow: 'Jun 2028 – Jan 2029',
    historicalPrecedent: 'Apr 2025 entry on privacy anxiety, CBDC regulatory escalation',
    signals: [
      { id: 'S3-1', threshold: 'Global CBDC deployments accelerate', action: 'Accumulate ZEC', status: 'PENDING' },
      { id: 'S3-2', threshold: 'Privacy coin bans threatened', action: 'Increase allocation', status: 'PENDING' },
      { id: 'S3-3', threshold: 'ZEC RSI > 50 (momentum)', action: 'Hold position', status: 'PENDING' },
      { id: 'S3-4', threshold: 'Geopolitical tensions rise', action: 'Add hedge layer', status: 'PENDING' },
    ],
  },
  {
    phase: 4,
    asset: 'ZEC (W2)',
    color: 'var(--color-zec)',
    entryWindow: 'Jan 2029 – May 2029',
    historicalPrecedent: 'Mar 2026 redeployment, buying dips in proven winners',
    signals: [
      { id: 'S4-1', threshold: 'ZEC retraces to $400–500', action: 'Re-entry discipline trade', status: 'PENDING' },
      { id: 'S4-2', threshold: 'Halving event 2 months away', action: 'Begin exit preparation', status: 'PENDING' },
      { id: 'S4-3', threshold: 'Market euphoria peaks (Greed index)', action: 'Exit 50% position', status: 'PENDING' },
      { id: 'S4-4', threshold: 'Extended rally above $600', action: 'Exit remaining position', status: 'PENDING' },
    ],
  },
];

function GalaxyBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'var(--color-bg-base)',
      zIndex: -1,
      overflow: 'hidden',
    }}>
      <canvas
        width={typeof window !== 'undefined' ? window.innerWidth : 800}
        height={typeof window !== 'undefined' ? window.innerHeight : 600}
        style={{ display: 'block' }}
        ref={canvas => {
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#0A0B0F';
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              for (let i = 0; i < 300; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 1.5;
                const opacity = Math.random() * 0.7 + 0.3;

                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
              }

              ctx.fillStyle = 'rgba(157, 78, 221, 0.08)';
              ctx.beginPath();
              ctx.ellipse(canvas.width * 0.3, canvas.height * 0.3, 400, 300, 0, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = 'rgba(35, 240, 198, 0.06)';
              ctx.beginPath();
              ctx.ellipse(canvas.width * 0.8, canvas.height * 0.7, 350, 250, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }}
      />
    </div>
  );
}

function PhaseCard({ phase, marketData }) {
  const currentPrice = phase.id === 1 ? marketData.taoPrice : phase.id === 2 ? marketData.xrpPrice : marketData.zecPrice;

  return (
    <div style={{
      background: phase.colorDim,
      border: `1px solid ${phase.color}`,
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--spacing-4xl)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      transition: 'all var(--transition-normal)',
    }}>
      <div style={{
        fontSize: 'var(--font-size-md)',
        fontWeight: 'var(--font-weight-semibold)',
        color: phase.color,
        marginBottom: 'var(--spacing-md)',
      }}>
        {phase.asset}
      </div>
      <div style={{
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text-tertiary)',
        marginBottom: 'var(--spacing-md)',
      }}>
        {phase.name}
      </div>
      <div style={{
        fontSize: 'var(--font-size-lg)',
        marginBottom: 'var(--spacing-md)',
      }}>
        Entry: {phase.entryPrice} → Exit: {phase.exitPrice}
      </div>
      <div style={{
        fontSize: 'var(--font-size-3xl)',
        fontWeight: 'var(--font-weight-bold)',
        color: phase.color,
      }}>
        {phase.multiple}
      </div>
      {currentPrice > 0 && (
        <div style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-faint)',
          marginTop: 'var(--spacing-md)',
        }}>
          Current: ${currentPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}

function OverviewTab({ marketData }) {
  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h1 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-display)',
      }}>
        Supercycle: 6,608x Return (19 Months)
      </h1>

      <div style={{ marginBottom: 'var(--spacing-7xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-4xl)',
          color: 'var(--color-text-secondary)',
        }}>
          Phase Overview
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-lg)',
        }}>
          {PHASES.map(phase => (
            <PhaseCard key={phase.id} phase={phase} marketData={marketData} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 'var(--spacing-7xl)' }}>
        <h2 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-4xl)',
          color: 'var(--color-text-secondary)',
        }}>
          Capital Flow Summary
        </h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--font-size-base)',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-bg-border)' }}>
              <th style={{
                textAlign: 'left',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Phase</th>
              <th style={{
                textAlign: 'left',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Asset</th>
              <th style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Entry Capital</th>
              <th style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Exit Capital</th>
              <th style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Multiple</th>
            </tr>
          </thead>
          <tbody>
            {PHASES.map(phase => (
              <tr key={phase.id} style={{ borderBottom: '1px solid var(--color-bg-border-subtle)' }}>
                <td style={{ padding: 'var(--spacing-xl)', color: phase.color }}>Phase {phase.id}</td>
                <td style={{ padding: 'var(--spacing-xl)', color: 'var(--color-text-primary)' }}>{phase.asset}</td>
                <td style={{
                  textAlign: 'right',
                  padding: 'var(--spacing-xl)',
                  color: 'var(--color-text-secondary)',
                }}>
                  ${(phase.capitalIn / 1000000).toFixed(2)}M
                </td>
                <td style={{
                  textAlign: 'right',
                  padding: 'var(--spacing-xl)',
                  color: 'var(--color-text-secondary)',
                }}>
                  ${(phase.capitalOut / 1000000).toFixed(2)}M
                </td>
                <td style={{
                  textAlign: 'right',
                  padding: 'var(--spacing-xl)',
                  color: phase.color,
                  fontWeight: 'var(--font-weight-semibold)',
                }}>
                  {phase.multiple}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: 'var(--color-tao-dim)',
        border: '1px solid var(--color-tao)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-4xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-loose)',
      }}>
        <strong>Total Cycle Return:</strong> $100,000 → $660,800,000 (6,608x) over 19 months (Oct 2023 – May 2026)
      </div>
    </div>
  );
}

function MacroTab() {
  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
      }}>
        Macro Context
      </h2>

      <div style={{ marginBottom: 'var(--spacing-7xl)' }}>
        <h3 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-4xl)',
          color: 'var(--color-text-secondary)',
        }}>
          Bitcoin Halving History
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--font-size-base)',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-bg-border)' }}>
              <th style={{
                textAlign: 'left',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Halving Date</th>
              <th style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Pre-Halving Peak</th>
              <th style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Post-Halving Trough</th>
              <th style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>Cycle Duration</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Jan 3, 2009 (Genesis)', '$0.01', '$0.01', '—'],
              ['Nov 28, 2012', '$1,147', '$404', '17 months'],
              ['Jul 9, 2016', '$19,000', '$3,750', '18 months'],
              ['May 11, 2020', '$69,000', '$29,000', '19 months'],
              ['Apr 19, 2024', 'Projected: $150,000', 'Projected: $75,000', '19 months expected'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-bg-border-subtle)' }}>
                <td style={{ padding: 'var(--spacing-xl)' }}>{row[0]}</td>
                <td style={{ textAlign: 'right', padding: 'var(--spacing-xl)' }}>{row[1]}</td>
                <td style={{ textAlign: 'right', padding: 'var(--spacing-xl)' }}>{row[2]}</td>
                <td style={{ textAlign: 'right', padding: 'var(--spacing-xl)' }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: 'var(--color-xrp-dim)',
        border: '1px solid var(--color-xrp)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-4xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-loose)',
      }}>
        <strong>Key Pattern:</strong> Bitcoin halvings create 18–19 month cycles with 3 distinct phases: pre-halving euphoria, post-halving correction, and recovery. Altcoin layers (AI compute, settlement, privacy) rotate systematically through these phases.
      </div>
    </div>
  );
}

function PhasesTab() {
  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
      }}>
        Phase Deep Dives
      </h2>

      {PHASES.map(phase => (
        <div key={phase.id} style={{
          background: phase.colorDim,
          border: `1px solid ${phase.color}`,
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--spacing-6xl)',
          marginBottom: 'var(--spacing-6xl)',
          color: 'var(--color-text-primary)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--spacing-4xl)',
          }}>
            <div>
              <h3 style={{
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: phase.color,
                margin: '0 0 var(--spacing-sm) 0',
              }}>
                Phase {phase.id}: {phase.asset}
              </h3>
              <div style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-tertiary)',
              }}>
                {phase.name} — {phase.role}
              </div>
            </div>
            <div style={{
              fontSize: 'var(--font-size-5xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: phase.color,
            }}>
              {phase.multiple}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-4xl)',
            marginBottom: 'var(--spacing-4xl)',
            fontSize: 'var(--font-size-md)',
          }}>
            <div>
              <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-md)' }}>Entry</div>
              <div style={{
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-semibold)',
              }}>
                {phase.entryDate} @ {phase.entryPrice}
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-md)' }}>Exit</div>
              <div style={{
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-weight-semibold)',
              }}>
                {phase.exitDate} @ {phase.exitPrice}
              </div>
            </div>
          </div>

          <div style={{
            marginBottom: 'var(--spacing-4xl)',
            lineHeight: 'var(--line-height-loose)',
            fontSize: 'var(--font-size-lg)',
          }}>
            <div style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
              {phase.description}
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-4xl)' }}>
            <div style={{
              fontSize: 'var(--font-size-md)',
              color: 'var(--color-text-tertiary)',
              marginBottom: 'var(--spacing-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}>
              MECHANICS
            </div>
            <ul style={{
              margin: 0,
              paddingLeft: 'var(--spacing-4xl)',
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-loose)',
            }}>
              {phase.mechanics.map((mech, i) => (
                <li key={i} style={{ marginBottom: 'var(--spacing-md)' }}>
                  {mech}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${phase.color}20`,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-2xl)',
            fontSize: 'var(--font-size-md)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-md)' }}>Entry Signal</div>
            <div style={{ color: 'var(--color-text-secondary)' }}>{phase.entrySignal}</div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${phase.color}20`,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-2xl)',
            fontSize: 'var(--font-size-md)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-md)' }}>Exit Signal</div>
            <div style={{ color: 'var(--color-text-secondary)' }}>{phase.exitSignal}</div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-2xl)',
            fontSize: 'var(--font-size-md)',
            borderLeft: `3px solid ${phase.color}`,
          }}>
            <div style={{ color: phase.color, fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)' }}>
              Key Insight
            </div>
            <div style={{ color: 'var(--color-text-secondary)' }}>{phase.keyInsight}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SignalsTab({ marketData }) {
  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
      }}>
        Trading Signals
      </h2>

      {SIGNAL_GRID.map(grid => (
        <div key={grid.phase} style={{
          background: grid.color === 'var(--color-tao)' ? 'var(--color-tao-dim)' : grid.color === 'var(--color-xrp)' ? 'var(--color-xrp-dim)' : 'var(--color-accent-zec-dim)',
          border: `1px solid ${grid.color}`,
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--spacing-5xl)',
          marginBottom: 'var(--spacing-6xl)',
          color: 'var(--color-text-primary)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-xl)',
          }}>
            <h3 style={{
              fontSize: 'var(--font-size-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: grid.color,
              margin: 0,
            }}>
              Phase {grid.phase}: {grid.asset}
            </h3>
            <div style={{
              fontSize: 'var(--font-size-md)',
              color: 'var(--color-text-tertiary)',
            }}>
              Entry Window: {grid.entryWindow}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-2xl)',
            marginBottom: 'var(--spacing-4xl)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-loose)',
          }}>
            <strong>Historical Precedent:</strong> {grid.historicalPrecedent}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-xl)',
          }}>
            {grid.signals.map(signal => (
              <div key={signal.id} style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${grid.color}40`,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-2xl)',
                fontSize: 'var(--font-size-base)',
              }}>
                <div style={{
                  color: 'var(--color-text-tertiary)',
                  marginBottom: 'var(--spacing-md)',
                }}>
                  {signal.id}
                </div>
                <div style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: 'var(--spacing-md)',
                  fontSize: 'var(--font-size-md)',
                }}>
                  {signal.threshold}
                </div>
                <div style={{
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--spacing-md)',
                }}>
                  Action: {signal.action}
                </div>
                <div style={{
                  display: 'inline-block',
                  background: signal.status === 'ARMED' ? 'rgba(157,78,221,0.3)' : 'rgba(255,255,255,0.1)',
                  color: signal.status === 'ARMED' ? 'var(--color-tao)' : 'var(--color-text-tertiary)',
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}>
                  {signal.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: 'var(--color-accent-zec-dim)',
        border: '1px solid var(--color-zec)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-4xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-loose)',
      }}>
        <strong>Signal Status Key:</strong> ARMED = Signal ready for current phase | PENDING = Future phase, not yet active
      </div>
    </div>
  );
}

function CyclesTab() {
  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
      }}>
        Historical Cycles & Projections
      </h2>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--font-size-base)',
        marginBottom: 'var(--spacing-7xl)',
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-bg-border)' }}>
            <th style={{
              textAlign: 'left',
              padding: 'var(--spacing-xl)',
              color: 'var(--color-text-muted)',
            }}>Cycle</th>
            <th style={{
              textAlign: 'left',
              padding: 'var(--spacing-xl)',
              color: 'var(--color-text-muted)',
            }}>Period</th>
            <th style={{
              textAlign: 'right',
              padding: 'var(--spacing-xl)',
              color: 'var(--color-text-muted)',
            }}>Phases</th>
            <th style={{
              textAlign: 'right',
              padding: 'var(--spacing-xl)',
              color: 'var(--color-text-muted)',
            }}>Total Return</th>
            <th style={{
              textAlign: 'right',
              padding: 'var(--spacing-xl)',
              color: 'var(--color-text-muted)',
            }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['2020 Cycle', 'May 2020 – Aug 2021', 'L1 + L2 Rotation', '45–65x', 'Complete', 'var(--color-tao)'],
            ['2024 Cycle', 'Apr 2024 – Aug 2025', 'L1 + L2 Rotation', '32–48x', 'In Progress', 'var(--color-xrp)'],
            ['2028 Cycle (Projected)', 'Apr 2028 – Aug 2029', 'L1 + L2 + L3 Rotation', '100–150x', 'Pending', 'var(--color-zec)'],
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-bg-border-subtle)' }}>
              <td style={{ padding: 'var(--spacing-xl)', color: row[5] }}>{row[0]}</td>
              <td style={{ padding: 'var(--spacing-xl)', color: 'var(--color-text-secondary)' }}>{row[1]}</td>
              <td style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                {row[2]}
              </td>
              <td style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                {row[3]}
              </td>
              <td style={{
                textAlign: 'right',
                padding: 'var(--spacing-xl)',
                color: 'var(--color-text-muted)',
              }}>
                {row[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{
        background: 'var(--color-tao-dim)',
        border: '1px solid var(--color-tao)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-4xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-loose)',
      }}>
        <strong>Projection Notes:</strong> 2028 cycle projections are based on extrapolation of 2020 and 2024 patterns. Privacy layer integration (ZEC) is the new variable. If CBDC rollout accelerates, 2028 cycle could exceed 150x.
      </div>
    </div>
  );
}

function ExecutionTab() {
  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
      }}>
        Execution Framework
      </h2>

      <div style={{ marginBottom: 'var(--spacing-7xl)' }}>
        <h3 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-4xl)',
          color: 'var(--color-text-secondary)',
        }}>
          Pre-Entry Checklist
        </h3>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--color-bg-border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--spacing-4xl)',
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--font-size-lg)',
          lineHeight: 'var(--line-height-loose)',
        }}>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xl)', cursor: 'pointer' }}>
            <input type="checkbox" /> Capital reserves 3+ months operating expenses
          </label>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xl)', cursor: 'pointer' }}>
            <input type="checkbox" /> Market signal confirmed (2+ indicators aligned)
          </label>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xl)', cursor: 'pointer' }}>
            <input type="checkbox" /> Position size calculated (risk allocation %)
          </label>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xl)', cursor: 'pointer' }}>
            <input type="checkbox" /> Stop-loss and exit target defined
          </label>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xl)', cursor: 'pointer' }}>
            <input type="checkbox" /> Emotional readiness: Can hold through -30% drawdown
          </label>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-xl)', cursor: 'pointer' }}>
            <input type="checkbox" /> Tax implications reviewed with accountant
          </label>
        </div>
      </div>

      <div style={{
        background: 'var(--color-accent-zec-dim)',
        border: '1px solid var(--color-zec)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-4xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-loose)',
      }}>
        <strong>Execution Discipline:</strong> Position sizing changes the outcome from life-changing to catastrophic. Start conservative, scale only after 2+ successful phases. Emotional control beats market timing 100% of the time.
      </div>
    </div>
  );
}

function CalculatorTab() {
  const [initialCapital, setInitialCapital] = React.useState(100000);
  const [riskAllocation, setRiskAllocation] = React.useState(100);

  const phase1Out = initialCapital * 15.0;
  const phase2In = phase1Out * (riskAllocation / 100);
  const phase2Out = phase2In * 6.0;
  const phase3In = phase2Out * (riskAllocation / 100);
  const phase3Out = phase3In * 21.6;
  const phase4In = phase3Out * (riskAllocation / 100);
  const phase4Out = phase4In * 3.4;
  const reserves = phase3Out - phase4In;
  const finalTotal = phase4Out + reserves;

  return (
    <div style={{ padding: 'var(--spacing-6xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--spacing-6xl)',
        color: 'var(--color-text-primary)',
      }}>
        Capital Flow Calculator
      </h2>

      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--color-bg-border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-6xl)',
        marginBottom: 'var(--spacing-7xl)',
      }}>
        <div style={{ marginBottom: 'var(--spacing-6xl)' }}>
          <label style={{
            display: 'block',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-md)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
          }}>
            Initial Capital
          </label>
          <input
            type="number"
            value={initialCapital}
            onChange={e => setInitialCapital(Math.max(10000, Number(e.target.value)))}
            style={{
              width: '100%',
              padding: 'var(--spacing-xl)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-bg-border)',
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-lg)',
              fontFamily: 'var(--font-mono)',
            }}
          />
          <div style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-faint)',
            marginTop: 'var(--spacing-md)',
          }}>
            Min: $10K | Max: $1M (typical)
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-md)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
          }}>
            Risk Allocation: {riskAllocation}%
          </label>
          <input
            type="range"
            min="50"
            max="100"
            step="5"
            value={riskAllocation}
            onChange={e => setRiskAllocation(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-faint)',
            marginTop: 'var(--spacing-md)',
          }}>
            Higher % = All capital deployed each phase | Lower % = Keep reserves
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-7xl)',
      }}>
        {[
          ['AFTER PHASE 1 (TAO)', phase1Out / 1000000, `${initialCapital.toLocaleString()} @ 15x`, 'var(--color-tao-dim)', 'var(--color-tao)'],
          ['AFTER PHASE 2 (XRP)', phase2Out / 1000000, `${(phase2In / 1000000).toFixed(2)}M @ 6x`, 'var(--color-xrp-dim)', 'var(--color-xrp)'],
          ['AFTER PHASE 3 (ZEC W1)', phase3Out / 1000000, `${(phase3In / 1000000).toFixed(2)}M @ 21.6x`, 'var(--color-accent-zec-dim)', 'var(--color-zec)'],
          ['AFTER PHASE 4 (ZEC W2)', phase4Out / 1000000, `${(phase4In / 1000000).toFixed(2)}M @ 3.4x`, 'var(--color-accent-zec-dim)', 'var(--color-zec)'],
        ].map((item, i) => (
          <div key={i} style={{
            background: item[3],
            border: `1px solid ${item[4]}`,
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--spacing-4xl)',
          }}>
            <div style={{
              color: 'var(--color-text-tertiary)',
              fontSize: 'var(--font-size-md)',
              marginBottom: 'var(--spacing-md)',
            }}>
              {item[0]}
            </div>
            <div style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: item[4],
            }}>
              ${item[1].toFixed(2)}M
            </div>
            <div style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-faint)',
              marginTop: 'var(--spacing-md)',
            }}>
              {item[0].includes('1') ? `Entry: ${item[2]}` : `Deployed: ${item[2]}`}
            </div>
          </div>
        ))}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--color-bg-border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--spacing-4xl)',
        }}>
          <div style={{
            color: 'var(--color-text-tertiary)',
            fontSize: 'var(--font-size-md)',
            marginBottom: 'var(--spacing-md)',
          }}>
            FINAL PORTFOLIO
          </div>
          <div style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
          }}>
            ${(finalTotal / 1000000).toFixed(2)}M
          </div>
          <div style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-faint)',
            marginTop: 'var(--spacing-md)',
          }}>
            Reserves: ${(reserves / 1000000).toFixed(2)}M
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--color-tao-dim)',
        border: '1px solid var(--color-tao)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--spacing-4xl)',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-loose)',
      }}>
        <strong>Calculation Logic:</strong> Each phase deploys {riskAllocation}% of previous phase's exit capital. Remainder held as reserves. Final portfolio = Phase 4 exit + all held reserves. Your specific result depends on actual entry/exit prices and timing precision.
      </div>
    </div>
  );
}

function BlackpaperTab() {
  return (
    <div style={{
      padding: 'var(--spacing-6xl)',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--spacing-7xl)',
        color: 'var(--color-text-primary)',
      }}>
        Blackpaper: The Supercycle Thesis
      </h1>

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-loose)',
        color: 'var(--color-text-secondary)',
      }}>
        <h2 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
          marginTop: 'var(--spacing-7xl)',
          marginBottom: 'var(--spacing-4xl)',
        }}>
          I. Three Layers
        </h2>
        <p>
          Cryptocurrency infrastructure operates across three distinct layers, each maturing at different timescales relative to Bitcoin's halving cycle. The first layer, AI Compute, emerged in 2023 as the vanguard of a new wave—decentralized neural network infrastructure became real. The second layer, Settlement, has always existed but gained institutional velocity in 2024 with regulatory clarity and CBDC integration. The third layer, Privacy, becomes critical precisely when institutional adoption triggers the need for financial sovereignty.
        </p>
        <p>
          Each layer experiences capital rotation in sequence. Capital arrives seeking outsized returns, validates the infrastructure, then rotates to the next emerging layer. This is not speculative; it is structural. The rotation is driven by macro conditions—halvings, Fed policy, regulatory clarity—but the sequence itself is deterministic.
        </p>

        <h2 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
          marginTop: 'var(--spacing-7xl)',
          marginBottom: 'var(--spacing-4xl)',
        }}>
          II. The Clock
        </h2>
        <p>
          Bitcoin's halving is a clock, not a trigger. It divides time into predictable segments. The 19 months following a halving create a window of opportunity—macro conditions align, retail FOMO peaks, and institutional capital is dormant. The supercycle thesis maps three asset rotations onto this 19-month window, exploiting the predictable emotional and structural patterns that emerge every four years.
        </p>
        <p>
          The 2028 halving (April 19, 2028) anchors our current projection. Counting backward and forward in months from this event, we can map when each layer becomes relevant. This is the "fulcrum"—not because halving causes returns, but because halving synchronizes global macro conditions, making capital rotations predictable.
        </p>

        <h2 style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
          marginTop: 'var(--spacing-7xl)',
          marginBottom: 'var(--spacing-4xl)',
        }}>
          III-VII. The Four Phases
        </h2>
        <p>
          The supercycle thesis is not about beating the market. It is about riding structural rotations with discipline, taking profits systematically, and resisting the urge to gamble when conviction has been proven. The capital flows exist. The infrastructure layers are real. The only variable is whether you can execute without panic.
        </p>
      </div>
    </div>
  );
}

export default function LiquidityCascade() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const marketData = useMarketData();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'macro', label: 'Macro' },
    { id: 'phases', label: 'Phases' },
    { id: 'signals', label: 'Signals' },
    { id: 'cycles', label: 'Cycles' },
    { id: 'execution', label: 'Execution' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'blackpaper', label: 'Blackpaper' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-base)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-sans)',
    }}>
      <GalaxyBackground />

      <div style={{
        borderBottom: '1px solid var(--color-bg-border)',
        background: 'rgba(10,11,15,0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'var(--spacing-4xl) var(--spacing-6xl)',
          display: 'flex',
          gap: 'var(--spacing-md)',
          overflowX: 'auto',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: activeTab === tab.id ? '1px solid var(--color-bg-border)' : '1px solid transparent',
                color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                padding: 'var(--spacing-md) var(--spacing-2xl)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                transition: 'all var(--transition-normal)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {activeTab === 'overview' && <OverviewTab marketData={marketData} />}
        {activeTab === 'macro' && <MacroTab />}
        {activeTab === 'phases' && <PhasesTab />}
        {activeTab === 'signals' && <SignalsTab marketData={marketData} />}
        {activeTab === 'cycles' && <CyclesTab />}
        {activeTab === 'execution' && <ExecutionTab />}
        {activeTab === 'calculator' && <CalculatorTab />}
        {activeTab === 'blackpaper' && <BlackpaperTab />}
      </div>

      <div style={{
        borderTop: '1px solid var(--color-bg-border)',
        padding: 'var(--spacing-6xl)',
        textAlign: 'center',
        color: 'var(--color-text-faint)',
        fontSize: 'var(--font-size-md)',
        marginTop: 'var(--spacing-7xl)',
      }}>
        Supercycle v1.0 • Historical proof-of-concept dashboard • May 2026
      </div>
    </div>
  );
}
