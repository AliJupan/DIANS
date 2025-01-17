import express from 'express';

const router = express.Router();

const stockPriceRouter = (stockPriceController) => {

    router.get('/:issuer', stockPriceController.findDataByIssuers());
    router.post('/:issuer/from-to', stockPriceController.findDataByIssuerAndDateRange());
    router.post('/:issuer/total-profit/from-to', stockPriceController.findTotalProfitByIssuerAndDateRange());
    router.get('/', stockPriceController.getIssuers());
  
    return router;
  };
  

export default stockPriceRouter;