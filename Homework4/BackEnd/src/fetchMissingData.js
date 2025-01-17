import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";
import insertDataToDb from "./insertDataToDb.js";

async function fetchMissingData(issuerCode, startDate) {
  const url = "https://www.mse.mk/mk/stats/symbolhistory/REPL";

  let currentStartDate = startDate
    ? moment(startDate)
    : moment().subtract(10, "years");

  while (currentStartDate.isBefore(moment())) {
    const currentEndDate = currentStartDate.clone().add(1, "year").subtract(1, "day");

    const formattedStartDate = currentStartDate.format("DD.MM.YYYY");
    const formattedEndDate = currentEndDate.isAfter(moment())
      ? moment().format("DD.MM.YYYY")
      : currentEndDate.format("DD.MM.YYYY");

    const formData = {
      FromDate: formattedStartDate,
      ToDate: formattedEndDate,
      Code: issuerCode,
    };

    try {
      const response = await axios.post(
        url,
        new URLSearchParams(formData).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const $ = cheerio.load(response.data);
      const transactions = [];

      $("table#resultsTable tbody tr").each((i, row) => {
        const columns = $(row).find("td");
        transactions.push({
          date: $(columns[0]).text().trim(),
          lastTransactionPrice: $(columns[1]).text().trim(),
          maks: $(columns[2]).text().trim(),
          min: $(columns[3]).text().trim(),
          averagePrice: $(columns[4]).text().trim(),
          profit: $(columns[5]).text().trim(),
          quantity: $(columns[6]).text().trim(),
          turnoverInBestInDenars: $(columns[7]).text().trim(),
          totalProfitInDenars: $(columns[8]).text().trim(),
        });
      });

      for (let transaction of transactions) {
        const {
          date,
          lastTransactionPrice,
          maks,
          min,
          averagePrice,
          profit,
          quantity,
          turnoverInBestInDenars,
          totalProfitInDenars,
        } = transaction;
        if (lastTransactionPrice != null) {
          const parsedDate = new Date(parseDate(date));
          const parsedQuantity = quantity ? parseInt(quantity) : 0;

          await insertDataToDb(
            issuerCode,
            parsedDate,
            lastTransactionPrice,
            averagePrice,
            profit,
            parsedQuantity,
            turnoverInBestInDenars,
            totalProfitInDenars,
            maks ? parseFloat(maks) : 0,
            min ? parseFloat(min) : 0
          );
        }
      }

      currentStartDate = currentEndDate.clone().add(1, "day");
    } catch (error) {
      console.error(`Error fetching missing data for ${issuerCode}:`, error);
      break;
    }
  }
}

function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

export default fetchMissingData;
