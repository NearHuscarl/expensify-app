import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, startEditExpense, startRemoveExpense, history, wrapper;

beforeAll(() => {
	expense = expenses[0];
	startEditExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = {
		push: jest.fn(),
	};
	wrapper = shallow(
		<EditExpensePage
			expense={expense}
			startEditExpense={startEditExpense}
			startRemoveExpense={startRemoveExpense}
			history={history}
		/>,
	);
});

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
	const editedExpense = { ...expense, description: '3 bananas' };
	wrapper.find('ExpenseForm').prop('onSubmit')(editedExpense);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startEditExpense).toHaveBeenLastCalledWith(
		editedExpense.id,
		editedExpense,
	);
});

test('should handle startRemoveExpense', () => {
	wrapper.find('button').simulate('click');
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
});
