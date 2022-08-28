import { Client } from "postgress";
import "dotenv/load.ts";

export interface Book {
  id?: number;
  url: string;
  title?: string;
  parsed?: boolean;
}

const client = new Client({
  user: Deno.env.get("PG_USER"),
  database: Deno.env.get("PG_DB"),
  hostname: Deno.env.get("PG_HOST"),
  password: Deno.env.get("PG_PASSWORD"),
  port: Deno.env.get("PG_PORT"),
});

try {
  await client.connect();
} catch (e) {
  console.error(e);
}

export const findBookByUrl = async (url: string) => {
  try {
    const result = await client.queryObject<Book>(
      "select * from book where url = $1",
      [url],
    );
    if (result.rowCount === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addBook = async (url: string) => {
  try {
    const result = await client.queryObject<Book>(
      "insert into book (url, title, parsed) values ($1, '', false) returning *",
      [url],
    );
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};
