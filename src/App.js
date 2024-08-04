import productsData from './Data/products.json';
import { Cart } from './components/Cart';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setItems } from './redux/cartSlice';

function App() {
  const dispatch = useDispatch();
  
  // Initalize cart
  useEffect(() => {
    dispatch(setItems(productsData.products));
    console.log("HELLO")
  }, [dispatch]);

  return (
    <div className="App">
      <Cart />
    </div>
  );
}

export default App;
