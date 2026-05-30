import React, { useState, useEffect } from 'react';
import { useMarketData } from './hooks/useMarketData';

const PHASES = [
  {
    id: 1,
    asset: 'TAO',
    name: 'Bittensor',
    role: 'AI Compute Vanguard',
    color: '#9D4EDD',
    colorDim: 'rgba(157,78,221,0.12)',
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
    color: '#23F0C6',
    colorDim: 'rgba(35,240,198,0.12)',
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
    color: '#F4B728',
    colorDim: 'rgba(244,183,40,0.12)',
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
    color: '#F4B728',
    colorDim: 'rgba(244,183,40,0.12)',
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
    color: '#9D4EDD',
    entryWindow: 'Sep 2026 – Aug 2027',
    historicalPrecedent: 'Oct 2023 entry during AI enthusiasm, pre-ETF approval narratives',
    signals: [
      { id: 'S1-1', threshold: 'BTC Dominance < 45%', action: 'Accumulate TAO', status: 'ARMED' },
      { id: 'S1-2', threshold: 'TAO RSI ≤ 30 (oversold)', action: 'Add to position', status: 'ARMED' },
      { id: 'S1-3', threshold: 'Fed funds rate cut cycle begins', action: 'Increase allocation', status: 'ARMED' },
      { id: 'S1-4', threshold: 'TAO breaks $50 resistance', action: 'Position confirmation', status: 'ARMED' },
    ],
  },
  {
    phase: 2,
    asset: 'XRP',
    color: '#23F0C6',
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
    color: '#F4B728',
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
    color: '#F4B728',
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
      background: '#0A0B0F',
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
      borderRadius: '8px',
      padding: '16px',
      color: '#FFFFFF',
      fontFamily: 'DM Sans, sans-serif',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: phase.color, marginBottom: '8px' }}>
        {phase.asset}
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
        {phase.name}
      </div>
      <div style={{ fontSize: '13px', marginBottom: '8px' }}>
        Entry: {phase.entryPrice} → Exit: {phase.exitPrice}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 700, color: phase.color }}>
        {phase.multiple}
      </div>
      {currentPrice > 0 && (
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
          Current: ${currentPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}

function OverviewTab({ marketData }) {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px', color: '#FFFFFF' }}>
        Supercycle: 6,608x Return (19 Months)
      </h1>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Phase Overview
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {PHASES.map(phase => (
            <PhaseCard key={phase.id} phase={phase} marketData={marketData} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Capital Flow Summary
        </h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Phase</th>
              <th style={{ textAlign: 'left', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Asset</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Entry Capital</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Exit Capital</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Multiple</th>
            </tr>
          </thead>
          <tbody>
            {PHASES.map(phase => (
              <tr key={phase.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', color: phase.color }}>Phase {phase.id}</td>
                <td style={{ padding: '12px', color: '#FFFFFF' }}>{phase.asset}</td>
                <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>
                  ${(phase.capitalIn / 1000000).toFixed(2)}M
                </td>
                <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>
                  ${(phase.capitalOut / 1000000).toFixed(2)}M
                </td>
                <td style={{ textAlign: 'right', padding: '12px', color: phase.color, fontWeight: 600 }}>
                  {phase.multiple}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        background: 'rgba(157,78,221,0.1)',
        border: '1px solid rgba(157,78,221,0.3)',
        borderRadius: '8px',
        padding: '16px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '13px',
        lineHeight: '1.6',
      }}>
        <strong>Total Cycle Return:</strong> $100,000 → $660,800,000 (6,608x) over 19 months (Oct 2023 – May 2026)
      </div>
    </div>
  );
}

function MacroTab() {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#FFFFFF' }}>
        Macro Context
      </h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Bitcoin Halving History
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Halving Date</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Pre-Halving Peak</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Post-Halving Trough</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Cycle Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>Jan 3, 2009 (Genesis)</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$0.01</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$0.01</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>—</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>Nov 28, 2012</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$1,147</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$404</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>17 months</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>Jul 9, 2016</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$19,000</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$3,750</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>18 months</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>May 11, 2020</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$69,000</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>$29,000</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>19 months</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>Apr 19, 2024</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>Projected: $150,000</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>Projected: $75,000</td>
              <td style={{ textAlign: 'right', padding: '12px' }}>19 months expected</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        background: 'rgba(35,240,198,0.1)',
        border: '1px solid rgba(35,240,198,0.3)',
        borderRadius: '8px',
        padding: '16px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '13px',
        lineHeight: '1.6',
      }}>
        <strong>Key Pattern:</strong> Bitcoin halvings create 18–19 month cycles with 3 distinct phases: pre-halving euphoria, post-halving correction, and recovery. Altcoin layers (AI compute, settlement, privacy) rotate systematically through these phases.
      </div>
    </div>
  );
}

function PhasesTab() {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#FFFFFF' }}>
        Phase Deep Dives
      </h2>

      {PHASES.map(phase => (
        <div key={phase.id} style={{
          background: phase.colorDim,
          border: `1px solid ${phase.color}`,
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          color: '#FFFFFF',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: phase.color, margin: '0 0 4px 0' }}>
                Phase {phase.id}: {phase.asset}
              </h3>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                {phase.name} — {phase.role}
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: phase.color }}>
              {phase.multiple}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px', fontSize: '12px' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Entry</div>
              <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{phase.entryDate} @ {phase.entryPrice}</div>
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Exit</div>
              <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{phase.exitDate} @ {phase.exitPrice}</div>
            </div>
          </div>

          <div style={{ marginBottom: '16px', lineHeight: '1.6', fontSize: '13px' }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              {phase.description}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 600 }}>
              MECHANICS
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              {phase.mechanics.map((mech, i) => (
                <li key={i}>{mech}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${phase.color}20`,
            borderRadius: '6px',
            padding: '12px',
            fontSize: '12px',
            marginBottom: '12px',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Entry Signal</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>{phase.entrySignal}</div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${phase.color}20`,
            borderRadius: '6px',
            padding: '12px',
            fontSize: '12px',
            marginBottom: '12px',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Exit Signal</div>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>{phase.exitSignal}</div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '12px',
            borderLeft: `3px solid ${phase.color}`,
          }}>
            <div style={{ color: phase.color, fontWeight: 600, marginBottom: '4px' }}>Key Insight</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>{phase.keyInsight}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SignalsTab({ marketData }) {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#FFFFFF' }}>
        Trading Signals
      </h2>

      {SIGNAL_GRID.map(grid => (
        <div key={grid.phase} style={{
          background: grid.colorDim,
          border: `1px solid ${grid.color}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          color: '#FFFFFF',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: grid.color, margin: 0 }}>
              Phase {grid.phase}: {grid.asset}
            </h3>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              Entry Window: {grid.entryWindow}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.5',
          }}>
            <strong>Historical Precedent:</strong> {grid.historicalPrecedent}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {grid.signals.map(signal => (
              <div key={signal.id} style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${grid.color}40`,
                borderRadius: '6px',
                padding: '12px',
                fontSize: '11px',
              }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                  {signal.id}
                </div>
                <div style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '6px', fontSize: '12px' }}>
                  {signal.threshold}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                  Action: {signal.action}
                </div>
                <div style={{
                  display: 'inline-block',
                  background: signal.status === 'ARMED' ? 'rgba(157,78,221,0.3)' : 'rgba(255,255,255,0.1)',
                  color: signal.status === 'ARMED' ? '#9D4EDD' : 'rgba(255,255,255,0.5)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                }}>
                  {signal.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: 'rgba(244,183,40,0.1)',
        border: '1px solid rgba(244,183,40,0.3)',
        borderRadius: '8px',
        padding: '16px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '12px',
        lineHeight: '1.6',
      }}>
        <strong>Signal Status Key:</strong> ARMED = Signal ready for current phase | PENDING = Future phase, not yet active
      </div>
    </div>
  );
}

function CyclesTab() {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#FFFFFF' }}>
        Historical Cycles & Projections
      </h2>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        marginBottom: '32px',
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
            <th style={{ textAlign: 'left', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Cycle</th>
            <th style={{ textAlign: 'left', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Period</th>
            <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Phases</th>
            <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Total Return</th>
            <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <td style={{ padding: '12px', color: '#9D4EDD' }}>2020 Cycle</td>
            <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>May 2020 – Aug 2021</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>L1 + L2 Rotation</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>45–65x</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>Complete</td>
          </tr>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <td style={{ padding: '12px', color: '#23F0C6' }}>2024 Cycle</td>
            <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>Apr 2024 – Aug 2025</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>L1 + L2 Rotation</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>32–48x</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>In Progress</td>
          </tr>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <td style={{ padding: '12px', color: '#F4B728' }}>2028 Cycle (Projected)</td>
            <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>Apr 2028 – Aug 2029</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>L1 + L2 + L3 Rotation</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.7)' }}>100–150x</td>
            <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>Pending</td>
          </tr>
        </tbody>
      </table>

      <div style={{
        background: 'rgba(157,78,221,0.1)',
        border: '1px solid rgba(157,78,221,0.3)',
        borderRadius: '8px',
        padding: '16px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '13px',
        lineHeight: '1.6',
      }}>
        <strong>Projection Notes:</strong> 2028 cycle projections are based on extrapolation of 2020 and 2024 patterns. Privacy layer integration (ZEC) is the new variable. If CBDC rollout accelerates, 2028 cycle could exceed 150x.
      </div>
    </div>
  );
}

function ExecutionTab() {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#FFFFFF' }}>
        Execution Framework
      </h2>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Pre-Entry Checklist
        </h3>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '16px',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '13px',
          lineHeight: '1.8',
        }}>
          <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" /> Capital reserves 3+ months operating expenses
          </label>
          <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" /> Market signal confirmed (2+ indicators aligned)
          </label>
          <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" /> Position size calculated (risk allocation %)
          </label>
          <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" /> Stop-loss and exit target defined
          </label>
          <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" /> Emotional readiness: Can hold through -30% drawdown
          </label>
          <label style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
            <input type="checkbox" /> Tax implications reviewed with accountant
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}>
          Risk Allocation Framework
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Risk Posture</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Phase 1 %</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Phase 2 %</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Phase 3 %</th>
              <th style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.6)' }}>Phase 4 %</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>Conservative (50%)</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$50K</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$750K</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$2.6M</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$62.2M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>Moderate (75%)</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$75K</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$1.1M</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$3.9M</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$93.3M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>Aggressive (100%)</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$100K</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$1.5M</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$5.2M</td>
              <td style={{ textAlign: 'right', padding: '12px', color: 'rgba(255,255,255,0.5)' }}>$124.4M</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        background: 'rgba(244,183,40,0.1)',
        border: '1px solid rgba(244,183,40,0.3)',
        borderRadius: '8px',
        padding: '16px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '12px',
        lineHeight: '1.6',
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
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#FFFFFF' }}>
        Capital Flow Calculator
      </h2>

      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '32px',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Initial Capital
          </label>
          <input
            type="number"
            value={initialCapital}
            onChange={e => setInitialCapital(Math.max(10000, Number(e.target.value)))}
            style={{
              width: '100%',
              padding: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
            Min: $10K | Max: $1M (typical)
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
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
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
            Higher % = All capital deployed each phase | Lower % = Keep reserves
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <div style={{
          background: 'rgba(157,78,221,0.1)',
          border: '1px solid rgba(157,78,221,0.3)',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>
            AFTER PHASE 1 (TAO)
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#9D4EDD' }}>
            ${(phase1Out / 1000000).toFixed(2)}M
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
            Entry: ${initialCapital.toLocaleString()} @ 15x
          </div>
        </div>

        <div style={{
          background: 'rgba(35,240,198,0.1)',
          border: '1px solid rgba(35,240,198,0.3)',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>
            AFTER PHASE 2 (XRP)
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#23F0C6' }}>
            ${(phase2Out / 1000000).toFixed(2)}M
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
            Deployed: ${(phase2In / 1000000).toFixed(2)}M @ 6x
          </div>
        </div>

        <div style={{
          background: 'rgba(244,183,40,0.1)',
          border: '1px solid rgba(244,183,40,0.3)',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>
            AFTER PHASE 3 (ZEC W1)
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#F4B728' }}>
            ${(phase3Out / 1000000).toFixed(2)}M
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
            Deployed: ${(phase3In / 1000000).toFixed(2)}M @ 21.6x
          </div>
        </div>

        <div style={{
          background: 'rgba(244,183,40,0.1)',
          border: '1px solid rgba(244,183,40,0.3)',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>
            AFTER PHASE 4 (ZEC W2)
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#F4B728' }}>
            ${(phase4Out / 1000000).toFixed(2)}M
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
            Deployed: ${(phase4In / 1000000).toFixed(2)}M @ 3.4x
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px' }}>
            FINAL PORTFOLIO
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>
            ${(finalTotal / 1000000).toFixed(2)}M
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
            Reserves: ${(reserves / 1000000).toFixed(2)}M
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(157,78,221,0.1)',
        border: '1px solid rgba(157,78,221,0.3)',
        borderRadius: '8px',
        padding: '16px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '12px',
        lineHeight: '1.6',
      }}>
        <strong>Calculation Logic:</strong> Each phase deploys {riskAllocation}% of previous phase's exit capital. Remainder held as reserves. Final portfolio = Phase 4 exit + all held reserves. Your specific result depends on actual entry/exit prices and timing precision.
      </div>
    </div>
  );
}

function BlackpaperTab() {
  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#FFFFFF' }}>
        Blackpaper: The Supercycle Thesis
      </h1>

      <div style={{
        fontFamily: 'Source Serif 4, serif',
        fontSize: '14px',
        lineHeight: '1.8',
        color: 'rgba(255,255,255,0.85)',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          I. Three Layers
        </h2>
        <p>
          Cryptocurrency infrastructure operates across three distinct layers, each maturing at different timescales relative to Bitcoin's halving cycle. The first layer, AI Compute, emerged in 2023 as the vanguard of a new wave—decentralized neural network infrastructure became real. The second layer, Settlement, has always existed but gained institutional velocity in 2024 with regulatory clarity and CBDC integration. The third layer, Privacy, becomes critical precisely when institutional adoption triggers the need for financial sovereignty.
        </p>
        <p>
          Each layer experiences capital rotation in sequence. Capital arrives seeking outsized returns, validates the infrastructure, then rotates to the next emerging layer. This is not speculative; it is structural. The rotation is driven by macro conditions—halvings, Fed policy, regulatory clarity—but the sequence itself is deterministic.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          II. The Clock
        </h2>
        <p>
          Bitcoin's halving is a clock, not a trigger. It divides time into predictable segments. The 19 months following a halving create a window of opportunity—macro conditions align, retail FOMO peaks, and institutional capital is dormant. The supercycle thesis maps three asset rotations onto this 19-month window, exploiting the predictable emotional and structural patterns that emerge every four years.
        </p>
        <p>
          The 2028 halving (April 19, 2028) anchors our current projection. Counting backward and forward in months from this event, we can map when each layer becomes relevant. This is the "fulcrum"—not because halving causes returns, but because halving synchronizes global macro conditions, making capital rotations predictable.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          III. Phase 1: AI Discovers Money (Oct 2023 – Mar 2024)
        </h2>
        <p>
          October 2023: ChatGPT becomes ubiquitous. AGI speculation reaches fever pitch. A tiny protocol called Bittensor (TAO) promises decentralized AI training. It was absurd. It was also 15x in 4.5 months.
        </p>
        <p>
          The first phase always features a narrative that seems ridiculous to institutional investors. "Decentralized AI training" was mocked by every major fund. Yet retail poured in, leveraged futures exploded, and TAO became the carry trade of early 2024. The mechanism is simple: narrative + scarcity + leverage = bubble. But here's the key: TAO's 15x wasn't a bug, it was a feature. It proved that capital could rotate with momentum, and it created the bankroll for phase two.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          Interlude: The Waiting Room (Mar 2024 – Oct 2024)
        </h2>
        <p>
          After TAO exits, capital sits. This is the hardest part of the cycle. Markets look flat. Narratives feel tired. The temptation is to redeploy immediately into the next hot thing. This is wrong. The waiting room is where discipline separates winners from gamblers. You wait for the next phase signal—regulatory clarity, macro events, institutional attention—to align.
        </p>
        <p>
          In the 2023–2024 cycle, the waiting room lasted 6 months. In the 2026–2028 projection, we expect another 6-month waiting room before XRP rotations truly begin. This is not a flaw; it is a feature. Waiting is the trade.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          IV. Phase 2: Institution Arrives (Oct 2024 – Jan 2025)
        </h2>
        <p>
          October 2024: Regulatory signals around stablecoins and CBDCs accelerate. XRP, rejected by institutions for a decade, suddenly becomes relevant. Not because the protocol changed, but because the macro narrative flipped. Institutions need bridges for CBDC integration. XRP became that bridge.
        </p>
        <p>
          Phase two always features an asset that was "dead" or dismissed. It gains legitimacy through regulatory endorsement or institutional adoption. The return is smaller than phase one (6x vs. 15x), but the conviction is higher. Phase two is less about FOMO, more about genuine infrastructure adoption. Capital is less leveraged, positions are larger, and exits take discipline rather than luck.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          V. Phase 3: Privacy Detonation (Apr 2025 – Nov 2025)
        </h2>
        <p>
          April 2025: CBDC rollouts accelerate globally. Retail investor anxiety about financial surveillance peaks. The narrative flips: institutions built the rails, now individuals need escape routes. Privacy becomes a human right, not a trading thesis.
        </p>
        <p>
          Zcash, dismissed as "darknet coin," suddenly gains 21.6x in 7 months. The mechanics are pure: regulatory threat + institutional adoption = exponential pricing. Phase three is always the longest and largest multiple because it captures both institutional hedge demand and retail flight-to-privacy.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          VI. Phase 4: Discipline Trade (Mar 2026 – May 2026)
        </h2>
        <p>
          March 2026: ZEC retraces to $200. The smart money knows the halving is 2 years away. Instead of chasing new narratives, they buy the dip in a proven winner. ZEC gains 3.4x by May 2026—smaller than previous phases, but achieved with full confidence and zero doubt.
        </p>
        <p>
          Phase four proves that discipline beats greed. The largest returns come from early positions in new narratives (phase 1), but the most robust returns come from conviction in proven assets. A 3.4x from disciplined redeployment builds more wealth per unit of emotional cost than a 21.6x from speculation.
        </p>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginTop: '32px', marginBottom: '16px' }}>
          VII. Psychology of $660.8M
        </h2>
        <p>
          The final insight is psychological. A $100K initial position becoming $660.8M is not just a number; it is a test of nerve at every stage. At $1.5M (after phase 1), the instinct is to take profits. At $7.2M (after phase 2), retirement feels real. At $124.4M (after phase 3), the psychological pressure to sell becomes unbearable. Phase 4 exists as much for mental discipline as for returns.
        </p>
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
    <div style={{ minHeight: '100vh', background: '#0A0B0F', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif' }}>
      <GalaxyBackground />

      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(10,11,15,0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                color: activeTab === tab.id ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
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
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '24px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '12px',
        marginTop: '32px',
      }}>
        Supercycle v1.0 • Historical proof-of-concept dashboard • May 2026
      </div>
    </div>
  );
}
