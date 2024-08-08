// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateService } = require("@umijs/openapi");

generateService({
  // requestLibPath 自定义请求方法路径（我们这里用我们自定义的 axios的request文件，也就是说我们用自定义的axios发送请求
  requestLibPath: "import request from '@/requests/request'",
  schemaPath: "http://localhost:8081/api/v2/api-docs",
  serversPath: "./src/servers",
});
