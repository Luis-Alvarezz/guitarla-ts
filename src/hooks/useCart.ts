import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';
import type { Guitar, GuitarItem, IdGuitarItem } from '../types/types';

// function useCart() { } // * Function Declaration
// * Arrow Functions:
export const useCart = () => {
  // console.log('Desde useCart...')
  // const auth = true;

  // const initialState = ''; // * Nombre comun pero NO recomiendado cuando podemos tener multiples states
  const initialCart = (): GuitarItem[] => { // * En el type indicamos que será un type y al final será un arreglo
    // * 1- Recuperar de LocalStorage;
    const localStorageCart = localStorage.getItem("cart");
    // * 2 - Comprobar si hay algo en la variable
    return localStorageCart ? JSON.parse(localStorageCart) : []; // * Si hay algo lo convertimos nuevamente de string a arreglo si no,
    // * iniciamos en arreglo vacio
  };

  // * Creamos nuestro STATE:
  const [data] = useState(db);
  // * Segundo STATE para carrito:
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // * Se sincroniza cada que detecta un cambio en el carrito:
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // * Nombre de lo que queremos almacenar , lo que deseamos almacenar
  }, [cart]); // * ARREGLO DE DEPENDENCIAS (que cambie cuando se ejecute en este caso 'cart')

  function addToCart(item: Guitar) {
    // console.log('Agregando...');
    // ! Logica para evitar duplicar el registro multiples veces
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id); // * Callback que seria un Arrow Function, si no existe retorna -1
    console.log(itemExists);
    if (itemExists >= 0) {
      // console.log('Ya existe...');
      // cart[itemExists].quantity++; // * MAL, muta el state
      if (cart[itemExists].quantity >= MAX_ITEMS) return;

      const updatedCart = [...cart]; // * Copia del STATE
      updatedCart[itemExists].quantity++; // * Aumentamos cantidad de item en COPIA de STATE
      setCart(updatedCart); // * Actualizamos STATE con COPIA
    } else {
      // console.log('No existe... Agregando...');
      const newItem: GuitarItem = {...item, quantity : 1} // * Casting - Tomamos un tipo de dato y convertimos a otro
      // item.quantity = 1; // * Escribo en mi objeto antes de colocarlo en State
      setCart((prevCart) => [...prevCart, newItem]); // * O tambien colocar [...cart, item]
    }

    // saveLocalStorage();
  }

  function removeFromCart(id: IdGuitarItem) {
    // console.log('Eliminando: ', id);
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id)); // * Retorname las guitarras diferentes a la que dimos clic
  }

  function increaseQuantity(id: IdGuitarItem) {
    // console.log('Incrementando...', id);
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item, // * Mantenemos el resto de propiedades (imagen, nombre, precio, etc)
          quantity: item.quantity + 1,
        };
      }
      return item; // * Para que los elementos que NO di clic, los mantenga intactos
    });
    setCart(updatedCart); // * Actualizamos STATE con COPIA
  }

  function decreaseQuantity(id: IdGuitarItem) {
    // console.log('Decrementando...', id);
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart); // * Actualizamos STATE con COPIA
  }

  function clearCart() {
    setCart([]);
  }

  // TODO: States Componente Header.tsx
  // * STATE DERIVADO
  // const isEmpty = () => {  return cart.length === 0 } // * Return True or False
  const isEmpty = useMemo( () => cart.length === 0, [cart] )// * Return True or False
  // const isEmpty = function() { return cart.length === 0} // * Function Expresion
  // * STATE DERIVADO 2:
  const cartTotal = useMemo( () => { return cart.reduce((total, item) => total + (item.quantity * item.price), 0)}, [cart])


  // ! Lo que retorna el OBJETO:
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
};

// export default useCart
