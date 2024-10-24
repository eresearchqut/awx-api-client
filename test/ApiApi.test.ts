import {
  ApiApi,
  ApiJobsListRequest,
  ApiJobsDeleteRequest,
  ApiJobsReadRequest,
  ApiJobTemplatesDeleteRequest,
  ApiJobTemplatesLaunchCreateRequest,
  JobTemplate,
  ResponseError,
  ApiJobTemplatesListRequest,
  ApiJobsCancelCreateRequest,
  ApiJobsCancelReadRequest,
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

  test("List jobs templates", async () => {
    const reqParams: ApiJobTemplatesListRequest = {
      version: "v2",
    };
    const response = await api.apiJobTemplatesList(reqParams);
    expect(response.count).toBeGreaterThanOrEqual(0);
    expect(response.next).toEqual(undefined);
    expect(response.previous).toEqual(undefined);
  });

  describe("Job API Testing", () => {
    let jobTemplateId: number;
    let jobId: number;

    test("Job Template Create", async () => {
      const jobData: JobTemplate = {
        name: "Test Job Template",
        description: "This is a test job",
        url: "testjob@example.com",
        project: "6", // Primary key (pk) - Project id
        inventory: 1, // Primary key (pk) - Inventory id
        playbook: "hello_world.yml",
      };
      const jobTempParams: any = {
        version: "v2",
        data: jobData,
      };
      const jobTempResponse = await api.apiJobTemplatesCreate(jobTempParams);
      // Get job template id to launch a new job
      jobTemplateId = jobTempResponse.id ?? -1;
      expect(jobTempResponse.type).toEqual("job_template");
      expect(jobTempResponse.url).toEqual(
        "/api/v2/job_templates/" + jobTemplateId + "/",
      );
    });

    test("Job Template Create", async () => {
      const jobLaunchParams: ApiJobTemplatesLaunchCreateRequest = {
        version: "v2",
        id: "" + jobTemplateId,
        data: {},
      };

      const jobLaunchResponse =
        await api.apiJobTemplatesLaunchCreate(jobLaunchParams);

      jobId = jobLaunchResponse.id ?? -1;
    });

    test("Get Job ID", async () => {
      const jobParams: ApiJobsReadRequest = {
        version: "v2",
        id: "" + jobId,
      };
      const jobResponse = await api.apiJobsRead(jobParams);
      expect(jobResponse.id).toEqual(jobId);
      expect(jobResponse.type).toEqual("job");
      expect(jobResponse.url).toEqual("/api/v2/jobs/" + jobId + "/");
    });

    test("Cancel Job Read", async () => {
      const jobCancelParams: ApiJobsCancelReadRequest = {
        version: "v2",
        id: "" + jobId,
      };
      const jobCancelReadResponse =
        await api.apiJobsCancelRead(jobCancelParams);
      expect(jobCancelReadResponse.canCancel).toEqual(true);
    });

    test("Cancel Job Post", async () => {
      const jobCancelParams: ApiJobsCancelCreateRequest = {
        version: "v2",
        id: "" + jobId,
      };
      const jobCancelPostResponse =
        await api.apiJobsCancelCreate(jobCancelParams);
      expect(jobCancelPostResponse).toBeUndefined();
    });
  });

  // Fail tests
  test("Job delete fail", async () => {
    const reqParams: ApiJobsDeleteRequest = {
      version: "v2",
      id: "1500000",
    };

    await expect(api.apiJobsDelete(reqParams)).rejects.toThrow(ResponseError);
  });

  test("Job template delete fail", async () => {
    const reqParams: ApiJobTemplatesDeleteRequest = {
      version: "v2",
      id: "130000",
    };

    await expect(api.apiJobTemplatesDelete(reqParams)).rejects.toThrow(
      ResponseError,
    );
  });
});
