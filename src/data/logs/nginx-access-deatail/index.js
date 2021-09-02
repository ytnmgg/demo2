import axios from "axios";

export default function get_nginx_access_detail(params, callback) {
  axios
    .get("/host/log/nginx/list.json", {
      params: params,
      timeout: 10000,
    })
    .then(
      (response) => {
        callback(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
}
