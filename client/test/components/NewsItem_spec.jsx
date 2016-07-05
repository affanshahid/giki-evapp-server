/* eslint-env mocha */
import React from 'react';
import NewsItem from '../../src/components/NewsItem';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map } from 'immutable';

describe('NewsItem', () => {

  it('displays an image', () => {
    const news = Map({
      fileUrl: 'www.fakething.com'
    });
    const wrapper = mount(<NewsItem news={news} />);
    const img = wrapper.find('div.image');
    expect(img).to.have.lengthOf(1);
    expect(img.prop('style').backgroundImage).to.contain(news.get('fileUrl'));
  });

  it('displays a header', () => {
    const news = Map({
      title: 'foo'
    });
    const wrapper = mount(<NewsItem news={news} />);
    const h2 = wrapper.find('h2');
    expect(h2).to.have.lengthOf(1);
    expect(h2.text()).to.contain(news.get('title'));
  });

  it('displays a description', () => {
    const news = Map({
      description: 'foo'
    });
    const wrapper = mount(<NewsItem news={news} />);
    const desc = wrapper.find('h3');
    expect(desc).to.have.lengthOf(1);
    expect(desc.text()).to.contain(news.get('description'));
  });

  describe('links', () => {

    it('the `link` class is only attached to the header when a link is supplied', () => {
      let news = Map({
        title: 'bar',
        link: 'foo'
      });
      let wrapper = mount(<NewsItem news={news} />);
      let h2 = wrapper.find('h2 .link');
      expect(h2).to.have.lengthOf(1);
      news = Map({
        title: 'bar'
      });
      wrapper = mount(<NewsItem news={news} />);
      h2 = wrapper.find('h2 .link');
      expect(h2).to.have.lengthOf(0);
    });

    it('opens the link when the header is clicked', () => {
      let clicked = false;
      window.open = () => clicked = true;
      const news = Map({
        title: 'foo',
        link: 'bar'
      });
      const wrapper = mount(<NewsItem news={news} />);
      const h2 = wrapper.find('h2');
      expect(h2).to.have.lengthOf(1);
      h2.simulate('click');
      expect(clicked).to.be.ok;
    });

    it('does nothing when the header is clicked and there is no link', () => {
      let clicked = false;
      window.open = () => clicked = true;
      const news = Map({
        title: 'foo'
      });
      const wrapper = mount(<NewsItem news={news} />);
      const h2 = wrapper.find('h2');
      expect(h2).to.have.lengthOf(1);
      h2.simulate('click');
      expect(clicked).to.not.be.ok;
    });

  });

});
