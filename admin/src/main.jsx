import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import StoreContextProvider from './context/store.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>

    <PersistGate persistor={persistor}>

    <Provider store={store}>

      <StoreContextProvider>

        <App />
        
      </StoreContextProvider>

    </Provider>

    </PersistGate>

  </StrictMode>,
)
