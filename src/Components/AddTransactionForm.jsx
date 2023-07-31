import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  usePostTransactionMutation,
} from "../Features/Api/apiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTransactionForm = () => {
  const userId = useSelector((store) => store.auth.id);
  const categories = useGetCategoriesQuery(userId);
  const [postTransaction] = usePostTransactionMutation();

  const [transactionName, setTransactionName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      name: transactionName,
      description: description,
      date: date,
      categoryId: category,
      amount: amount,
      userId: userId,
    };
    postTransaction(transaction);
    setTransactionName("");
    setDescription("");
    setCategory("");
    setDate("");
    setAmount(0);
  };

  return (
    <form
      onSubmit={handleAddTransaction}
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
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-850 bg-gray-900"
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
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-850 bg-gray-900"
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
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-850 bg-gray-900"
        >
          <option value="">Select a category</option>
          {categories.isLoading ? (
            <>loading</>
          ) : categories.isSuccess ? (
            categories.data.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))
          ) : (
            <></>
          )}

          {/* Add more categories as needed */}
        </select>
      </div>
      <div style={{ marginTop: "15px" }}>
        <label htmlFor="date" className="block text-sm font-medium text-white">
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
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-850 bg-gray-900"
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
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-850 bg-gray-900"
          placeholder="Amount"
        />
      </div>
      <div>
        <button
          type="submit"
          style={{ width: "100%" }}
          className="group relative w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
};
export default AddTransactionForm;
