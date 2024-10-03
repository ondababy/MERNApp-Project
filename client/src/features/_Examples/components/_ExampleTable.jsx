import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { _exampleApi } from '../_example.api';
import _ExampleWrapper from './_ExampleWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const _ExampleTable = () => {
  const navigate = useNavigate();
  const { useGet_ExamplesMutation, useDelete_ExampleMutation } = _exampleApi;
  const [_examples, set_Examples] = useState([]);
  const [get_Examples, { isLoading, isError }] = useGet_ExamplesMutation();
  const [delete_Example, { isLoading: isDeleting }] = useDelete_ExampleMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await delete_Example(id).unwrap();
        set_Examples(_examples.filter((_example) => _example.id !== id));
        toast.success('_Example deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetch_Examples = async () => {
      const res = await get_Examples().unwrap();
      set_Examples(res.resource || []);
    };

    return () => {
      try {
        fetch_Examples();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [get_Examples]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading _examples</div>;
  if (!_examples.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/_examples/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <_ExampleWrapper title="_Examples Table">
        <Table
          data={_examples.map((_example) => ({
            ..._example,
            actions: (
              <ActionButtons
                key={'action_' + _example.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(_example.id)}
                onEdit={() => navigate(`/dashboard/_examples/${_example.slug}/edit`)}
                onView={() => navigate(`/dashboard/_examples/${_example.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </_ExampleWrapper>
    </>
  );
};

export default _ExampleTable;
