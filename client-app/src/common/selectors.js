export const getToken = (store) => store.auth.jwt;
export const getIsLoggedIn = (store) => store.auth.isLoggedIn;
export const getUsername = (store) => store.auth.username;
export const getUserRole = (store) => store.auth.role;

export const getLocationName = (store) => store.location.name;

export const getLang = (store) => store.lang;

export const getMenuItems = (store) => store.menu.items;
export const getMenuItemsIdAndCategory = (store) =>
  store.menu.itemsIdAndCategory;
export const getMenuItem = (id) => (store) => {
  const items = getMenuItems(store);
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    return items[index];
  }
};

export const getOrderItems = (store) => store.order.items;
export const getOrderItemsId = (store) => store.order.itemsId;
export const getOrderAdds = (store) => store.order.adds;
export const getOrderAddsId = (store) => store.order.addsId;
export const getOrderAdd = (id) => (store) => {
  const items = getOrderAdds(store);
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    return items[index];
  }
};
export const getOrderItem = (id) => (store) => {
  const items = store.order.items;
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    return items[index];
  }
};
export const getOrderItemsSum = (store) => store.order.itemsSum;
export const getOrderAddsSum = (store) => store.order.addsSum;
export const getOrderOverallSum = (store) => store.order.overallSum;
export const getOrderItemCount = (id) => (store) => {
  const items = getOrderItems(store);
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    return items[index].count;
  }
};

export const getUserAddress = (store) => {
  const { town, street, house, door } = store.user.info;
  return { town, street, house, door };
};
export const getUserFullAddress = (store) => {
  const { town, street, house, door } = store.user.info;
  return [town, street, house, door].filter((item) => !!item).join(", ");
};
export const getUserEmail = (store) => store.user.info.email;
export const getUserFirstName = (store) => store.user.info.first_name;
export const getUserLastName = (store) => store.user.info.last_name;
export const getUserPhone = (store) => store.user.info.phone;
export const getOrderHistory = (store) => store.user.orderHistory;
