import expensesReducer from '../../reducers/expenses.js';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, '@@INIT');
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
	const action = { type: 'REMOVE_EXPENSE', id: '-1' };
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add an expense', () => {
	const expense = {
		id: '69',
		description: 'choo choo',
		note: '',
		amount: 10000,
		createdAt: 0,
	};
	const action = { type: 'ADD_EXPENSE', expense };
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
	const description = 'moo';
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: { description },
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].description).toBe(description);
});

test('should not edit an expense if id not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: { description: 'moo' },
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});
