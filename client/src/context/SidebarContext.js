import createDataContext from "./createDataContext";

const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

const sidebarReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isCollapsed: !state.isCollapsed };
    default:
      return state;
  }
};

const toggleSidebar = (dispatch) => () => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const { Provider, Context, useData } = createDataContext(
  sidebarReducer,
  { toggleSidebar },
  { isCollapsed: false }
);
