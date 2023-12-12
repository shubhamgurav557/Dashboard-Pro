import { useState } from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';
import { CurrencyRupeeOutlined } from '@mui/icons-material';

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"
        }}>
            <CardContent>
                <Typography variant='h6' color={theme.palette.secondary[700]} gutterBottom textTransform="capitalize">
                    {category}
                </Typography>
                <Typography variant='h5' component='div'>
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                   <CurrencyRupeeOutlined fontSize='10px' sx={{pt:"3px"}} /> {Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant='body2'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='primary' size='small' onClick={() => setIsExpanded(!isExpanded)}>
                    See More
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout='auto' unmountOnExit sx={{ color: theme.palette.neutral[300] }}>
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Yearly Sales: {stat.yearlySalesTotal}</Typography>
                    <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    console.log("Product Data", data);

    return (
        <Box m="1.5rem 2rem">
            <Header title='PRODUCTS' subtitle="List of Products" />
            {data || !isLoading ? (
                <Box mt="20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 2fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{
                    "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4"
                    }
                }}>
                    {data.map(({
                        _id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat
                    }) => (
                        <Product
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            stat={stat}
                        />
                    ))}
                </Box>
            ) : (
                <Box width="100%" height="70vh" margin="auto" display="flex" alignItems="center" justifyContent="center" >
                    <CircularProgress />
                </Box>
            )
            }
        </Box>
    )
}

export default Products