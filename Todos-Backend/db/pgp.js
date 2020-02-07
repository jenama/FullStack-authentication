const pgp = require('pg-promise')();
const cn = "postgres://localhost:5432/todos_api_db";
const db = pgp(cn)
module.exports = db 
 


