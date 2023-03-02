import { sql } from "@/db/http";
import { Database } from "@/types";
import { constructQuery } from "@/utils/sql";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var resp;
  switch (req.method) {
    case "GET":
      resp = await get();
      res.status(resp.status).json(resp.body);
      break;
    case "POST":
      resp = await post(req);
      res.status(resp.status).json(resp.body);
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}

async function get() {
  return await sql("SELECT * FROM product");
}

async function post(req: NextApiRequest) {
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

  return await sql(escapedQuery);
}
