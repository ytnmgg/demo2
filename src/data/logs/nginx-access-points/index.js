import { get } from "../../request";

export default function get_nginx_access_points(params) {
  return get("/host/log/nginx/listPoints.json", params);
}
