import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import TransactionsList from "./TransactionsList";

const Transactions = () => {
  return (
    <div className="relative">
      <div className="customScrollbar bg-gray-850 sm-container-height  sm:absolute relative t-0  xs:w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-7 sm:h-full overflow-auto">
        <AddTransactionForm />
      </div>
      <div className=" relative bg-gray-900 sm-strict-container-height text-white p-12 overflow-auto customScrollbar md:left-1/3  sm:left-1/2 xl:left-1/4 xl:w-3/4 sm:w-1/2 md:w-2/3 w-full">
        <TransactionsList />
      </div>
    </div>
  );
};

export default Transactions;
