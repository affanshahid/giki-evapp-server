import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getTimestamp() {
    const startDate = moment(new Date(this.props.event.get('startEpoch')));
    const endDate = moment(new Date(this.props.event.get('endEpoch')));
    return `${startDate.format('h:mm A')} - ${endDate.format('h:mm A')}`;
  }

  render() {
    return (
      <li className="event-item">
        <a href={this.props.event.get('link')} target="_blank">
          <div className="timestamp">
            {this.getTimestamp()}
          </div>
          <article className="container">
            <div
              className="image"
              style={{backgroundImage:`url(${this.props.event.get('fileUrl')})`}}>
            </div>
            <div className="text">
              <h4>{this.props.event.get('title')}</h4>
              <p>{this.props.event.get('description')}</p>
            </div>
          </article>
        </a>
      </li>
    );
  }
}

export default EventItem;
