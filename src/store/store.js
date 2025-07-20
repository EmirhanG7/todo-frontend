import {configureStore} from "@reduxjs/toolkit";
import {todoApi} from "./todo.js";
import {userApi} from "./user.js";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(todoApi.middleware)
    .concat(userApi.middleware)
})
setupListeners(store.dispatch)