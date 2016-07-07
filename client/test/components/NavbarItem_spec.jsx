/* eslint-env mocha */
import React from 'react';
import NavbarItem from '../../src/components/NavbarItem';
import { expect } from 'chai';
import { mount } from 'enzyme';

describe('NavbarItem', () => {

  it('displays a title', () => {
    const props = {
      title: 'Foo'
    };
    const wrapper = mount(<NavbarItem {...props} />);
    expect(wrapper.text()).to.equal('Foo');
  });

  it('renders a `Link`', () => {
    const props = {
      title: 'Foo',
      href: 'http://www.example.com'
    };
    const wrapper = mount(<NavbarItem {...props} />);
    expect(wrapper.find('Link')).to.have.lengthOf(1);
  });

});
