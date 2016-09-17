import React from 'react';
import EventItem from './EventItem';
import moment from 'moment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { groupByDays } from '../utils/utils';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  createViews() {
    const mappedList = groupByDays(this.props.events, 'startEpoch');
    const keys = mappedList.keySeq().sort((v1, v2) => {
      const date1 = new Date(v1).getTime();
      const date2 = new Date(v2).getTime();

      if (date1 < date2) return -1;
      if (date1 > date2) return +1;
      return 0;
    });
    const views = [];
    for (let item of keys){
      const date = moment(item);
      let view = (
        <div key={date.toString()}>
          <h3><span>{date.format('dddd, MMM Do')}</span></h3>
          <ul className="clearfix">
          {
            mappedList.get(item).map(event => (
                <EventItem event={event} key={event.get('id')} />
              )
            )
          }
          </ul>
        </div>
      );
      views.push(view);
    }
    return views;
  }

  render(){
    return (
      <section className="event-list">
        {this.createViews()}
      </section>
    );
  }
}

export default EventList;
