import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
export async function openDB() {
    console.log('try to connect to db')
    return open({
        filename: './db_sql/db.sqlite',
        driver: sqlite3.Database, 
    })
    
}