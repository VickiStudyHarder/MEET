import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "PUT",
        path: "group/leave",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
