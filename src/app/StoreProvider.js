'use client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '@/lib/store'
import persistStore from 'redux-persist/es/persistStore'


export const persistor = persistStore(store)


export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>)
}