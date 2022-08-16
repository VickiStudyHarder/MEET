export default {
  type: "object",
  properties: {
    awsUserName: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    dateOfBirth: { type: "string" },
    role: { type: "string" },
  },
  required: ["awsUserName", "firstName", "lastName", "dateOfBirth", "role"],
} as const;
