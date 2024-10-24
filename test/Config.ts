import { Configuration, FetchAPI } from "../generated/src";

export const configuration = new Configuration({
  username: "awx",
  password: "awx",
  basePath: `http://${global.__TESTCONTAINERS_AWX_IP__}:${global.__TESTCONTAINERS_AWX_PORT_8080__}`,
  fetchApi: fetch as unknown as FetchAPI,
});
