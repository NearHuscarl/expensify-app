import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpenseSummary correctly with 1 expense', () => {
	const wrapper = shallow(
		<ExpensesSummary expensesCount={1} expensesTotal={9434} />,
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary correctly with multiple expenses', () => {
	const wrapper = shallow(
		<ExpensesSummary expensesCount={2} expensesTotal={9434} />,
	);
	expect(wrapper).toMatchSnapshot();
});
