import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath, Navigate } from "react-router-dom";

import {
  getAllByDistrict,
  checkUnFinishShipping,
} from "../../../redux/slice/transport_order/transport.order.slice";
import transportOrderHelper from "../../../utils/handleTransportOrder";

import ROUTES from "../../../constants/ROUTES";
import notAuth from "../../../assets/log_in_image.png";

import Loading from "../../../components/common/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { check_un_finish_shipping, get_all_by_district } = useSelector(
    (state) => state.TransportOrder
  );

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const districtData = [
    { id: 1, name: "Quận Hải Châu", districtName: "quan-hai-chau" },
    { id: 2, name: "Quận Cẩm Lệ", districtName: "quan-cam-le" },
    { id: 3, name: "Quận Thanh Khê", districtName: "quan-thanh-khe" },
    { id: 4, name: "Quận Liên Chiểu", districtName: "quan-lien-chieu" },
    { id: 5, name: "Quận Ngũ Hành Sơn", districtName: "quan-ngu-hanh-son" },
    { id: 6, name: "Quận Sơn Trà", districtName: "quan-son-tra" },
    { id: 7, name: "Huyện Hòa Vang", districtName: "huyen-hoa-vang" },
    { id: 8, name: "Huyện Hoàng Sa", districtName: "huyen-hoang-sa" },
  ];

  useEffect(() => {
    if (userData) {
      dispatch(getAllByDistrict());
      dispatch(
        checkUnFinishShipping({
          shipperId: userData.id,
        })
      );
    }
  }, []);

  const handleRenderAllDistrict = () => {
    return districtData.map((item) => {
      return transportOrderHelper.countTransportOrderByDistrict(
        item?.name,
        get_all_by_district?.data,
        userData.id
      ) !== 0 ? (
        <Link
          key={item?.id}
          to={generatePath(ROUTES.DELIVERY.DISTRICT, {
            districtName: item?.districtName,
          })}
          className="w-full flex justify-center items-center"
        >
          <div className="group w-1/2 h-8 flex justify-center items-center border border-red-600 rounded-full hover:bg-red-600 hover:text-white px-1">
            <div className="flex-1 w-full flex justify-start items-center pl-16">
              <span className="font-medium">{item?.name}</span>
            </div>
            <div className="shrink-0 w-6 h-6 flex justify-center items-center bg-red-600 text-white rounded-full group-hover:bg-white group-hover:text-red-600 ">
              <span>
                {transportOrderHelper.countTransportOrderByDistrict(
                  item?.name,
                  get_all_by_district?.data,
                  userData.id
                )}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div key={item?.id} className="w-full flex justify-center items-center">
          <div className="group w-1/2 h-8 flex justify-center items-center border border-red-600 rounded-full hover:bg-red-600 hover:text-white px-1">
            <div className="flex-1 w-full flex justify-start items-center pl-16">
              <span className="font-medium">{item?.name}</span>
            </div>
            <div className="shrink-0 w-6 h-6 flex justify-center items-center bg-red-600 text-white rounded-full group-hover:bg-white group-hover:text-red-600 ">
              <span>
                {transportOrderHelper.countTransportOrderByDistrict(
                  item?.name,
                  get_all_by_district?.data,
                  userData.id
                )}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return get_all_by_district?.loading || check_un_finish_shipping?.loading ? (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-12 w-full">
        <Loading />
      </div>
    </div>
  ) : (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-1"></div>
      {userData ? (
        check_un_finish_shipping?.data?.length === 0 ? (
          <div className="col-span-10 w-full flex flex-col justify-start items-center gap-4 p-4">
            <div className="w-full flex justify-center items-center">
              <h2 className="font-semibold">List District in Da Nang City</h2>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="w-1/2 flex flex-col justify-start items-center gap-4">
                {handleRenderAllDistrict()}
              </div>
            </div>
          </div>
        ) : (
          <Navigate to={ROUTES.DELIVERY.ROUTE} />
        )
      ) : (
        <div className="col-span-10 w-full flex justify-center items-center">
          <div className="w-full">
            <img
              src={notAuth}
              alt=""
              className="w-full h-without-header-6-rem object-cover"
            />
          </div>
        </div>
      )}
      <div className="col-span-1"></div>
    </div>
  );
};

export default Home;
