import { Resource } from "sst";
import { Util } from "@mutube-sst/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.TrackedChannels.name,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      channelId: event?.pathParameters?.id,
    },
  };

  const result = await dynamoDb.send(new GetCommand(params));
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return JSON.stringify(result.Item);
});
