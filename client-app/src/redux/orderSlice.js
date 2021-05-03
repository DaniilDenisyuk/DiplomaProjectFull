const initialState = {
  isLoading: false,
  items: [],
  sum: 0,
};

export const orderConstants = {
  addItem: "order/addItem",
  changeCount: "order/changeCount",
  deleteItem: "order/deleteItem",
};

const addItem = (item) => ({
  type: orderConstants.addItem,
  item,
});

const removeItem = (itemId) => ({
  type: orderConstants.addItem,
  itemId,
});

const changeCount = (itemId, newCount) => ({
  type: orderConstants.addItem,
  itemId,
  newCount,
});

export const orderActions = {
  addItem,
  removeItem,
  changeCount,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.addItem: {
      const { item } = action;
      //add duplicates
      const { items, sum } = state;
      const newSum = sum + item.price;
      items.concat({ item, count: 1 }).filter((item, index, itemsArr) => {
        const originalIndex = itemsArr.findIndex((obj) => obj.id === item.id);
        if (originalIndex === index) {
          return true;
        }
        itemsArr[originalIndex].count += 1;
        return false;
      });
      return {
        items,
        sum: newSum,
      };
    }
    case orderConstants.removeItem: {
      const { itemId } = action;
      const { items, sum } = state;
      let newSum = sum;
      const index = items.findIndex((item) => item.id === itemId);
      if (index >= 0) {
        newSum -= items.splice(index, 1)[0].price;
      }
      return {
        items,
        sum: newSum,
      };
    }
    case orderConstants.changeCount: {
      const { itemId, newCount } = action;
      const { items, sum } = state;
      let newSum = sum;
      const index = items.findIndex((item) => item.id === itemId);
      if (index >= 0) {
        const price = items[index].price;
        const count = items[index].count;
        const diff = newCount - count;
        newSum += price * diff;
        items[index].count = newCount;
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
