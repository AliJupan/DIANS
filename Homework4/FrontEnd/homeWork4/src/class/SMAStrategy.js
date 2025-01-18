import TechnicalIndicatorStrategys from "./TechnicalIndicatorStrategy";

export default class SMAStrategy extends TechnicalIndicatorStrategys {
    calculate(prices, period = 14) {
      return prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period;
    }
  }