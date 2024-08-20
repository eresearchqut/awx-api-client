const {execSync} = require('child_process');

execSync(`docker run --rm -v "${process.cwd()}:/local\" openapitools/openapi-generator-cli:v7.8.0 generate -i /local/spec.json -g typescript-fetch -o /local/typescript-fetch-client -p supportsES6=true -p npmName=awx-api-client`);