import { get } from "../../request";

export default function get_nginx_status(params) {
  return get("/host/log/nginx/status.json");
}
