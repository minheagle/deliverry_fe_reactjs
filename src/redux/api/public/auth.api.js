import axios from "../axiosInstance";

const register = async (formRegister) => {
  try {
    const response = await axios.post("/auth/register", formRegister, {
      method: "post",
    });
    return response.results;
  } catch (error) {
    const { data } = error.response;
    const errors = data?.map((item) => {
      return {
        field: item.field,
        message: item.defaultMessage,
      };
    });
    throw errors;
  }
};

const login = async (formLogin) => {
  try {
    const response = await axios.post("/auth/login", formLogin, {
      withCredentials: true,
      method: "post",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserInfo = async (userNameToken) => {
  try {
    const response = await axios.get(`/auth/${userNameToken}`, {
      withCredentials: true,
      method: "get",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const authApi = { login, register, getUserInfo, logout };

export default authApi;
