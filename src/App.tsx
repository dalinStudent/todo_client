import React from 'react';
import MyRoutes from './routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
   <>
   <Provider store={store}>
    <MyRoutes />
   </Provider>
   </>
  );
}

export default App;
