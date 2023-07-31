import React from "react";
import { useGetCategoriesQuery } from "../Features/Api/apiSlice";
import Error from "./Error";
import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const userId = useSelector((store) => store.auth.id);
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoriesQuery(userId);
  let categoryList;
  if (isLoading) {
    categoryList = <p>Loading</p>;
  } else if (isSuccess) {
    categoryList = categories;
  } else if (isError) {
    categoryList = <Error />;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full  md:w-2/3">
        {" "}
        {isSuccess ? (
          categoryList.map((category) => (
            <CategoryCard key={category.categoryId} category={category} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
