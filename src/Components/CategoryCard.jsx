import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryCard = ({ category }) => {
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const openEditCategoryModal = () => {
    setIsEditCategoryModalOpen(true);
  };

  const closeEditCategoryModal = () => {
    setIsEditCategoryModalOpen(false);
  };

  const openDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(true);
  };
  const closeDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(false);
  };
  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg flex justify-between mt-2">
      <h2 className="text-xl font-bold mb-2 text-white">{category.name}</h2>
      <div className="flex justify-between">
        <button
          className="text-indigo-600  flex hover:text-indigo-800 rounded  "
          onClick={openEditCategoryModal}
        >
          <PencilIcon className="h-6 w-6" />
        </button>
        <button
          className="text-red-600 flex hover:text-red-800 rounded "
          onClick={openDeleteCategoryModal}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
      <EditCategory
        isOpen={isEditCategoryModalOpen}
        onClose={closeEditCategoryModal}
        category={category}
      />
      <DeleteCategory
        isOpen={isDeleteCategoryModalOpen}
        onClose={closeDeleteCategoryModal}
        category={category}
      />
    </div>
  );
};

export default CategoryCard;
