import { post } from "../../request";

export default function remove_redis(params) {
  return post("/redis/remove.json", params);
}