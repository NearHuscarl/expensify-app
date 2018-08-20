import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ConfirmModal from './ConfirmModal';

export class EditExpensePage extends React.Component {
	state = {
		isConfirmDeleteModalOpen: false,
	};

	openDeletePrompt = () => {
		this.setState(() => ({ isConfirmDeleteModalOpen: true }));
	};

	closeDeletePrompt = () => {
		this.setState(() => ({ isConfirmDeleteModalOpen: false }));
	};

	onSubmit = (expense) => {
		this.props.startEditExpense(this.props.expense.id, expense);
		this.props.history.push('/');
	};

	onRemove = () => {
		this.props.startRemoveExpense({ id: this.props.expense.id });
		this.props.history.push('/');
	};

	onCancel = () => {
		this.closeDeletePrompt();
	};

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit Expense</h1>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
					<button
						className="button button--secondary"
						onClick={this.openDeletePrompt}>
						Remove Expense
					</button>
				</div>
				<ConfirmModal
					isOpen={this.state.isConfirmDeleteModalOpen}
					prompt="Are you sure?"
					onRequestClose={this.closeDeletePrompt}
					onConfirm={this.onRemove}
					onCancel={this.onCancel}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	expense: state.expenses.find(
		(expense) => expense.id === props.match.params.id,
	),
});

const mapDispatchToProps = (dispatch) => ({
	startEditExpense: (id, expense) => {
		dispatch(startEditExpense(id, expense));
	},
	startRemoveExpense: ({ id }) => {
		dispatch(startRemoveExpense({ id }));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditExpensePage);
