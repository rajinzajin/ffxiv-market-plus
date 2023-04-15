import csvParser from "csv-parser";
import fs from "fs";
import { filterArray } from "./array_object";

let cachedItemsData

export async function processItemCSV() {
    if (cachedItemsData) {
      return cachedItemsData;
    }
  
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream('src/data/item_data.csv')
        .pipe(csvParser())
        .on('data', (data) => {
          // Process each row of data here
          results.push(data);
        })
        .on('end', () => {
          // When the stream ends, store the results in the cache and resolve the promise
          cachedItemsData = results;
          resolve(cachedItemsData);
        })
        .on('error', (err) => {
          // If there's an error, reject the promise with the error
          reject(err);
        });
    });
  }
  
export async function getItemDetailByID(id) {
	var data = await processItemCSV();
	var itemDetail = filterArray(data, { "#": `${id}` });
	if (itemDetail.length > 0) {
		return itemDetail[0];
	}
	return null;
}
