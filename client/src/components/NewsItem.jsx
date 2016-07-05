import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

class NewsItem extends React.Component {

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.open(this.props.news.get('link'), '_blank');
  }

  hasLink(){
    return this.props.news.has('link');
  }

  render() {
    const bg = {
      backgroundImage:`url('${this.props.news.get('fileUrl')}')`
    };
    const handler = this.hasLink()? this.handleClick : undefined;
    return (
      <article className="news-item" >
        <div className="image" style={bg} />
        <div className="wrapper">
          <div className="caption">
            <h2 onClick={handler}
              className={classNames({ link: this.hasLink() })} >
              {this.props.news.get('title')}
            </h2>
            <h3>{this.props.news.get('description')}</h3>
          </div>
        </div>
      </article>
    );
  }

}

export default NewsItem;
