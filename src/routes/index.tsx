import React, { Suspense, lazy, memo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'))
// const DetailTodo = lazy(() => import('../pages/DetailTodo'))

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
{/* 
        <Route
          path='/detail/:slug'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <DetailTodo />
            </Suspense>
          }
        /> */}
      </Routes>
    </Router>
  )
}

export default memo(MyRoutes)
