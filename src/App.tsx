import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss'
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

//* Lazy imports
const Cart = React.lazy(() => import('./pages/Cart'));
const SinglePizza = React.lazy(() => import('./pages/SinglePizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
//* ------------------------------- 


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>

        <Route
          path=""
          element={<Home />}
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <Cart />
            </Suspense>
          }
          errorElement={<div>12</div>}
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <SinglePizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />

      </Route>
    </Routes>
  )
}

export default App