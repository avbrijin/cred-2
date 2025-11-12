import axios from "axios";

const commonApi = async (method, url, reqBody) => {
  let config = {
    method: method,
    url: url,
    data: reqBody,
  };
  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export default commonApi;
