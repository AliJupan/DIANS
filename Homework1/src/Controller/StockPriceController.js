class StockPriceController {
  constructor(stockPriceService) {
    this.stockPriceService = stockPriceService;
  }

  findDataByIssuers() {
    return [
      async (req, res) => {
        try {
          const { issuer } = req.params;

          if (!issuer) {
            return res
              .status(400)
              .json({ code: 400, msg: "No issuer provided" });
          }

          const data = await this.stockPriceService.findDataByIssuers(issuer);

          return res.status(200).json({
            succes: true,
            msg: "Data recieved successfully",
            data: data,
          });
        } catch (error) {
          return res.status(400).json({
            code: 400,
            msg: error.message,
          });
        }
      },
    ];
  }

  findDataByIssuerAndDateRange() {
    return [
      async (req, res) => {
        try {
          const { issuer } = req.params;
          const { fromDate, toDate } = req.body;

          if (!issuer) {
            return res
              .status(400)
              .json({ code: 400, msg: "No issuer provided" });
          }

          const data =
            await this.stockPriceService.findDataByIssuerAndDateRange(
              issuer,
              fromDate,
              toDate
            );

          return res.status(200).json({
            succes: true,
            msg: "Data recieved successfully",
            data: data,
          });
        } catch (error) {
          return res.status(400).json({
            code: 400,
            msg: error.message,
          });
        }
      },
    ];
  }

  getIssuers() {
    return async (req, res) => {
      try {
        const data = await this.stockPriceService.getIssuers();

        return res.status(200).json({
          success: true,
          msg: "Data received successfully",
          data: data,
        });
      } catch (error) {
        return res.status(400).json({
          code: 400,
          msg: error.message,
        });
      }
    };
  }

  findTotalProfitByIssuerAndDateRange() {
    return [
      async (req, res) => {
        try {
          const { issuer } = req.params;
          const { fromDate, toDate } = req.body;

          if (!issuer) {
            return res
              .status(400)
              .json({ code: 400, msg: "No issuer provided" });
          }

          const data =
            await this.stockPriceService.findTotalProfitByIssuerAndDateRange(
              issuer,
              fromDate,
              toDate
            );

          return res.status(200).json({
            succes: true,
            msg: "Data recieved successfully",
            data: data,
          });
        } catch (error) {
          return res.status(400).json({
            code: 400,
            msg: error.message,
          });
        }
      },
    ];
  }
}

export default StockPriceController;
