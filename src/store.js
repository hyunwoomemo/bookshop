import { configureStore } from "@reduxjs/toolkit";
import AuthorSlice from "./slices/AuthorSlice";
import BookSlice from "./slices/BookSlice";
import CartSlice from "./slices/CartSlice";
import SellingSlice from './slices/SellingSlice'
import LikesSlice from './slices/LikesSlice'
import CategorySlice from './slices/CategorySlice'

const store = configureStore({
  // 개발자가 직접 작성한 Slice 오브젝트들이 명시되어야 한다.
  reducer: {
    BookSlice: BookSlice,
    AuthorSlice: AuthorSlice,
    CategorySlice: CategorySlice,
    SellingSlice: SellingSlice,
    LikesSlice: LikesSlice,
    CartSlice: CartSlice,
  }
});

export default store;