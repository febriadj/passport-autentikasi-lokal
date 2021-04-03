'use strict'

exports.usersTable = async () => {
  const users = await `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE KEY NOT NULL,
    email VARCHAR(255) UNIQUE KEY NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  )`
  
  return users
}