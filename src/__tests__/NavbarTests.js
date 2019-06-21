import React from 'react';
import { shallow, mount } from 'enzyme';
import Navbar from "../components/Navbar";

function HookWrapper(props) {
    const hook = props.hook ? props.hook() : undefined;
    return <div hook={hook} />;
}

describe('Navbar Component', () => {
    it('should render without throwing an error', () => {
        const f = jest.fn();
        expect(shallow(<Navbar handleCheck={f}
                               handleSearch={f}
                               handleSearchInput={f}
                               handleSortDropdown={f} />).find('#navbar').exists()).toBe(true)
    });

    it('should call a function after clicking on the "search" button', () => {
        const f = jest.fn();
        let wrapper = shallow(<Navbar handleCheck={f}
                               handleSearch={f}
                               handleSearchInput={f}
                               handleSortDropdown={f} />);
        wrapper.find('#search-btn').simulate('click');
        expect(f).toBeCalled();
    });

})
