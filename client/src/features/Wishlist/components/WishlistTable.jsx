import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { wishlistApi } from '../wishlist.api';
import WishlistWrapper from './WishlistWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const WishlistTable = () => {
  const navigate = useNavigate();
  const { useGetWishlistsMutation, useDeleteWishlistMutation } = wishlistApi;
  const [wishlists, setWishlists] = useState([]);
  const [getWishlists, { isLoading, isError }] = useGetWishlistsMutation();
  const [deleteWishlist, { isLoading: isDeleting }] = useDeleteWishlistMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteWishlist(id).unwrap();
        setWishlists(wishlists.filter((wishlist) => wishlist.id !== id));
        toast.success('Wishlist deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchWishlists = async () => {
      const res = await getWishlists().unwrap();
      setWishlists(res.resource || []);
    };

    return () => {
      try {
        fetchWishlists();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getWishlists]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading wishlists</div>;
  if (!wishlists.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/wishlists/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <WishlistWrapper title="Wishlists Table">
        <Table
          data={wishlists.map((wishlist) => ({
            ...wishlist,
            actions: (
              <ActionButtons
                key={'action_' + wishlist.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(wishlist.id)}
                onEdit={() => navigate(`/dashboard/wishlists/${wishlist.slug}/edit`)}
                onView={() => navigate(`/dashboard/wishlists/${wishlist.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </WishlistWrapper>
    </>
  );
};

export default WishlistTable;
