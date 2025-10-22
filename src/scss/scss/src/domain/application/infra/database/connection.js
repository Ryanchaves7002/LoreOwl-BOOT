import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',        // ou o usuário que tu usa no Heidi
  password: 'tua_senha',
  database: 'loreowl_db' // o nome do banco que tu criou
});
