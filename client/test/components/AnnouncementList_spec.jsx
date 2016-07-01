/* eslint-env mocha */
import React from 'react';
import AnnouncementList from '../../src/components/AnnouncementList';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

describe('AnnouncementList', () => {

  it('displays a header', () => {
    const wrapper = mount(<AnnouncementList  />);
    const header = wrapper.find('h1');
    expect(header).to.have.lengthOf(1);
    expect(header.text()).to.equal('Announcements');
  });

  it('displays a list of announcements', () => {
    const ancData = fromJS([
      {title: 'foo', description: 'bar', createdAt:'02/02/1994 12:00', id:1},
      {title: 'baz', description: 'qux', createdAt:'02/04/1994 11:00', id:2},
      {title: 'React', description: 'JS', createdAt:'03/02/1994 12:00', id:3}
    ]);

    const wrapper = mount(<AnnouncementList announcements={ancData} />);
    const announcements = wrapper.find('Announcement');
    expect(announcements).to.have.lengthOf(3);
    ancData.forEach((data, i) => {
      expect(announcements.at(i).text()).to.contain(data.get('title'));
      expect(announcements.at(i).text()).to.contain(data.get('description'));
    });
  });

  it('displays correct message when list is empty', () => {
    const data = fromJS([]);
    const wrapper = mount(<AnnouncementList announcements={data} />);
    expect(wrapper.find('Announcement')).to.have.lengthOf(0);
    expect(wrapper.text()).contains('No announcements');
  });

});
