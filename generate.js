const {execSync} = require('child_process');

execSync(`docker run --rm -v "${process.cwd()}:/local\" openapitools/openapi-generator-cli:v7.9.0 generate -i /local/spec.json -g typescript-fetch -o /local/generated -p debugOpenAPI=true -p verbose=false -p supportsES6=false -p npmName=awx-api-client -p npmVersion=1.0.0`);