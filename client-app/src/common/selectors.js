export const getToken = (store) => store.auth.jwt;
export const getIsLoggedIn = (store) => store.auth.isLoggedIn;
export const getUsername = (store) => store.auth.username;

export const getLocationName = (store) => store.location.name;

export const getLang = (store) => store.lang;

export const getMenuItems = (store) => store.menu.items;
export const getMenuItem = (id) => (store) => {
  const items = getMenuItems(store);
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    return items[index];
  }
};

export const getOrderItems = (store) => store.order.items;
export const getOrderSum = (store) => store.order.sum;
export const getOrderItemCount = (id) => (store) => {
  const items = getOrderItems(store);
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    return items[index].count;
  }
};
