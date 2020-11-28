export = {
   "type": "postgres",
   "host": process.env.DB_HOST || "localhost",
   "port": process.env.DB_PORT || 5432,
   "username": process.env.DB_USER || "test",
   "password": "test",
   "database": process.env.DB_NAME || "test",
   "logging": false,
   "entities": ["src/backend/entity/**/*.ts"],
   "migrations": ["src/backend/migration/**/*.ts"],
   "subscribers": ["src/backend/subscriber/**/*.ts"],
   "migrationsRun": false,
   "seeds": ["src/backend/seed/**/*.ts"],
   "cli": {
      "entitiesDir": "src/backend/entity",
      "migrationsDir": "src/backend/migration"
   }
}