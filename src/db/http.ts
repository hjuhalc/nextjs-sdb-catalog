async function sql(body: string) {
  const host = process.env.DB_HOST;
  const name = process.env.DB_NAME;
  const user = process.env.DB_USERNAME;
  const pass = process.env.DB_PASSWORD;
  if (!host || !name || !user || !pass) {
    return {
      body: { error: "Missing env variables" },
      status: 500,
    };
  }

  const url = new URL("sql", host);
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString(
        "base64"
      )}`,
      Accept: "application/json",
      DB: name,
      NS: "catalog",
    },

    body,
  });

  return { body: await resp.json(), status: resp.status };
}

export { sql };
