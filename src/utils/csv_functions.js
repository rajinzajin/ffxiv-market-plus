import axios from "axios";
import csvParser from "csv-parser";

export async function getArrayFromCSV(url) {
	const dataStream = await axios.get(
		url,
		{ responseType: "stream" }
	);

	return new Promise((resolve, reject) => {
		const results = [];
		dataStream.data
			.pipe(csvParser({ skipLines: 2, headers: false }))
			.on("data", (data) => {
				// Process each row of data here
				results.push(data);
			})
			.on("end", () => {
				// When the stream ends, store the results in the cache and resolve the promise
				resolve(results);
			})
			.on("error", (err) => {
				// If there's an error, reject the promise with the error
				reject(err);
			});
	});
}