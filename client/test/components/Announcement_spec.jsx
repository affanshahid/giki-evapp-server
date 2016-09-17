/* eslint-env mocha */
import React from 'react';
import Announcement from '../../src/components/Announcement';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map } from 'immutable';

describe('Announcement', () => {

  it('renders a colored dot', () => {
    const announcement = Map({
      title:"Foo",
      description:"bar",
      createdAt:"12/12/2004 10:00"
    });
    const wrapper = mount(
      <Announcement
        announcement={announcement} />
    );
    const dots = wrapper.find('div.dot');
    expect(dots).to.have.lengthOf(1);
    expect(dots.props().style).to.have.property('backgroundColor');
  });

  it('renders the title, description and date', () => {
    const announcement = Map({
      title:"Foo",
      description:"bar",
      createdAt:"12/12/2004 10:00"
    });
    const wrapper = mount(
      <Announcement
        announcement={announcement} />
    );
    const heading = wrapper.find('h3');
    const paras = wrapper.find('p');
    expect(heading).to.have.lengthOf(1);
    expect(paras).to.have.lengthOf(2);
    expect(heading.text()).to.equal('Foo');
    expect(paras.at(0).text()).to.equal('12/12/2004 10:00');
    expect(paras.at(1).text()).to.equal('bar');
  });

});
