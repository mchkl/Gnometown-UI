import React from 'react';
import { shallow, mount } from 'enzyme';
import Navbar from "../components/Navbar";

describe('Navbar Component', () => {
    it('should render without throwing an error', () => {
        const f = jest.fn();
        expect(shallow(<Navbar handleCheck={f}
                               handleSearch={f}
                               handleSearchInput={f}
                               handleSortDropdown={f} />).find('#navbar').exists()).toBe(true)
    })

    it('should change the Navbar state after calling the onChange function', () => {
        const option = "profession";
        const f = jest.fn();
        const component = mount(<Navbar handleCheck={f}
                                      handleSearch={f}
                                      handleSearchInput={f}
                                      handleSortDropdown={f}/>)

        component.find('select').at(0).props().onChange({ target: { value: option } });
        expect(component.state().searchSelect).toEqual(option);
    });
})
