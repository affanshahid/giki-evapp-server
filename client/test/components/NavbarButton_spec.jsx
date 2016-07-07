/* eslint-env mocha */
import React from 'react';
import NavbarButton from '../../src/components/NavbarButton';
import { expect } from 'chai';
import { mount } from 'enzyme';

describe('NavbarButton', () => {

  it('displays a title', () => {
    const props = {
      title: 'Foo'
    };
    const wrapper = mount(<NavbarButton {...props} />);
    expect(wrapper.text()).to.equal('Foo');
  });

  it('responds to a click', () => {
    let checked = false;
    const onClick = () => checked = true;
    const wrapper = mount(<NavbarButton onClick={onClick} />);
    wrapper.find('button').simulate('click');
    expect(checked).to.be.ok;
  });

});
