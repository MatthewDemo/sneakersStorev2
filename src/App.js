import React from 'react';
import axios from 'axios'
import Header from './components/Header';
import Drawer from './components/Drawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Favorites from './pages/Favorites';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch('https://6353e463ccce2f8c02feb63d.mockapi.io/items').then(res => {
    //   return res.json()
    // }).then(json => {
    //   setItems(json)
    // })
    axios.get('https://6353e463ccce2f8c02feb63d.mockapi.io/items').then(res => {
      setItems(res.data)
    });
    axios.get('https://6353e463ccce2f8c02feb63d.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })
    axios.get('https://6353e463ccce2f8c02feb63d.mockapi.io/favorites').then(res => {
      setFavorites(res.data)
    })

  }, []);


  const onAddToCart = (obj) => {
    axios.post('https://6353e463ccce2f8c02feb63d.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6353e463ccce2f8c02feb63d.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter((item) => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try{
      if (favorites.find((favObj) => favObj.id == obj.id)) {
        axios.delete(`https://6353e463ccce2f8c02feb63d.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } =  await axios.post('https://6353e463ccce2f8c02feb63d.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      console.log('Есть проблема с добавлением в фавориты')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }


  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />


      <Routes>
        <Route path="/" element={<Home
          items={items} 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart} />}
        />
        <Route path="/favorites" element={
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />}
        />
      </Routes>


    </div>
  );
}

export default App;
