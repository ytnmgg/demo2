import { get } from "../../request";

export default function list_redis(params) {
  return get("/redis/list.json", params);
}