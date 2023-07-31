import React from "react";
import { useDeleteCategoryMutation } from "../Features/Api/apiSlice";
import { toast } from "react-toastify";

const DeleteCategory = ({ isOpen, onClose, category }) => {
  const [DeleteCategory] = useDeleteCategoryMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    try {
      DeleteCategory(category?.categoryId);
      onClose();
    } catch {
      toast.error("Category Delete Failed, please Try Again");
    }
  };
  if (!isOpen) return null;
  return (
    <div
      id="DeleteModal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target.id == "DeleteModal") {
          onClose();
        }
      }}
    >
      <div className="bg-gray-800  xl:w-1/3 md:w-1/2 w-11/12 p-8 rounded shadow-lg overflow-auto rounded customScrollbar mt-16">
        <h2 className="text-xl font-bold mb-4 text-white">
          Are you sure You're deleting Category : {category.name}
        </h2>
        <form onSubmit={handleDelete}>
          <div className="flex flex-wrap justify-end gap-1">
            <button
              type="submit"
              className="group relative w-5/12 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="group relative w-5/12 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteCategory;
