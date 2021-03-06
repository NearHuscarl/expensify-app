import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({
	expensesCount,
	expensesTotal,
	hiddenExpensesCount,
}) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
	const hiddenExpenseWord = hiddenExpensesCount === 1 ? 'expense' : 'expenses';
	const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00');

	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">
					Viewing <span>{expensesCount}</span> {expenseWord} totalling{' '}
					<span>{formattedExpenseTotal}</span>
				</h1>
				{hiddenExpensesCount !== 0 && (
					<p className="page-header__subtitle">
						{hiddenExpensesCount} hidden {hiddenExpenseWord}
					</p>
				)}
				<div className="page-header__action">
					<Link className="button" to="/create">
						Add Expense
					</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses),
		hiddenExpensesCount: state.expenses.length - visibleExpenses.length,
	};
};

export default connect(mapStateToProps)(ExpensesSummary);
