class StockPriceRepo {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findDataByIssuers(issuer) {
    try {
      const data = await this.prisma.StockPrice.findMany({
        where: {
          issuerCode: issuer,
        },
      });

      return data;
    } catch (error) {
      console.log(`Error finding data for issuer :${issuer} ${error}`);
    }
  }
}

export default StockPriceRepo;
