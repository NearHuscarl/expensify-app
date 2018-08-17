import React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
	state = {
		calanderFocused: null,
	};

	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value);
	};

	onSortChange = (e) => {
		if (e.target.value === 'date') {
			this.props.sortByDate();
		} else if (e.target.value === 'amount') {
			this.props.sortByAmount();
		}
	};

	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};

	onFocusChange = (calanderFocused) => {
		this.setState(() => ({ calanderFocused }));
	};

	render() {
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group__item">
						<input
							type="text"
							className="text-input"
							placeholder="Search expenses"
							value={this.props.filters.text}
							onChange={this.onTextChange}
						/>
					</div>
					<div className="input-group__item">
						<select
							className="select"
							value={this.props.filters.sortBy}
							onChange={this.onSortChange}>
							<option value="date">Visible</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						<DateRangePicker
							startDateId={''}
							endDateId={''}
							startDate={this.props.filters.startDate}
							endDate={this.props.filters.endDate}
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calanderFocused}
							onFocusChange={this.onFocusChange}
							showClearDates={true}
							numberOfMonths={1}
							isOutsideRange={(day) => false}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate),
	sortByAmount: () => dispatch(sortByAmount),
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ExpenseListFilters);
