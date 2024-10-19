import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { transactionApi } from '../transaction.api';
import TransactionWrapper from './TransactionWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const TransactionTable = () => {
  const navigate = useNavigate();
  const { useGetTransactionsMutation, useDeleteTransactionMutation } = transactionApi;
  const [transactions, setTransactions] = useState([]);
  const [getTransactions, { isLoading, isError }] = useGetTransactionsMutation();
  const [deleteTransaction, { isLoading: isDeleting }] = useDeleteTransactionMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteTransaction(id).unwrap();
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
        toast.success('Transaction deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await getTransactions().unwrap();
      setTransactions(res.resource || []);
    };

    return () => {
      try {
        fetchTransactions();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getTransactions]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading transactions</div>;
  if (!transactions.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/transactions/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <TransactionWrapper title="Transactions Table">
        <Table
          data={transactions.map((transaction) => ({
            ...transaction,
            actions: (
              <ActionButtons
                key={'action_' + transaction.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(transaction.id)}
                onEdit={() => navigate(`/dashboard/transactions/${transaction.slug}/edit`)}
                onView={() => navigate(`/dashboard/transactions/${transaction.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </TransactionWrapper>
    </>
  );
};

export default TransactionTable;
