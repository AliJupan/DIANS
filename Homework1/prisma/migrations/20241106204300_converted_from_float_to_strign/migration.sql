-- AlterTable
ALTER TABLE "StockPrice" ALTER COLUMN "averagePrice" SET DATA TYPE TEXT,
ALTER COLUMN "lastTransactionPrice" SET DATA TYPE TEXT,
ALTER COLUMN "profit" SET DEFAULT '0.00',
ALTER COLUMN "profit" SET DATA TYPE TEXT,
ALTER COLUMN "totalProfitInDenars" SET DEFAULT '0',
ALTER COLUMN "totalProfitInDenars" SET DATA TYPE TEXT,
ALTER COLUMN "turnoverInBestInDenars" SET DEFAULT '0',
ALTER COLUMN "turnoverInBestInDenars" SET DATA TYPE TEXT;
