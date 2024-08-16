export const basePath = `http://${global.__TESTCONTAINERS_AWX_IP__}:${global.__TESTCONTAINERS_AWX_PORT_8080__}`;
export const apiKey =   `rest_api_key=${process.env.HEAT_API_KEY}`;

