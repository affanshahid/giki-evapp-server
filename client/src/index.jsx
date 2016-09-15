import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { fromJS } from 'immutable';
import Navbar from './components/Navbar';
import NewsSlider from './components/NewsSlider';

const data = fromJS([
  {
    id: 1,
    title: 'foo',
    description:'Ullamco consectetur cillum incididunt velit laboris quis enim eu culpa deserunt sint qui magna laborum duis ex enim.',
    fileUrl:'http://assets.worldwildlife.org/photos/11829/images/hero_full/315981.jpg?1467296041',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  },
  {
    id: 2,
    title: 'baz',
    description:'Adipisicing ea ex officia dolore duis veniam do fugiat nostrud nulla in laborum deserunt commodo est velit.',
    fileUrl:'http://wowslider.com/sliders/demo-11/data/images/krasivyi_korabl_-1024x768.jpg',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  },
  {
    id: 3,
    title: 'bar',
    description:'Qui enim deserunt enim officia ea minim proident proident.',
    fileUrl:'http://www.menucool.com/slider/prod/image-slider-5.jpg',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  },
  {
    id: 4,
    title: 'baz',
    description:'Magna sint officia dolore nisi commodo velit et fugiat aute sit occaecat sunt quis sint officia consectetur.',
    fileUrl:'https://www.jssor.com/demos/img/landscape/05.jpg',
    link:'http://www.google.com',
    createdAt: '02/02/02 11:00'
  }
]);

ReactDOM.render(
  <NewsSlider newsList={data} />,
  document.getElementById('app')
);
