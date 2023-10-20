const checkRole = (role, roles = []) => {
  let isCheck = false;
  roles?.forEach((element) => {
    if (element?.name === role || element?.authority === role) {
      isCheck = true;
    }
  });
  return isCheck;
};

const convertRole = (roles = []) => {
  const newRoles = roles.map((item) => {
    return {
      name: item?.authority,
    };
  });
  return newRoles;
};

const roleHelper = { checkRole, convertRole };

export default roleHelper;
