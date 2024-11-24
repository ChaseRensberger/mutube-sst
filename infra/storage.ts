export const bucket = new sst.aws.Bucket("Uploads");

export const table = new sst.aws.Dynamo("TrackedChannels", {
  fields: {
    userId: "string",
    channelId: "string",
  },
  primaryIndex: { hashKey: "userId", rangeKey: "channelId" },
});
