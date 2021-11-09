import { post } from "../../request";

export default function logout_from_sso(params) {
  return post("/logout.json", params,{timeout: 10000});
}