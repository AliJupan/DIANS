import { prisma } from "./config/database.js";

async function getLastFetchedDate(issuerCode) {
  try {
    const stockPrice = await prisma.stockPrice.findFirst({
      where: {
        issuerCode: issuerCode,
      },
      orderBy: {
        date: 'desc',
      },
      select: {
        date: true,
      },
    });

    return stockPrice ? stockPrice.date : null;
  } catch (err) {
    console.error("Error fetching last date:", err);
    throw err;
  }
}

export default getLastFetchedDate;
