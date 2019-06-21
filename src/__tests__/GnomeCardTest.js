import React from 'react';
import { shallow } from 'enzyme';
import GnomeCard from '../components/GnomeCard'

describe('GnomeCard Component', () => {
    it('should render without throwing an error', () => {
        let data = {thumbnail: ''}
        expect(shallow(<GnomeCard data />).find('#gnome-card').exists()).toBe(true)
    })
})