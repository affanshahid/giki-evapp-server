import React from 'react';
import Slider from 'react-slick';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NewsItem from './NewsItem';

class NewsSlider extends React.Component {

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.settings = {
      dots: true,
      arrows: true
    };
  }

  getSortedList() {
    return this.props.newsList.sort((a1, a2) => {
      const date1 = new Date(a1.get('createdAt')).getTime();
      const date2 = new Date(a2.get('createdAt')).getTime();

      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
      return 0;
    });
  }

  render() {
    return (
      <section className="news-slider">
        <Slider {...this.settings}>
          {
            this.getSortedList().map((news) => <div><NewsItem news={news} /></div>)
          }
        </Slider>
      </section>
    );
  }

}

export default NewsSlider;

// {
//   this.getSortedList().map((news) => <NewsItem news={news} />)
// }
