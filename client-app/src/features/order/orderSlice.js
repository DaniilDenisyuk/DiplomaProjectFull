import { menuService } from "../../services/menuService";

const initialState = {
  isLoading: false,
  items: [],
  itemsId: [],
  adds: [
    { id: 0, name: "Додатковий соєвий соус", price: "10", count: 0 },
    { id: 1, name: "Додатковий набір паличок", price: "4", count: 0 },
    { id: 2, name: "Додатковий імбир", price: "12", count: 0 },
  ],
  addsId: [0, 1, 2],
  itemsSum: 0,
  addsSum: 0,
  overallSum: 0,
};

export const orderConstants = {
  addItem: "order/addItem",
  changeCount: "order/changeCount",
  removeItem: "order/removeItem",
  addAuxItems: "order/addAuxItems",
  changeAuxCount: "order/changeAuxCount",
};

const getAdds = () => (dispatch) => {
  menuService.getOrderAdds().then((items) => {
    return dispatch({
      type: orderConstants.addAuxItems,
      payload: { items },
    });
  });
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

const changeAddsCount = (itemId, newCount) => ({
  type: orderConstants.changeAuxCount,
  payload: { id: itemId, count: newCount },
});

export const orderActions = {
  addItem,
  removeItem,
  changeCount,
  changeAddsCount,
  getAdds,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.addItem: {
      const { item } = action.payload;
      let { items, overallSum, itemsSum, itemsId } = state;
      overallSum -= itemsSum;
      itemsSum += parseInt(item.price, 10);
      overallSum += itemsSum;
      const index = items.findIndex((obj) => obj.id === item.id);
      if (index >= 0) {
        items[index].count += 1;
      } else {
        itemsId = itemsId.concat(item.id);
        items = items.concat({ ...item, count: 1 });
      }
      return {
        ...state,
        items,
        itemsId,
        itemsSum,
        overallSum,
      };
    }
    case orderConstants.removeItem: {
      const { id } = action.payload;
      let { items, overallSum, itemsSum, itemsId } = state;
      const index = items.findIndex((item) => item.id === id);
      if (index >= 0) {
        const deleted = items.splice(index, 1)[0];
        itemsId.splice(index, 1);
        itemsId = [...itemsId];
        const delta = parseInt(deleted.price * deleted.count);
        overallSum -= delta;
        itemsSum -= delta;
      }
      return {
        ...state,
        items,
        itemsId,
        overallSum,
        itemsSum,
      };
    }
    case orderConstants.changeCount: {
      const { id, count } = action.payload;
      let { items, overallSum, itemsSum } = state;
      const index = items.findIndex((item) => item.id === id);
      if (index >= 0) {
        const element = items[index];
        const price = parseInt(element.price);
        const oldCount = element.count;
        const delta = price * (count - oldCount);
        element.count = count;
        itemsSum += delta;
        overallSum += delta;
        items[index] = { ...element };
      }
      return {
        ...state,
        items,
        itemsSum,
        overallSum,
      };
    }
    case orderConstants.changeAuxCount: {
      const { id, count } = action.payload;
      let { adds, overallSum, addsSum } = state;
      const index = adds.findIndex((item) => item.id === id);
      if (index >= 0) {
        const element = adds[index];
        const price = parseInt(element.price);
        const oldCount = element.count;
        const delta = price * (count - oldCount);
        addsSum += delta;
        overallSum += delta;
        element.count = count;
        adds[index] = { ...element };
      }
      return {
        ...state,
        adds,
        addsSum,
        overallSum,
      };
    }
    default:
      return state;
  }
};
