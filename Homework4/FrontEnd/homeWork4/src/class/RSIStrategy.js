import TechnicalIndicatorStrategys from "./TechnicalIndicatorStrategy";

export default class RSIStrategy extends TechnicalIndicatorStrategys {
    calculate(prices, period = 14) {
      let gains = 0, losses = 0;
  
      for (let i = 1; i < period; i++) {
        const diff = prices[i] - prices[i - 1];
        if (diff > 0) gains += diff;
        else losses -= diff;
      }
  
      const avgGain = gains / period;
      const avgLoss = losses / period;
  
      const rs = avgGain / avgLoss;
      return 100 - 100 / (1 + rs);
    }
  }