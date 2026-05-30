import { useState, useEffect } from 'react';

export function useMarketData() {
  const [marketData, setMarketData] = useState({
    btcPrice: 0,
    taoPrice: 0,
    xrpPrice: 0,
    zecPrice: 0,
    btcDominance: 0,
    taoRsiWeekly: 0,
    loading: true,
    error: null,
  });

  const calculateRSI = (closes, period = 14) => {
    if (closes.length < period + 1) return 50;

    const deltas = closes.map((c, i) => i > 0 ? c - closes[i - 1] : 0).slice(1);
    const gains = deltas.map(d => d > 0 ? d : 0);
    const losses = deltas.map(d => d < 0 ? -d : 0);

    const recentGains = gains.slice(-period);
    const recentLosses = losses.slice(-period);

    const avgGain = recentGains.reduce((a, b) => a + b, 0) / period;
    const avgLoss = recentLosses.reduce((a, b) => a + b, 0) / period;

    if (avgLoss === 0) return avgGain > 0 ? 100 : 0;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch prices from CoinGecko
        const geckoRes = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,bittensor,ripple,zcash&vs_currencies=usd&include_market_cap=true'
        );
        const geckoData = await geckoRes.json();

        // Fetch TAO weekly RSI from Binance
        let taoRsi = 50;
        try {
          const binanceRes = await fetch(
            'https://api.binance.com/api/v3/klines?symbol=TAOUSDT&interval=1w&limit=20'
          );
          const klines = await binanceRes.json();
          if (Array.isArray(klines) && klines.length > 0) {
            const closes = klines.map(k => parseFloat(k[4]));
            taoRsi = calculateRSI(closes);
          }
        } catch (e) {
          console.warn('RSI calculation failed:', e);
        }

        const totalMarketCap = (geckoData.bitcoin?.usd_market_cap || 0) +
                                (geckoData.bittensor?.usd_market_cap || 0) +
                                (geckoData.ripple?.usd_market_cap || 0) +
                                (geckoData.zcash?.usd_market_cap || 0);

        setMarketData({
          btcPrice: geckoData.bitcoin?.usd || 0,
          taoPrice: geckoData.bittensor?.usd || 0,
          xrpPrice: geckoData.ripple?.usd || 0,
          zecPrice: geckoData.zcash?.usd || 0,
          btcDominance: totalMarketCap > 0 ? ((geckoData.bitcoin?.usd_market_cap || 0) / totalMarketCap * 100) : 0,
          taoRsiWeekly: taoRsi,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Market data fetch error:', err);
        setMarketData(prev => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // 5-minute refresh
    return () => clearInterval(interval);
  }, []);

  return marketData;
}
