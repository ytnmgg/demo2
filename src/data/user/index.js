import { get } from "../request";

export default function list_users(params) {
  return get("/user/list.json", params);
}