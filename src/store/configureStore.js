import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer,
		auth: authReducer,
	}),
	composeWithDevTools(applyMiddleware(thunk)),
);

export default () => {
	return store;
};
