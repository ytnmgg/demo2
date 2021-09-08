import { get } from "../../request";

export default function list_containers(params) {
  return get("/docker/container/list.json", params);
}
