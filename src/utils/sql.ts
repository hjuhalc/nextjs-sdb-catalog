interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

function constructQuery(query: string, params: QueryParams): [string, any[]] {
  const values: any[] = [];

  // Replace placeholders in the query string with actual values
  let escapedQuery = query.replace(/:(\w+)/g, (match, paramName) => {
    const paramValue = params[paramName];

    // If the parameter value is null or undefined, skip it
    if (paramValue === null || paramValue === undefined) {
      return match;
    }

    // Escape the parameter value to prevent SQL injection
    const escapedValue =
      typeof paramValue === "number"
        ? paramValue
        : `'${String(paramValue).replace(/'/g, "''")}'`;

    // Add the escaped value to the values array
    values.push(paramValue);

    // Return the escaped value as a replacement for the placeholder
    return escapedValue.toString();
  });

  // Return the escaped query and values array as a tuple
  return [escapedQuery, values];
}

export { constructQuery };
