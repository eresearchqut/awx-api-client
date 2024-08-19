const {execSync} = require('child_process');

execSync(`docker run --rm -v "${process.cwd()}:/local\" openapitools/openapi-generator-cli:v7.7.0 generate -i /local/spec.json -g typescript-fetch -o /local/generated/typescript-fetch --skip-validate-spec`);