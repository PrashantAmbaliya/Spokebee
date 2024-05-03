import { useState, useEffect } from "react";
import { Grid, Typography, Container, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import PostCard from '../components/PostCard'

const ProductsSlider = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getPaginatedProducts?limit=4`);
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container maxWidth="lg" className='mt-5'>
            <Typography variant="h3" align="center" fontWeight={'bold'} gutterBottom>
                Explore Products
            </Typography>
            <Grid container spacing={2}>
                {products &&
                    products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={3}>
                            <PostCard product={product}/>
                        </Grid>
                    ))}
            </Grid>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    component={Link}
                    to="/products"
                    color='inherit' 
                    sx={{ borderRadius: '20px', bgcolor: '#ffb74d', fontWeight: "bold" }}
                >
                    Explore
                </Button>
            </div>
        </Container>
    );
};

export default ProductsSlider;
