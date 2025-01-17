import { prisma } from "./config/database.js";

async function insertDataToDb(
  issuerCode,
  date,
  lastTransactionPrice,
  averagePrice,
  profit,
  quantity,
  turnoverInBestInDenars,
  totalProfitInDenars,
  maks,
  min
) {
  try {
    await prisma.stockPrice.create({
      data: {
        issuerCode,
        date,
        lastTransactionPrice,
        averagePrice,
        profit,
        quantity,
        turnoverInBestInDenars,
        totalProfitInDenars,
        maks,
        min,
      },
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    process.exit(1);
  }
}

export default insertDataToDb;
