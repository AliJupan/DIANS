class StockPriceRepo {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findDataByIssuers(issuer) {
    try {
      const data = await this.prisma.StockPrice.findMany({
        where: {
          issuerCode: issuer,
          min: {
            gt: 0,
          },
          maks: {
            gt: 0,
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      return data;
    } catch (error) {
      console.log(`Error finding data for issuer :${issuer} ${error}`);
    }
  }

  async findDataByIssuerAndDateRange(issuer, fromDate, toDate) {
    try {
      if (!fromDate || !toDate) {
        throw new Error("Both fromDate and toDate must be provided");
      }
      const data = await this.prisma.StockPrice.findMany({
        where: {
          issuerCode: issuer,
          date: {
            gte: new Date(fromDate),
            lte: new Date(toDate),
          },
          min: {
            gt: 0,
          },
          maks: {
            gt: 0,
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      return data;
    } catch (error) {
      console.log(
        `Error fetching data for issuer ${issuer} in date range: ${fromDate} to ${toDate}. Error: ${error}`
      );
    }
  }

  async findTotalProfitByIssuerAndDateRange(issuer, fromDate, toDate) {
    try {
      if (!fromDate || !toDate) {
        throw new Error("Both fromDate and toDate must be provided");
      }
      const data = await this.prisma.StockPrice.findMany({
        where: {
          issuerCode: issuer,
          date: {
            gte: new Date(fromDate),
            lte: new Date(toDate),
          },
          min: {
            gt: 0,
          },
          maks: {
            gt: 0,
          },
        },
        orderBy: {
          date: "asc",
        },
        select: {
          totalProfitInDenars: true,
          date: true,
        },
      });

      return data;
    } catch (error) {
      console.log(
        `Error fetching data for issuer ${issuer} in date range: ${fromDate} to ${toDate}. Error: ${error}`
      );
    }
  }

  async getIssuers() {
    try {
      const issuers = await this.prisma.StockPrice.findMany({
        distinct: ["issuerCode"],
        select: {
          issuerCode: true,
        },
      });

      return issuers.map((item) => item.issuerCode);
    } catch (error) {
      console.log(`Error fetching issuers: ${error}`);
      return [];
    }
  }
}

export default StockPriceRepo;
