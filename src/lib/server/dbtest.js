import sqlite3 from "better-sqlite3"
import { DB_PATH } from '$env/static/private';

const db = sqlite3("fonts/ffxiv_database.sqlite3")

export function getItem(){
    var row = db.prepare('SELECT * FROM item WHERE id = ?').get(1)
    console.log(row)
}