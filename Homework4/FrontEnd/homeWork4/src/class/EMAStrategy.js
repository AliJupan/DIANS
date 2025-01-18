import TechnicalIndicatorStrategys from "./TechnicalIndicatorStrategy";

export default class EMAStrategy extends TechnicalIndicatorStrategys {
    calculate(prices, period = 14) {
      const k = 2 / (period + 1);
      let ema = prices[0];
  
      prices.forEach((price, index) => {
        if (index === 0) return;
        ema = price * k + ema * (1 - k);
      });
  
      return ema;
    }
  }