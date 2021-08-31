import axios from "axios";

export default function list_containers(params, callback) {
  axios.get("/docker/container/list.json").then(
    (response) => {
        callback(response.data)
    },
    (error) => {
      console.log(error);
    }
  );
}
