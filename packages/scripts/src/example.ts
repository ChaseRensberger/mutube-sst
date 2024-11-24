import { Resource } from "sst";
import { Example } from "@mutube-sst/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
