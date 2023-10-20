const countTransportOrderByDistrict = (districtName, data = [], shipperId) => {
  const findByDistrict = data.find(
    (item) => item.districtName === districtName
  );
  let count = 0;
  if (findByDistrict?.deliveryInformationList) {
    const newList = filterList(
      findByDistrict.deliveryInformationList,
      shipperId
    );

    count = newList.length;
  }
  return count;
};

const convertShipAddress = (data = [], shipperId) => {
  const listAddress = [];
  data.forEach((item) => {
    item?.deliveryInformationList?.forEach((delivery) => {
      if (delivery?.shipperId === shipperId) {
        listAddress.push(delivery?.deliveryAddress);
      }
    });
  });
  return listAddress;
};

const filterList = (data = [], shipperId) => {
  return data.filter(
    (item) => item.shipperId === null || item.shipperId !== shipperId
  );
};

const getAllByDistrict = (districtName, data = []) => {
  const findByDistrict = data.find(
    (item) => item.districtName === findDistrictName(districtData, districtName)
  );
  let list = [];
  if (findByDistrict) {
    list = findByDistrict?.deliveryInformationList;
  }
  return list;
};

const findDistrictName = (listDistrict = [], districtName) => {
  const find = listDistrict.find((item) => item.districtName === districtName);
  if (find) {
    return find.name;
  }
  return null;
};

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

const handleGetTotalPriceProducts = (data = []) => {
  let total = 0;
  data.forEach((item) => {
    total += item?.quantity + item?.unitPrice;
  });
  return total;
};

const transportOrderHelper = {
  countTransportOrderByDistrict,
  getAllByDistrict,
  handleGetTotalPriceProducts,
  convertShipAddress,
};

export default transportOrderHelper;
