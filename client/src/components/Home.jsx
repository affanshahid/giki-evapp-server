import React from 'react';
import NewsSlider from './NewsSlider';
import AnnouncementList from './AnnouncementList';
import EventList from './EventList';
import { fromJS } from 'immutable';

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
const ancData = fromJS([
  {title: 'foo', description: 'Id cillum in ad sunt dolor culpa in fugiat id aliquip fugiat dolore.', createdAt:'02/02/1994 12:00', id:1},
  {title: 'baz', description: 'Aliqua fugiat sit consectetur quis laboris ipsum commodo occaecat exercitation commodo eiusmod ipsum fugiat consectetur enim.', createdAt:'02/02/1994 12:00', id:2},
  {title: 'React', description: 'Dolor excepteur consectetur est irure proident id officia fugiat ullamco nisi duis nisi enim.', createdAt:'02/02/1994 12:00', id:3}
]);
const modData = fromJS([
  {
    title: 'Foo',
    link: 'http://www.google.com',
    description: 'Id cillum in ad sunt dolor culpa in fugiat id aliquip fugiat dolore.',
    startEpoch: '02/05/1994 12:00',
    endEpoch: '02/02/1994 12:00',
    id: 1,
    fileUrl:'https://c402277.ssl.cf1.rackcdn.com/photos/479/images/story_full_width/giant-panda-shutterstock_86500690.jpg?1345572346'
  },
  {
    title: 'Baz',
    link: 'http://www.google.com',
    description: 'Aliqua fugiat sit consectetur quis laboris ipsum commodo occaecat exercitation commodo eiusmod ipsum fugiat consectetur enim.',
    startEpoch: '02/02/1994 12:00',
    endEpoch: '02/02/1994 12:00',
    fileUrl:'https://c402277.ssl.cf1.rackcdn.com/photos/479/images/story_full_width/giant-panda-shutterstock_86500690.jpg?1345572346',
    id: 2
  },
  {
    link: 'http://www.google.com',
    title: 'React',
    description: 'Dolor excepteur consectetur est irure proident id officia fugiat ullamco nisi duis nisi enim.',
    startEpoch: '02/02/1994 12:00',
    fileUrl:'https://c402277.ssl.cf1.rackcdn.com/photos/479/images/story_full_width/giant-panda-shutterstock_86500690.jpg?1345572346',
    endEpoch: '02/02/1994 12:00',
    id: 3
  }
]);

class Home extends React.Component {

  render() {
    return (
      <div className="content">
        <NewsSlider newsList={data} />
          <div className="wrapper clearfix">
            <section className="event-container">
              <EventList events={modData} />
            </section>
            <aside className="announcement-container">
              <AnnouncementList announcements={ancData} />
            </aside>
          </div>
      </div>
    );
  }

}

export default Home;
