import sqlite3 from "better-sqlite3";
import { DB_PATH } from "$env/static/private";

import { fileURLToPath } from "url";
import { dirname } from "path";

// const db = sqlite3("/fonts/ffxiv_database.sqlite3")

export function getItem() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	console.log("DONDO");
	console.log(__filename);
	// var row = db.prepare('SELECT * FROM item WHERE id = ?').get(1)
	// console.log(row)
}
