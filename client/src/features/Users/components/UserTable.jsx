import { ActionButtons, Table } from '@common';
import { PageTitle } from '@partials';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../user.api';

const allowedColumns = () => [
  { key: 'username', label: 'User' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: '' },
];

const UserTable = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { useGetUsersMutation, useDeleteUserMutation } = userApi;
  const [users, setUsers] = useState([]);
  const [getUsers, { isLoading, isError }] = useGetUsersMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      if (id === userInfo.id) {
        toast.warning('You cannot delete yourself');
        return;
      }
      await deleteUser(id).unwrap();
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers().unwrap();
      setUsers(res.resource || []);
    };

    return () => {
      try {
        fetchUsers();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getUsers]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  return (
    <div className="w-full h-full">
      <PageTitle title="Users Table" />
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Button
            color="primary"
            className="my-4"
            onClick={() => navigate('/dashboard/users/create')}
          >
            Create User
          </Button>
        </div>
        <Table
          data={users.map((user) => ({
            ...user,
            actions: (
              <ActionButtons
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(user.id)}
                onEdit={() => navigate(`/dashboard/users/${user.id}/edit`)}
                onView={() => navigate(`/dashboard/users/${user.id}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </div>
    </div>
  );
};

export default UserTable;
