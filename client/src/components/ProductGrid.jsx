import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditProduct from './EditProduct';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductsGrid = () => {
    const [products, setProducts] = useState([]);
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState();
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterValue, setFilterValue] = useState('');
    const [userData, setUserRole] = useState(JSON.parse(localStorage.getItem('userData')));
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [Refresh, setRefresh] = useState(true)

    useEffect(() => {
        fetchData();
    }, [pageSize, currentPage, sortOrder, sortField, Refresh, filterValue]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getDataGridProducts`, {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                    sortField: sortField,
                    sortOrder: sortOrder,
                    filter: filterValue
                },
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setProducts(response.data.products);
            setTotalProducts(response.data.totalProducts)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handlePageDataChange = (pageData) => {
        console.log("handlePageDataChange ~ pageData:", pageData)
        setCurrentPage(pageData.page + 1);
        setPageSize(pageData.pageSize);
    };

    const handleColumnHeaderClick = (field) => {
        if (field === sortField) {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
            setSortOrder(newSortOrder);
        }

        if (field !== sortField) {
            setSortOrder('asc');
            setSortField(field);
        }
    };

    const handleApproval = async (_id, isApproved) => {
        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/products/toggleApproval`, {
                isApproved: !isApproved,
                _id,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setRefresh((p) => !p)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (_id) => {
        setProductIdToDelete(_id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async (_id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/products/softDelete`, {
                _id,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setRefresh((p) => !p)
            setDeleteDialogOpen(false)
        } catch (error) {
            console.log('Error toggling soft delete status:', error);
        }
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
        setEditDialogOpen(true);
    };

    const handleActive = async (_id, isActive) => {
        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/products/toggleActive`, {
                isActive: !isActive,
                _id,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setRefresh((p) => !p)
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilterChange = (data) => {
        const filterValue = data.items[0].value?.toLowerCase();
        if(filterValue){
            setFilterValue(filterValue)
            setSortField(data.items[0].value?.field)
        } else {
            setFilterValue(filterValue)
            setSortField('name')
        }
    }

    const renderActionButtons = (params) => {
        const { _id, isApproved, isActive } = params.row;

        const activeButton = (
            <Button
                variant={isActive ? "outlined" : "contained"}
                color={isActive ? "success" : undefined}
                sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    backgroundColor: isActive ? "" : "#60b158"
                }}
                onClick={() => handleActive(_id, isActive)}
            >
                {isActive ? "Activated" : "Activate"}
            </Button>
        );


        const approveButton = (
            <Button
                variant="contained"
                sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    backgroundColor: `${isApproved ? "#ff6961" : "#60b158"}`
                }}
                onClick={() => handleApproval(_id, isApproved)}
            >
                {isApproved ? "Disapprove" : "Approve"}
            </Button>
        );

        const editButton = (
            <Button variant="contained" sx={{ fontSize: "10px", fontWeight: "bold", backgroundColor: "#007aff" }} onClick={() => handleEdit(params.row)}>
                Edit
            </Button>
        );
        const deleteButton = (
            <Button variant="contained" startIcon={<DeleteIcon fontSize="inherit" />} sx={{ fontSize: "10px", fontWeight: "bold", backgroundColor: "#ff6961" }} onClick={() => handleDelete(_id)}>
                Delete
            </Button>
        );
        if (userData.role === 'admin') {
            return (
                <Stack direction="row" alignItems="center" justifyContent="center" width="100%" height={"100%"} spacing={1}>
                    {activeButton}
                    {approveButton}
                    {editButton}
                    {deleteButton}
                </Stack>
            );
        } else if (userData.role === 'seller') {
            return (
                <Stack direction="row" alignItems="center" justifyContent="center" width="100%" height={"100%"} spacing={1}>
                    {activeButton}
                    {editButton}
                    {deleteButton}
                </Stack>
            );
        }
    };


    const columns = [
        { field: 'sellerName', headerName: 'Seller', width: 150 },
        { field: 'name', headerName: 'Product Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'documentId', headerName: 'Document Id', width: 225 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 350,
            renderCell: renderActionButtons
        }
    ];

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                // disableColumnSelector
                autoHeight
                rows={products}
                columns={columns}
                rowCount={totalProducts}
                pageSizeOptions={[10, 20]}
                pagination
                initialState={{
                    pagination: {
                        paginationModel: { page: currentPage - 1, pageSize: pageSize },
                    },
                }}
                paginationMode="server"
                getRowId={(row) => row._id}
                onPaginationModelChange={handlePageDataChange}
                onColumnHeaderClick={(column) => handleColumnHeaderClick(column.field)}
                onFilterModelChange={handleFilterChange}
            />
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} TransitionComponent={Transition} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} variant="contained" color="error">
                        Cancel
                    </Button>
                    <Button onClick={() => handleConfirmDelete(productIdToDelete)} variant="contained" color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {editDialogOpen && <EditProduct product={productToEdit} open={editDialogOpen} onClose={() => setEditDialogOpen(false)} userToken={userToken} Refresh={() => setRefresh((p) => !p)} />}
        </div>
    );
};

export default ProductsGrid;
