/* eslint-env mocha */
import React from 'react';
import Navbar from '../../src/components/Navbar';
import { expect } from 'chai';
import { mount } from 'enzyme';

describe('Navbar', () => {

  it('displays brand', () => {
    const wrapper = mount(<Navbar />);
    expect(wrapper.find('div #logo')).to.have.lengthOf(1);
  });

  it('displays NavbarItems', () => {
    const wrapper = mount(
      <Navbar />
    );
    expect(wrapper.find('ul > NavbarItem')).to.have.lengthOf(3);
    expect(wrapper.find('ul > NavbarButton')).to.have.lengthOf(1);
  });

});
