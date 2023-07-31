import React, { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import EditTransaction from "./EditTransaction";
import DeleteTransaction from "./DeleteModal";

const TransactionCard = ({ transaction }) => {
  const { name, description, category, date, amount } = transaction;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:basis-full basis-30 basis-45 w-full ">
      <h2 className="text-white text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-300 mb-2">{description}</p>
      <div className="flex items-center mb-2">
        <span className="text-sm text-white bg-indigo-600 rounded-full py-1 px-2 mr-2">
          {category}
        </span>
        <span className="text-gray-300 text-sm">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-white text-lg font-bold mb-2">₹{amount.toFixed(2)}</p>
      {/* Edit and Delete buttons */}
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="text-indigo-600  flex hover:text-indigo-800 rounded "
        >
          <PencilIcon className="h-6 w-6" /> {" Edit"}
        </button>
        <button
          onClick={openDeleteModal}
          className="text-red-600 flex hover:text-red-800 rounded "
        >
          <TrashIcon className="h-6 w-6" />
          {" Delete"}
        </button>
      </div>
      <EditTransaction
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={transaction}
      />
      <DeleteTransaction
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        transaction={transaction}
      />
    </div>
  );
};

export default TransactionCard;
