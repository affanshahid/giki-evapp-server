/* eslint-env mocha */
import React from 'react';
import Announcement from '../../src/components/Announcement.jsx';
import { expect } from 'chai';
import { mount } from 'enzyme';

describe('Announcement', () => {

  it('renders a colored dot', () => {
    const wrapper = mount(<Announcement title="Foo" description="bar" />);
    const dots = wrapper.find('div.dot');
    expect(dots).to.have.lengthOf(1);
    expect(dots.props().style).to.have.property('backgroundColor');
  });

  it('renders the title and description', () => {
    const wrapper = mount(<Announcement title="Foo" description="bar" />);
    const heading = wrapper.find('h3');
    const descrip = wrapper.find('p');
    expect(heading).to.have.lengthOf(1);
    expect(descrip).to.have.lengthOf(1);
    expect(heading.text()).to.equal('Foo');
    expect(descrip.text()).to.equal('bar');
  });

});
