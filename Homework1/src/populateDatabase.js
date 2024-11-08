import fetchIssuers from './fetchIssuers.js';
import getLastFetchedDate from './getLastFetchedDate.js';
import fetchMissingData from './fetchMissingData.js';

console.time('Data Population Timer');

async function populateDatabase() {
  const issuers = await fetchIssuers();
  const promises = issuers.map(async (issuerCode) => {
    const lastDate = await getLastFetchedDate(issuerCode);
    await fetchMissingData(issuerCode, lastDate || '2014-01-01');
  });

  await Promise.all(promises);

  console.timeEnd('Data Population Timer');
}

populateDatabase();