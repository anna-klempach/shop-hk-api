import { Product } from '@libs/models';
import { validate } from 'json-schema';
import { Client, ClientConfig, Pool } from 'pg';

const { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USERNAME } = process.env;
export { Client } from 'pg';

const dbOptions: ClientConfig = {
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: parseInt(PG_PORT, 10),
  user: PG_USERNAME,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

let pool;

const connectToDb = async () => {
  if (!pool) {
    pool = new Pool(dbOptions);
  }
  try {
    const client = await pool.connect();
    return client;
  }
  catch (error) {
    throw error;
  }
};

const disconnect = (client) => {
  client.release();
};

export default {
  getProducts: async () => {
    let client;
    try {
      client = await connectToDb();
    }
    catch (error) {
      throw error;
    }
    try {
      const { rows } = await client.query('select p.*, s.count from products p left join stocks s on p.id = s.product_id');
      return rows;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
    finally {
      disconnect(client);
    }
  },
  getProductsById: async (id: string) => {
    let client;
    try {
      client = await connectToDb();
    }
    catch (error) {
      throw error;
    }
    try {
      const { rows } = await client.query(`select p.*, s.count from products p left join stocks s on p.id = s.product_id where p.id = '${id}'`);
      return rows;
    }
    catch (error) {
      throw error;
    }
    finally {
      disconnect(client);
    }
  },
  postProduct: async (product: Product) => {
    const {
      title,
      description,
      price
    } = product;
    let count = product.count;
    let client;
    try {
      client = await connectToDb();
    }
    catch (error) {
      throw error;
    }
    try {
      const { rows } = await client.query(`insert into products (title, description, price) values
        ('${title}', '${description}', ${price})
        returning id`);
      const createdItemId = rows[0].id;
      if (createdItemId) {
        await client.query(`insert into stocks (product_id, count) values
        ('${createdItemId}', ${count})`);
        return createdItemId;
      }
      throw ({ message: 'Failed to create item', error: 500 });
    }
    catch (error) {
      throw error;
    }
    finally {
      disconnect(client);
    }
  }
}


