import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  timeout: 3 * 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// handle before send to server !!!
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

//  handle before return for client
axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  }
  //   async (err) => {
  //     console.log(err);
  //     const originalConfig = err.config;

  //     if (originalConfig.url !== "/Auth/auth.php" && err.response) {
  //       // Access Token was expired
  //       if (err.response.status === 401 && !originalConfig._retry) {
  //         originalConfig._retry = true;

  //         try {
  //           const rs = await axiosInstance.post("/Auth/refreshToken.php", {
  //             refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
  //           });

  //           const { accessToken } = rs.data;

  //           dispatch(
  //             getRefreshToken({
  //               accessToken: accessToken,
  //             })
  //           );
  //           localStorage.setItem("accessToken", JSON.stringify(accessToken));

  //           return axiosInstance(originalConfig);
  //         } catch (_error) {
  //           return Promise.reject(_error);
  //         }
  //       }
  //     }

  //     return Promise.reject(err);
  //   }
);

export default axiosInstance;
