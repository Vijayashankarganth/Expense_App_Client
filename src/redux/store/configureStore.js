import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import budgetReducer from '../reducers/budgetReducer'
import categoryReducer from '../reducers/categoryReducer'
import expenseReducer from '../reducers/expenseReducer'
import profileReducer from '../reducers/profileReducer'
const configureStore=()=>{
    const store = createStore(combineReducers({
            budget:budgetReducer,
            category:categoryReducer,
            profile:profileReducer,
            expense:expenseReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore 