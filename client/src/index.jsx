import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import './styles.css';
import NewsSlider from './components/NewsSlider';

const lorem = 'A look at the world\'s most beautiful animals';
const data = fromJS([
  {
    title: 'America the beautiful',
    description:lorem,
    fileUrl:'http://assets.worldwildlife.org/photos/11829/images/hero_full/315981.jpg?1467296041',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  },
  {
    title: 'baz',
    description:lorem,
    fileUrl:'http://wowslider.com/sliders/demo-11/data/images/krasivyi_korabl_-1024x768.jpg',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  },
  {
    title: 'bar',
    description:lorem,
    fileUrl:'http://www.menucool.com/slider/prod/image-slider-5.jpg',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  },
  {
    title: 'baz',
    description:lorem,
    fileUrl:'https://www.jssor.com/demos/img/landscape/05.jpg',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  }
]);

ReactDOM.render(
  <NewsSlider newsList={data} />,
  document.getElementById('app')
);
