import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";
import menuReducer from "./menu.reducer";
import itemReducer from "./item.reducer";

export default function rootReducer(state = {}, action) {
  // always return a new object for the root state
  return {
    // the value of `state.todos` is whatever the todos reducer returns
    user: todosReducer(state.todos, action),
    // For both reducers, we only pass in their slice of the state
    filters: filtersReducer(state.filters, action),
  };
}
