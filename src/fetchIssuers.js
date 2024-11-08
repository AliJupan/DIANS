import axios from 'axios';
import * as cheerio from 'cheerio';

async function fetchIssuers() {
  try {
    const url = "https://www.mse.mk/mk/stats/symbolhistory/REPL";

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const issuers = [];
    $("select#Code option").each((i, option) => {
      const value = $(option).val();
      if (/^[A-Za-z]+$/.test(value)) {
        issuers.push(value);
      }
    });

    return issuers;
  } catch (error) {
    console.error("Error fetching issuers:", error);
  }
}

export default fetchIssuers;
