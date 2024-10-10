import { Configuration, FetchAPI } from "awx-api-client";

export const configuration = new Configuration({
  username: "awx",
  password: "awx",
  basePath: `http://${global.__TESTCONTAINERS_AWX_IP__}:${global.__TESTCONTAINERS_AWX_PORT_8080__}`,
  fetchApi: fetch as unknown as FetchAPI,
});
