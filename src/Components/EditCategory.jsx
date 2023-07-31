import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../Features/Api/apiSlice";
import { toast } from "react-toastify";

const EditCategory = ({ isOpen, onClose, category }) => {
  const [editCategory] = useEditCategoryMutation();
  const [categoryName, setCategoryName] = useState(category.name);

  const handleEditCategory = (e) => {
    e.preventDefault();
    const _category = {
      name: categoryName,
      categoryId: category.categoryId,
    };
    try {
      editCategory(_category);
      onClose();
    } catch {
      toast.error("Failed to edit Category, Please try again");
    }
  };

  if (!isOpen) return null;
  return (
    <div
      id="EditCategoryModal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target.id == "EditCategoryModal") {
          onClose();
        }
      }}
    >
      <div className="bg-gray-800  xl:w-1/3 md:w-1/2 w-11/12 p-8 rounded shadow-lg  rounded customScrollbar mt-16">
        <h2 className="text-xl font-bold mb-4 text-white">
          EditCategory : {category.name}
        </h2>
        <form onSubmit={handleEditCategory} className="pt-6 space-y-4  m-auto">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-white"
            >
              Category Name
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="categoryName"
              name="categoryName"
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Category name"
            />
          </div>

          <div className="flex justify-end gap-1">
            <button
              type="submit"
              className=" group relative w-1/3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button className=" group relative w-1/3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
