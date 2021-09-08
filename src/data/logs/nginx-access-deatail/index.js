import { get } from "../../request";

export default function get_nginx_access_detail(params) {
  return get("/host/log/nginx/list.json", params);
}
