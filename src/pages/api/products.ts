import { NextApiRequest, NextApiResponse } from "next/types";

import { constructQuery } from "../../utils/sql";

interface Database {
  host: string;
  name: string;
  user: string;
  pass: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const host = process.env.DB_HOST;
  const name = process.env.DB_NAME;
  const user = process.env.DB_USERNAME;
  const pass = process.env.DB_PASSWORD;
  if (!host || !name || !user || !pass) {
    res.status(500).json({ error: "Missing env variables" });
    return;
  }

  var resp;
  switch (req.method) {
    case "GET":
      resp = await get({ host, name, user, pass });
      res.status(resp.status).json(resp.body);
      break;
    case "POST":
      resp = await post(req, res, { host, name, user, pass });
      res.status(resp.status).json(resp.body);
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}

async function get(db: Database) {
  const query = "SELECT * FROM product";
  const url = new URL("sql", db.host);

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${db.user}:${db.pass}`).toString(
        "base64"
      )}`,
      Accept: "application/json",
      DB: db.name,
      NS: "catalog",
    },
    body: query,
  });

  return { body: await resp.json(), status: resp.status };
}

async function post(req: NextApiRequest, res: NextApiResponse, db: Database) {
  const body = JSON.parse(req.body);
  if (!body.name || !body.price) {
    return {
      body: `Missing required fields: name: ${body.name}, price: ${body.price}`,
      status: 400,
    };
  }

  const query = "INSERT INTO product (name, price) VALUES (:name, :price)";
  const params = { name: body.name, price: body.price };
  const [escapedQuery, _values] = constructQuery(query, params);
  const url = new URL("sql", db.host);
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${db.user}:${db.pass}`).toString(
        "base64"
      )}`,
      Accept: "application/json",
      DB: db.name,
      NS: "catalog",
    },
    body: escapedQuery,
  });

  return { body: await resp.json(), status: resp.status };
}
