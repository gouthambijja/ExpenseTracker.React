import CreateRefreshToken from "./RefreshToken";
import { axiosPrivate } from "../Api/Axios";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};
const AxiosPrivate = () => {
  const refresh = CreateRefreshToken();
  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseIntercept = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (
        (error?.response?.status == 401 ||
          error?.response?.status == 402 ||
          error?.response?.status == 403) &&
        !prevRequest?.sent
      ) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};

export default AxiosPrivate;
