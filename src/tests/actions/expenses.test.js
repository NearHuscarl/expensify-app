import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addExpense,
	startAddExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startRemoveExpense,
	setExpenses,
	startSetExpenses,
} from '../../actions/expenses.js';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'test_uid_lsjfljs';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	database
		.ref(`users/${uid}/expenses`)
		.set(expensesData)
		.then(() => done());
});

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc',
	});
});

test('should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;

	store
		.dispatch(startRemoveExpense({ id }))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'REMOVE_EXPENSE',
				id,
			});
			return database.ref(`/users/${uid}/expenses/${id}`).once('value');
		})
		.then((snapshot) => {
			expect(snapshot.val()).toBeFalsy();
			done();
		});
});

test('should setup edit expense action object', () => {
	const action = editExpense('123abc', { note: 'New note object' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: { note: 'New note object' },
	});
});

test('should edit expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const expense = expenses[1];
	const updates = { description: 'whiskey' };

	store
		.dispatch(startEditExpense(expense.id, updates))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'EDIT_EXPENSE',
				id: expense.id,
				updates,
			});
			return database.ref(`/users/${uid}/expenses/${expense.id}`).once('value');
		})
		.then((snapshot) => {
			expect(snapshot.val()).toEqual({
				...updates,
				note: expense.note,
				amount: expense.amount,
				createdAt: expense.createdAt,
			});
			done();
		});
});

test('should setup add expense action object with default value', () => {
	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[0],
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: 'mouse',
		amount: 3200,
		note: 'this one is better',
		createdAt: 1203,
	};

	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData,
				},
			});

			return database
				.ref(`/users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value');
		})
		.then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseDefaults = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0,
	};

	store
		.dispatch(startAddExpense())
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseDefaults,
				},
			});

			return database
				.ref(`/users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value');
		})
		.then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses,
	});
});

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses,
		});
		done();
	});
});
