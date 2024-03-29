import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './common/reducers/allReducers';

const loadState = () => {
    const store = JSON.parse(localStorage.getItem("store"));
    let storeObject;
    if(store !== null){
        storeObject = {
            authentication: store.authentication,
            feed: store.feed,
            cart: store.cart,
            menu: store.menu
        };
    }
    return storeObject;
};

const saveState = (state) => {
    localStorage.setItem("store", JSON.stringify(state));
};

export default function configureStore() {
    const state = loadState();
    const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
}