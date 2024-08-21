import {ApiApi, Configuration, FetchAPI} from 'awx-api-client';


describe("AWX API Test", () => {
    const basePath = `http://${global.__TESTCONTAINERS_AWX_IP__}:${global.__TESTCONTAINERS_AWX_PORT_8080__}`;
    const configuration = new Configuration({
        basePath,
        fetchApi: fetch as unknown as FetchAPI
    });
    const api = new ApiApi(configuration);
    test("api list", async () => {
        const response = await api.apiList();
        expect(response).toEqual({
            "description": "AWX REST API",
            "current_version": "/api/v2/",
            "available_versions": {"v2": "/api/v2/"},
            "oauth2": "/api/o/",
            "custom_logo": "",
            "custom_login_info": "",
            "login_redirect_override": "",
            "swagger": "/api/swagger/"
        })
    });
});