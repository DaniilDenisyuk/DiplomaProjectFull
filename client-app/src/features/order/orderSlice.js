const initialState = {
  isLoading: false,
  items: [],
  sum: 0,
};

export const orderConstants = {
  addItem: "order/addItem",
  changeCount: "order/changeCount",
  removeItem: "order/removeItem",
};

const addItem = (item) => ({
  type: orderConstants.addItem,
  payload: { item },
});

const removeItem = (itemId) => ({
  type: orderConstants.removeItem,
  payload: { id: itemId },
});

const changeCount = (itemId, newCount) => ({
  type: orderConstants.changeCount,
  payload: { id: itemId, count: newCount },
});

export const orderActions = {
  addItem,
  removeItem,
  changeCount,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.addItem: {
      const { item } = action.payload;
      let { items, sum } = state;
      sum += parseInt(item.price, 10);
      const index = items.findIndex((obj) => obj.id === item.id);
      if (index >= 0) {
        items[index].count += 1;
      } else {
        items = items.concat({ ...item, count: 1 });
      }
      return {
        items,
        sum,
      };
    }
    case orderConstants.removeItem: {
      const { id } = action.payload;
      const { items, sum } = state;
      let newSum = sum;
      const index = items.findIndex((item) => item.id === id);
      if (index >= 0) {
        const deleted = items.splice(index, 1)[0];
        newSum -= parseInt(deleted.price * deleted.count);
      }
      return {
        items,
        sum: newSum,
      };
    }
    case orderConstants.changeCount: {
      const { id, count } = action.payload;
      const { items, sum } = state;
      let newSum = sum;
      const index = items.findIndex((item) => item.id === id);
      if (index >= 0) {
        const price = parseInt(items[index].price);
        const oldCount = items[index].count;
        newSum += price * (count - oldCount);
        items[index].count = count;
      }
      return {
        items,
        sum: newSum,
      };
    }
    default:
      return state;
  }
};
