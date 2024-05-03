import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, Typography, Pagination, Stack } from '@mui/material';
import Navbar from '../components/Navbar';
import PostCard from "../components/PostCard"

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getPaginatedProducts?page=${currentPage}`);
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

return (
    <>
        <Navbar />
        <Container maxWidth="lg" className='mt-5'>
            <Typography variant="h3" fontWeight="bold" className='mt-10' gutterBottom>
                Products
            </Typography>
            <Grid container spacing={2}>
                {products && products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                         <PostCard product={product}/>
                    </Grid>
                ))}
            </Grid>
            <Stack className='mt-10' spacing={2} sx={{ alignItems: 'center' }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Stack>
        </Container>
    </>
);
};

export default Products;
