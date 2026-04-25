import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import docReducer from './docSlice.js'

const store = configureStore({
    reducer: {
       'auth': authReducer, 
       'docs': docReducer
    }
})

export {store};