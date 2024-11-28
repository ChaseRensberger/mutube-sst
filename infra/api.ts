// import { bucket } from "./storage";
//
// export const api = new sst.aws.ApiGatewayV2("Api");
//
// api.route("GET /", {
//   link: [bucket],
//   handler: "packages/functions/src/api.handler",
// });

import { table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      },
      args: {
        auth: { iam: true },
      },
    },
  },
});

api.route("POST /tracked-channels", "packages/functions/src/create.main");
api.route("GET /tracked-channels/{id}", "packages/functions/src/get.main");
api.route("GET /tracked-channels", "packages/functions/src/list.main");
api.route(
  "DELETE /tracked-channels/{id}",
  "packages/functions/src/delete.main",
);
