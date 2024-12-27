import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { connectDB,prisma } from "./config/database.js";
import { populateDatabase } from "./populateDatabase.js";

import StockPriceRepo from "./Repository/StockPriceRepo.js";
import StockPriceService from "./Service/StockPriceService.js";
import StockPriceController from "./Controller/StockPriceController.js";
import stockPriceRouter from "./Router/StockPriceRoutes.js";

const stockPriceRepo = new StockPriceRepo(prisma);
const stockPriceService = new StockPriceService(stockPriceRepo);
const stockPriceController = new StockPriceController(stockPriceService);

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/stock',stockPriceRouter(stockPriceController));

// populateDatabase();

app.listen(4500, () => {
  console.log(`Server is running on port ${4500}`);
});
