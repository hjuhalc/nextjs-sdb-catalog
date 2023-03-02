import { sql } from "@/db/http";
import { constructQuery } from "@/utils/sql";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var resp;
  switch (req.method) {
    case "DELETE":
      resp = await delete_product(req.query.id as string);
      res.status(resp.status).json(resp.body);
      break;
    case "PUT":
      resp = await update_product(req.query.id as string, req.body);
      res.status(resp.status).json(resp.body);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      return;
  }
}

async function delete_product(id: string) {
  return await sql(constructQuery("DELETE :id", { id })[0]);
}

async function update_product(id: string, data: object) {
  const query = constructQuery("UPDATE :id CONTENT", { id })[0];
  const body = `${query} ${data}`;

  return await sql(body);
}
