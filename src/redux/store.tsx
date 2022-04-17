import { createStore } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducer';

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const getState = () => {
    return store.getState();
};

export {
    store,
    persistor,
    getState
}