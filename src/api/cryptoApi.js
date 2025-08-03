import { getAssetErc20ByChainAndSymbol, getAssetPriceInfo } from '@funkit/api-base';

const API_KEY = process.env.REACT_APP_FUNKIT_API_KEY;

export const fetchTokenInfo = async (symbol, chainId) => {
  try {
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId: chainId,
      symbol: symbol,
      apiKey: API_KEY,
    });
    return tokenInfo;
  } catch (error) {
    console.error(`Error fetching info for ${symbol}:`, error);
    return null;
  }
};

export const fetchTokenPrice = async (tokenAddress, chainId) => {
  try {
    const priceInfo = await getAssetPriceInfo({
      chainId: chainId,
      assetTokenAddress: tokenAddress,
      apiKey: API_KEY,
    });
    return priceInfo;
  } catch (error) {
    console.error(`Error fetching price for address ${tokenAddress}:`, error);
    return null;
  }
};