import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux/store/configureStore';


const store = configureStore()

store.subscribe(()=>{
  console.log('store-updated',store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);


