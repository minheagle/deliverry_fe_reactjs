import axios from "../axiosInstance";

const getAllByDistrict = async () => {
  try {
    const response = await axios.get("/transport");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmShip = async (shipperId, deliveryInformationList) => {
  try {
    const response = await axios.patch(
      `/transport/shipper/${shipperId}/shipping`,
      deliveryInformationList
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoute = async (deliveryAddressList) => {
  try {
    const response = await axios.post("/transport/route", deliveryAddressList);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkUnFinishShipping = async (shipperId) => {
  try {
    const response = await axios.get(
      `/transport/shipper/${shipperId}/unfinished`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changeStatusShipping = async (dInforId, changeStatusRequest) => {
  try {
    const response = await axios.patch(
      `/transport/shipping/${dInforId}/status`,
      changeStatusRequest
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const transportOrderApi = {
  getAllByDistrict,
  confirmShip,
  getRoute,
  checkUnFinishShipping,
  changeStatusShipping,
};

export default transportOrderApi;
