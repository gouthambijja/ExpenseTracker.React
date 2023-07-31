import React from "react";
import {
  useGetCategoriesQuery,
  useGetTransactionsQuery,
} from "../Features/Api/apiSlice";
import Error from "./Error";
import store from "../App/store";
import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";

const TransactionsList = () => {
  const userId = useSelector((store) => store.auth.id);
  const categories = useGetCategoriesQuery(userId);
  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
  } = useGetTransactionsQuery(userId);
  let transactionList;
  if (isLoading) {
    transactionList = <p>Loading</p>;
  } else if (isSuccess) {
    transactionList = transactions;
  } else if (isError) {
    transactionList = <Error />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 w-full">
      {isSuccess ? (
        transactionList.map((transaction) => (
          <TransactionCard
            key={transaction.transactionId}
            transaction={transaction}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default TransactionsList;
