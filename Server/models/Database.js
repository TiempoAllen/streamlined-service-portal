import pg from 'pg';

class Database {
  constructor() {
    this.client = new pg.Client({
      user: 'postgres',
      host: 'localhost',
      database: 'streamlined-service-portal',
      password: 'root',
      port: '5432',
    });
    this.client.connect();
  }

  query(text, params) {
    return this.client.query(text, params);
  }
}

export default Database;
