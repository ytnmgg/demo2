import { get } from "../../request";

export default function get_actuator_health(params) {
  return get("/actuator/health", params,{timeout: 60000});
}
