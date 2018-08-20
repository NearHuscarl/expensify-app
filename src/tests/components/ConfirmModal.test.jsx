import React from 'react';
import { shallow } from 'enzyme';
import ConfirmModal from '../../components/ConfirmModal';

test('should render ConfirmModal correctly', () => {
	const wrapper = shallow(<ConfirmModal />);
	expect(wrapper).toMatchSnapshot();
});
