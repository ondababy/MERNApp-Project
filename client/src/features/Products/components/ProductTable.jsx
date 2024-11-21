import { ActionButtons, Table } from "@common";
import { Checkbox } from "@common/components/ui/checkbox";
import { confirmDelete, DataTable } from "@custom";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productApi } from "../product.api";
import ProductWrapper from "./ProductWrapper";

const makeData = (products, handleDelete, toggleExpand) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    stock: `${product.stock}`,
    price: `${product.price}`,
    details: product.details, // for expandable rows
    image: product.image,
    actions: { id: product.id, handleDelete },
    isExpanded: false, // for controlling row expansion
    ...product,
    toggleExpand,
  }));
};

const makeColumns = (navigate, toggleExpand) => [
  // CHECKBOX
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
  },
  // IMAGE COLUMN
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <img src={row.getValue("image")} alt="Product" className="w-16 h-16" />,
    enableSorting: false,
  },
  // INTERACTIVE COLUMNS
  ...["name", "stock", "price"].map((key) => ({
    accessorKey: key,
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="bg-transparent border-none btn-sm capitalize"
      >
        {key}
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <p className="px-3">{row.getValue(key)}</p>,
  })),
  // DETAILS EXPANSION
  {
    id: "expand",
    header: "Details",
    cell: ({ row }) => (
      <Button
        className="btn-sm"
        onClick={() => row.original.toggleExpand(row.original.id)}
      >
        {row.original.isExpanded ? "Collapse" : "Expand"}
      </Button>
    ),
    enableSorting: false,
  },
  // ACTIONS
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        onDelete={() => row.getValue("actions").handleDelete(row.getValue("actions").id)}
        onEdit={() => navigate(`/dashboard/products/${row.original.slug}/edit`)}
        onView={() => navigate(`/dashboard/products/${row.original.slug}/view`)}
      />
    ),
    enableSorting: false,
  },
];

const ProductTable = () => {
  const navigate = useNavigate();
  const { useGetProductsMutation, useDeleteProductMutation } = productApi;
  const [products, setProducts] = useState([]);
  const [getProducts, { isLoading, isError }] = useGetProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleExpand = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isExpanded: !p.isExpanded } : p))
    );
  };

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteProduct(id).unwrap();
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;
    confirmDelete(async () => {
      Promise.all(selectedRows.map((row) => deleteProduct(row.id).unwrap())).then(() => {
        setProducts(products.filter((product) => !selectedRows.some((row) => row.id === product.id)));
        setSelectedRows([]);
        toast.success("Selected products deleted successfully");
      });
    });
  };

  const table = {
    data: makeData(products, handleDelete, toggleExpand),
    columns: makeColumns(navigate, toggleExpand),
    rowCount: products.length,
    selectionFunc: (rows) => setSelectedRows(rows),
  }


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts().unwrap();
      setProducts(res.resource || []);
    };

    fetchProducts();
  }, [getProducts]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <ProductWrapper title="Products Table">
      <div className="mb-4 flex justify-end">
        <Button
          color="primary"
          className="mr-4"
          onClick={() => navigate("/dashboard/products/create")}
        >
          <FaPlus /> Add Product
        </Button>
        {
          selectedRows.length > 0 && (
            <Button
              color="error"
              onClick={handleBulkDelete}
            >
              <FaTrash /> Delete Selected
            </Button>
          )
        }
      </div>
      <DataTable {...table} />
    </ProductWrapper>
  );
};

export default ProductTable;
