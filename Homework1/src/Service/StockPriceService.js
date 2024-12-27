class StockPriceService {
  constructor(stockPriceRepo) {
    this.stockPriceRepo = stockPriceRepo;
  }

  async findDataByIssuers(issuer) {
    try {
      return await this.stockPriceRepo.findDataByIssuers(issuer);
    } catch (error) {
        console.log(`Error finding data for issuer :${issuer} ${error}`);
    }
  }
}

export default StockPriceService;
