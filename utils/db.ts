import { Client } from "postgres";

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

export const findBookByUrl = async (url: string): Promise<Book | null> => {
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

export const addBook = async (
  url: string,
  title: string,
): Promise<Book | null> => {
  try {
    const result = await client.queryObject<Book>(
      "insert into book (url, title, parsed) values ($1, $2, false) returning *",
      [url, title],
    );
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getDownloadRemain = async (): Promise<number> => {
  try {
    const result = await client.queryObject<{ count: number }>(
      `select count(id) from page p where p.downloaded = false`,
    );
    return result.rows[0].count;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const getParseRemain = async (): Promise<number> => {
  try {
    const result = await client.queryObject<{ count: number }>(
      `select count(id) from book p where p.parsed = false`,
    );
    return result.rows[0].count;
  } catch (e) {
    console.error(e);
    return 0;
  }
};
