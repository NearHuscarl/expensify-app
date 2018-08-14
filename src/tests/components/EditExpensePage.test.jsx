import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, editExpense, removeExpense, history, wrapper;

beforeAll(() => {
	expense = expenses[0];
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = {
		push: jest.fn(),
	};
	wrapper = shallow(
		<EditExpensePage
			expense={expense}
			editExpense={editExpense}
			removeExpense={removeExpense}
			history={history}
		/>,
	);
});

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
	const editedExpense = { ...expense, description: '3 bananas' };
	wrapper.find('ExpenseForm').prop('onSubmit')(editedExpense);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editExpense).toHaveBeenLastCalledWith(
		editedExpense.id,
		editedExpense,
	);
});

test('should handle removeExpense', () => {
	wrapper.find('button').simulate('click');
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(removeExpense).toHaveBeenLastCalledWith({ id: expense.id });
});
