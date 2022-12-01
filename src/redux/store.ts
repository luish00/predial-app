import { configureStore } from '@reduxjs/toolkit';

import accountDetailsReducer from './slices/accountDetailsSlice';

export const store = configureStore({
  reducer: {
    accountDetails: accountDetailsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
