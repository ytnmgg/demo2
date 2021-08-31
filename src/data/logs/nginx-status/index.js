import axios from "axios";


export default function get_nginx_status(params, callback) {
  axios.get("/host/log/nginx/status.json").then(
    (response) => {
        callback(response.data)
    },
    (error) => {
      console.log(error);
    }
  );
}