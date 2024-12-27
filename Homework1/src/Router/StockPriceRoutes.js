import express from 'express';

const router = express.Router();

const stockPriceRouter = (stockPriceController)=>{
    router.get('/:issuer',stockPriceController.findDataByIssuers());

    return router;
}

export default stockPriceRouter