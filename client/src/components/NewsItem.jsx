import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class NewsItem extends React.Component {

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.open(this.props.news.get('link'), '_blank');
  }

  render() {
    const bg = {
      'background-image':`url('${this.props.news.get('fileUrl')}')`
    };
    return (
      <article className="news-item" >
        <div className="image" style={bg} />
        <div className="wrapper">
          <div className="caption">
            <h2 onClick={this.handleClick}>{this.props.news.get('title')}</h2>
            <h3>{this.props.news.get('description')}</h3>
          </div>
        </div>
      </article>
    );
  }

}

export default NewsItem;
