const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")

const client = new DynamoDBClient({
    region: "ap-southeast-2",
    accessKeyId: "local_dev",
    secretAccessKey: "local_dev",
    endpoint: "http://localhost:8000"
})

module.exports = client;