import { configureStore } from "@reduxjs/toolkit";
import metadataSlice from "./metadataSlice";
import playersSlice from "./playersSlice";

const store = configureStore({
  reducer: {
    metadata: metadataSlice,
    players: playersSlice,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
