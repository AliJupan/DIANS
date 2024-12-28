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

  async findDataByIssuerAndDateRange(issuer, fromDate, toDate) {
    try {
      return await this.stockPriceRepo.findDataByIssuerAndDateRange(
        issuer,
        fromDate,
        toDate
      );
    } catch (error) {
      console.log(`Error finding data for issuer :${issuer} ${error}`);
    }
  }

  async getIssuers() {
    try {
      return await this.stockPriceRepo.getIssuers();
    } catch (error) {
      console.log(`Error finding issuers :${error}`);
    }
  }

  async findTotalProfitByIssuerAndDateRange(issuer, fromDate, toDate) {
    try {
      return await this.stockPriceRepo.findTotalProfitByIssuerAndDateRange(
        issuer,
        fromDate,
        toDate
      );
    } catch (error) {
      console.log(`Error finding data for issuer :${issuer} ${error}`);
    }
  }
}

export default StockPriceService;
