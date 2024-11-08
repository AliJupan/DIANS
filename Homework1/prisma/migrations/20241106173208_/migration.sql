/*
  Warnings:

  - You are about to drop the column `close` on the `StockPrice` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `StockPrice` table. All the data in the column will be lost.
  - Added the required column `averagePrice` to the `StockPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastTransactionPrice` to the `StockPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockPrice" DROP COLUMN "close",
DROP COLUMN "open",
ADD COLUMN     "averagePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lastTransactionPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maks" DOUBLE PRECISION,
ADD COLUMN     "min" DOUBLE PRECISION,
ADD COLUMN     "profit" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalProfitInDenars" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "turnoverInBestInDenars" DOUBLE PRECISION NOT NULL DEFAULT 0;
