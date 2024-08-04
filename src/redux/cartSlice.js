import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Initialize data 
        setItems(state, action) {
            state.items = action.payload.map(item => ({
                ...item,
                quantity: 0
            }));
        },
        increaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 0) {
                item.quantity -= 1;
            }
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        }
    }
});

// Calculate total quantity
export const selectTotalQuantity = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
}

// Calculate total amount
export const selectTotalAmount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const { setItems, increaseQuantity, decreaseQuantity, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;