import { configureStore } from '@reduxjs/toolkit';
import serverDataReducer from '../reducers/serverDataReducer';

const store = configureStore({
    reducer: serverDataReducer,
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })

});

export default store;