import React from 'react';
import Slider from 'react-slick';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NewsItem from './NewsItem';
import { fromJS, List } from 'immutable';
import { sortByDate } from '../utils/utils';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { getNewsList } from '../reducers';

class NewsSlider extends React.Component {

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.settings = {
      dots: true,
      arrows: true,
      infinite: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    this.props.fetchNewsList();
  }

  render() {
    return (
      <section className="news-slider">
        <Slider {...this.settings}>
          {
            this.props.newsList.size > 0?
            sortByDate(this.props.newsList).reverse().map((news) => (
              <div key={news.get('id')}><NewsItem news={news} /></div>)
            ):
            <div><NewsItem news={this.props.fallbackNews} /></div>
          }
        </Slider>
      </section>
    );
  }

}

NewsSlider.defaultProps = {
  newsList: List(),
  fallbackNews: fromJS({
    title: 'Coming Soon',
    description: 'Coming Soon',
    fileUrl: '/images/comingsoon.jpg'
  })
};

function mapStateToProps(state) {
  return {
    newsList: getNewsList(state)
  };
}

NewsSlider = connect(
  mapStateToProps,
  actions
)(NewsSlider);

export default NewsSlider;
