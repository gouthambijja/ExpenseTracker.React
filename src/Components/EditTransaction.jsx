import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useEditTransactionMutation,
  useGetCategoriesQuery,
} from "../Features/Api/apiSlice";
import { toast } from "react-toastify";

const EditTransaction = ({ isOpen, onClose, transaction }) => {
  const userId = useSelector((store) => store.auth.id);
  const categories = useGetCategoriesQuery(userId);
  const [editTransaction] = useEditTransactionMutation();

  const [transactionName, setTransactionName] = useState(transaction.name);
  const [description, setDescription] = useState(transaction.description);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [amount, setAmount] = useState(transaction.amount);

  const handleEditTransaction = (e) => {
    e.preventDefault();
    const _transaction = {
      name: transactionName,
      description: description,
      date: date,
      categoryId: category,
      amount: amount,
      transactionId: transaction.transactionId,
    };
    try {
      editTransaction(_transaction);
      onClose();
    } catch {
      toast.error("Failed to edit Transaction, Please try again");
    }
  };

  if (!isOpen) return null;
  return (
    <div
      id="modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target.id == "modal") {
          onClose();
        }
      }}
    >
      <div className="bg-gray-800  xl:w-1/3 md:w-1/2 w-11/12 p-8 rounded shadow-lg h-3/4 overflow-auto rounded customScrollbar mt-16">
        <h2 className="text-xl font-bold mb-4">
          EditTransaction : {transaction.name}
        </h2>
        <form
          onSubmit={handleEditTransaction}
          className="pt-10 space-y-6 max-w-md m-auto"
        >
          <div>
            <label
              htmlFor="transactionName"
              className="block text-sm font-medium text-white"
            >
              Transaction Name
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="transactionName"
              name="transactionName"
              type="text"
              required
              value={transactionName}
              onChange={(e) => setTransactionName(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Transaction name"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="description"
              name="description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Description"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white"
            >
              Category
            </label>
            <select
              style={{ marginTop: "10px" }}
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
            >
              <option value="">Select a category</option>
              {categories.isLoading ? (
                <>loading</>
              ) : categories.isSuccess ? (
                categories.data.map((category) => (
                  <option value={category.categoryId}>{category.name}</option>
                ))
              ) : (
                <></>
              )}

              {/* Add more categories as needed */}
            </select>
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-white"
            >
              Date
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="date"
              name="date"
              type="datetime-local"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-white"
            >
              Amount
            </label>
            <input
              style={{ marginTop: "10px" }}
              id="amount"
              name="amount"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Amount"
            />
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            <button
              type="submit"
              className="group relative w-5/12 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              save
            </button>
            <button
              onClick={onClose}
              className="group relative w-5/12 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
