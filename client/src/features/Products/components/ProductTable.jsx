import { ActionButtons, Table } from '@common';
import { Checkbox } from "@common/components/ui/checkbox";
import { confirmDelete, DataTable } from '@custom';
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../product.api';
import ProductWrapper from './ProductWrapper';

const makeData = (products, handleDelete) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    stock: `${product.stock}`,
    price: `${product.price}`,
    actions: { id: product.id, handleDelete, slug: product.slug },
  }));
};

const makeColumns = (navigate) => {
  const interactiveColumns = ["name", "stock", "price"].map((key) => {
    return {
      accessorKey: key,
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className='bg-transparent border-none btn-sm capitalize'
          >
            {key}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <p className='break-all px-3'>{row.getValue(key)}</p>,
    }
  });
  return [
    // CHECKBOX
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // MINI IMAGE
    {
      accessorKey: 'image',
      header: 'Image',
      cell: <>image here</>,
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,

    },
    ...interactiveColumns,
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButtons
          onDelete={() => row.getValue('actions').handleDelete(row.getValue('actions').id)}
          onEdit={() => navigate(`/dashboard/products/${row.getValue('actions').slug}/edit`)}
          onView={() => navigate(`/dashboard/products/${row.getValue('actions').slug}/view`)}
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
    }
  ]
};

const ProductTable = () => {
  // ###################################################################################
  const navigate = useNavigate();
  const { useGetProductsMutation, useDeleteProductMutation } = productApi;
  const [products, setProducts] = useState([]);
  const [getProducts, { isLoading, isError }] = useGetProductsMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  // ###################################################################################

  // ###################################################################################
  // TABLE OPTIONS
  const [table, setTable] = useState({
    data: null,
    columns: null,
    rowCount: 0,
  })
  // ###################################################################################

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteProduct(id).unwrap();
        setProducts(products.filter((product) => product.id !== id));
        toast.success('Product deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts().unwrap();
      setProducts(res.resource || []);
    };

    return () => {
      try {
        fetchProducts();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getProducts]);

  useEffect(() => {
    setTable(prev => ({
      ...prev,
      data: makeData(products, handleDelete),
      columns: makeColumns(navigate),
      rowCount: products.length,
    }));
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;
  if (!products.length) {
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/products/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  }

  return (
    <>
      <ProductWrapper title="Products Table">
        <DataTable {...table} />
      </ProductWrapper>
    </>
  );
};

export default ProductTable;
