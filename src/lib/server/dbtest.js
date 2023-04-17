import sqlite3 from "better-sqlite3"

const db = sqlite3("data/ffxiv_database.sqlite3")

export function getItem(){
    var row = db.prepare('SELECT * FROM item WHERE id = ?').get(1)
    console.log(row)
}
