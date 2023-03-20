import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddAuthor = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.BookSlice);

  const onAddBookSubmit = useCallback((e) => {
    e.preventDefault();

    const current = e.currentTarget;

    dispatch();
  });
  return <div>AddAuthor</div>;
};

export default AddAuthor;
