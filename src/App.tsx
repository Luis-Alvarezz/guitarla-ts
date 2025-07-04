import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCart } from './hooks/useCart'

function App() {
  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal} = useCart();
  // console.log(`Desde ${auth} en App.jsx` );

  return (
    <>
      
    <Header
      cart={cart}
      removeFromCart = {removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal}
    ></Header>
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          { data.map((guitar) => {
            return (
              <Guitar 
                key={guitar.id} // * PROP identificador
                guitar={guitar} // * PROP 2 - Pasar informacion de cada guitarra desde la DB al Componente Guitar.tsx
                // setCart = {setCart} // * PROP 3 - Forma 1 y 2 de pasar de agregar elementos al carrito (forma 2 pasando el carrito pero no es consistente para editar o eliminar algun item)
                addToCart = {addToCart} // * PROP 4 - Forma 3: Metodo externo para añadir elementos al carrito
              />
            )
          }) }
        </div>
            
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}


export default App