import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Router from './router.tsx'
import store from './store.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
)
