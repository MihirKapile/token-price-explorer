import React, { useState, useEffect, useCallback } from 'react';
import { fetchTokenInfo, fetchTokenPrice } from './api/cryptoApi';
import './App.css';

const supportedTokens = [
  { name: 'USDC', chainId: '1' },
  { name: 'USDT', chainId: '137' },
  { name: 'ETH', chainId: '8453' },
  { name: 'WBTC', chainId: '1' },
];

function App() {
  const [usdAmount, setUsdAmount] = useState(100);
  const [sourceToken, setSourceToken] = useState('USDC');
  const [targetToken, setTargetToken] = useState('ETH');
  const [sourceValue, setSourceValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateTokenValues = useCallback(async () => {
    if (!usdAmount || usdAmount <= 0) {
      setSourceValue('');
      setTargetValue('');
      return;
    }

    setIsLoading(true);

    const calculateValue = async (tokenName, chainId) => {
      const tokenInfo = await fetchTokenInfo(tokenName, chainId);
      if (tokenInfo && tokenInfo.address) {
        const priceData = await fetchTokenPrice(tokenInfo.address, chainId);
        
        if (priceData && priceData.unitPrice) {
          return (usdAmount / priceData.unitPrice).toFixed(6);
        }
      }
      return 'N/A';
    };

    const sourceTokenData = supportedTokens.find(t => t.name === sourceToken);
    const targetTokenData = supportedTokens.find(t => t.name === targetToken);

    setSourceValue(await calculateValue(sourceTokenData.name, sourceTokenData.chainId));
    setTargetValue(await calculateValue(targetTokenData.name, targetTokenData.chainId));

    setIsLoading(false);
  }, [usdAmount, sourceToken, targetToken]);

  useEffect(() => {
    calculateTokenValues();
  }, [calculateTokenValues]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Token Price Explorer</h1>
      </header>
      <main>
        <div className="token-selectors">
          {supportedTokens.map(token => (
            <button
              key={token.name}
              className={`token-button ${sourceToken === token.name ? 'active' : ''}`}
              onClick={() => setSourceToken(token.name)}
            >
              {token.name}
            </button>
          ))}
        </div>
        <div className="swap-interface">
          <div className="swap-box">
            <label>USD Amount</label>
            <input
              type="number"
              value={usdAmount}
              onChange={(e) => setUsdAmount(parseFloat(e.target.value))}
              className="usd-input"
            />
            <div className="token-value">{isLoading ? 'Loading...' : `${sourceValue} ${sourceToken}`}</div>
          </div>
          <div className="arrow">→</div>
          <div className="swap-box">
             <label>Target Token</label>
             <div className="token-selector-dropdown">
                <select value={targetToken} onChange={(e) => setTargetToken(e.target.value)}>
                    {supportedTokens.map(token => (
                        <option key={token.name} value={token.name}>{token.name}</option>
                    ))}
                </select>
            </div>
            <div className="token-value">{isLoading ? 'Loading...' : `${targetValue} ${targetToken}`}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;