
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

  const Navigate = useNavigate()

  const handleClick = (documentId, wvmOption, wvmId, elementId) => {
    return Navigate(`/editor?id=${documentId}`, { state: { wvmOption, wvmId, elementId}})
}

  return (
    <Card sx={{ ':hover': { boxShadow: 8}}} onClick={() => handleClick(product.documentId, product.wvmOption, product.wvmId, product.elementId)}>
      <CardMedia
        component="img"
        sx={{ height: 140, objectFit: 'contain', cursor: "pointer" }}
        image={product.image.data}
        alt="Product Image"
      />
      <CardContent>
        <Typography variant="body1" fontWeight="bold" component="div">
          {product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: "#fb923c" , cursor: "pointer"}} color="textSecondary">
          Customize <KeyboardArrowRightIcon />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
