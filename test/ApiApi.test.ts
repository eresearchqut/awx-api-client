import {
  ApiApi,
  ApiJobsListRequest,
  ApiJobsDeleteRequest,
  ApiJobTemplatesCreateRequest,
  ApiJobsReadRequest,
  ApiJobTemplatesDeleteRequest,
  ApiJobTemplatesLaunchCreateRequest,
  JobTemplate,
  JobLaunch,
  ResponseError,
} from "../generated/src";
import { configuration } from "./Config";

describe("AWX API Test", () => {
  const api = new ApiApi(configuration);

  test("List APIs", async () => {
    const response = await api.apiList();
    expect(response).toEqual({
      description: "AWX REST API",
      current_version: "/api/v2/",
      available_versions: { v2: "/api/v2/" },
      oauth2: "/api/o/",
      custom_logo: "",
      custom_login_info: "",
      login_redirect_override: "",
      swagger: "/api/swagger/",
    });
  });

  test("List jobs", async () => {
    const reqParams: ApiJobsListRequest = {
      version: "v2",
    };
    const response = await api.apiJobsList(reqParams);
    expect(response.count).toBeGreaterThanOrEqual(0);
    expect(response.next).toEqual(undefined);
    expect(response.previous).toEqual(undefined);
  });

  // Fail tests
  test("Job Delete fail test", async () => {
    const reqParams: ApiJobsDeleteRequest = {
      version: "v2",
      id: "1500000",
    };

    await expect(api.apiJobsDelete(reqParams)).rejects.toThrow(ResponseError);
  });

  test("Job template fail test", async () => {
    const reqParams: ApiJobTemplatesDeleteRequest = {
      version: "v2",
      id: "130000",
    };

    await expect(api.apiJobTemplatesDelete(reqParams)).rejects.toThrow(
      ResponseError,
    );
  });
});
