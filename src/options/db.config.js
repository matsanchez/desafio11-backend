export const configDbLocal = {
  host: "localhost",
  user: "root",
  password: "",
};

export const configMysql = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "websocket_mariadb",
  },
  pool: { min: 0, max: 7 },
};

export const configSqlite = {
  client: "sqlite3",
  connection: {
    filename: "./src/db/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};
