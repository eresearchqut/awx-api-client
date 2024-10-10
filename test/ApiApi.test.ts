import { ApiApi } from "awx-api-client";
import { configuration } from "./Config";

describe("AWXApiTest", () => {
  const api = new ApiApi(configuration);

  test("api list", async () => {
    const response = await api.apiList();
    console.log(response);
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
});
