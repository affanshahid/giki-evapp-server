/* eslint-env mocha */
import React from 'react';
import AnnouncementList from '../../src/components/AnnouncementList';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

describe('AnnouncementList', () => {

  it('displays a list of announcements', () => {
    const ancData = fromJS([
      {title: 'foo', description: 'bar'},
      {title: 'baz', description: 'qux'},
      {title: 'React', description: 'JS'}
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
