import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, setQuantity, selectTotalAmount, selectTotalQuantity } from '../redux/cartSlice';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    TextField,
    Grid,
    Box,
    Paper
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(selectTotalQuantity) || 0;
    const totalAmount = useSelector(selectTotalAmount) || 0;

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const handleQuantityChange = (id, event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            dispatch(setQuantity({ id, quantity: value }));
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">Shopping Cart</Typography>
            <Grid container spacing={2} direction="column">
                {items.map(item => {
                    const subTotal = item.price * item.quantity;

                    return (
                        <Grid item xs={12} key={item.id}>
                            <Card sx={{ display: 'flex', alignItems: 'flex-start', boxShadow: 3 }}>
                                <Grid container>
                                    <Grid item xs={12} sm={4}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={item.thumbnail}
                                            alt={item.title}
                                            sx={{  width: '100%', objectFit: 'contain', borderRight: 1, borderColor: 'divider' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>{item.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {item.description}
                                            </Typography>
                                            <Typography variant="h6" color="text.primary">
                                                ${item.price.toFixed(2)}
                                            </Typography>
                                            <Box display="flex" alignItems="center" mt={2} gap={2}>
                                                <IconButton
                                                    onClick={() => handleDecrease(item.id)}
                                                    aria-label={`Decrease quantity of ${item.title}`}
                                                    sx={{
                                                        color: 'error.main',
                                                        border: 1,
                                                        borderColor: 'error.main',
                                                        borderRadius: '50%',
                                                    }}
                                                >
                                                    <Remove />
                                                </IconButton>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(event) => handleQuantityChange(item.id, event)}
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    sx={{ width: 60, textAlign: 'center' }}
                                                />
                                                <IconButton
                                                    onClick={() => handleIncrease(item.id)}
                                                    aria-label={`Increase quantity of ${item.title}`}
                                                    sx={{
                                                        color: 'success.main',
                                                        border: 1,
                                                        borderColor: 'success.main',
                                                    }}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="body1" color="text.primary" mt={2}>
                                                Sub-total: ${(subTotal).toFixed(2)}
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Box mt={4} textAlign="center">
                <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', bgcolor: 'background.paper' }}>
                    <Typography variant="h6" gutterBottom>Total Summary</Typography>
                    <Typography variant="h5" color="text.primary" gutterBottom>
                        Total Quantity: {totalQuantity}
                    </Typography>
                    <Typography variant="h5" color="text.primary">
                        Total Cart Amount: ${totalAmount.toFixed(2)}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}
