import React, { useState } from "react";
import { toast } from "react-toastify";
import { usePostCategoryMutation } from "../Features/Api/apiSlice";
import { useSelector } from "react-redux";

const AddCategory = () => {
  const userId = useSelector((store) => store.auth.id);
  const [categoryName, setCategoryName] = useState("");
  const [addCategory] = usePostCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      addCategory({ name: categoryName, userId: userId });
      setCategoryName("");
    } catch {
      toast.error("Failed to add Category, Please try again");
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-2/3">
        <div className="">
          <form onSubmit={handleAddCategory} className="pt-6 space-y-4  m-auto">
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

            <div className="flex justify-end">
              <button
                type="submit"
                className=" group relative w-1/3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AddCategory;
