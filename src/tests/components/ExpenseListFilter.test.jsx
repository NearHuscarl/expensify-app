import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, allFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>,
	);
});

test('should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with all data correctly', () => {
	wrapper.setProps({ filters: allFilters });
	expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
	const text = 'fooz';
	wrapper.find('input').simulate('change', {
		target: { value: text },
	});
	expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

test('should sort by date', () => {
	wrapper.setProps({ filters: allFilters });
	wrapper.find('select').simulate('change', {
		target: { value: 'date' },
	});
	expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
	wrapper.find('select').simulate('change', {
		target: { value: 'amount' },
	});
	expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
		startDate: allFilters.startDate,
		endDate: allFilters.endDate,
	});
	expect(setStartDate).toHaveBeenLastCalledWith(allFilters.startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(allFilters.endDate);
});

test('should handle date focus change', () => {
	const focus = 'startDate';
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focus);
	expect(wrapper.state('calanderFocused')).toBe(focus);
});
