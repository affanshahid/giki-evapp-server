import React from 'react';
import Announcement from './Announcement';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { sortByDate } from '../utils/utils';
import { List } from 'immutable';

class AnnouncementList extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render () {
    return (
      <section className="announcement-list">
        <h1>Announcements</h1>
        <ul>
          {
            this.props.announcements.size > 0?
            sortByDate(this.props.announcements).map(anc => (
              <Announcement
                key={anc.get('id')}
                announcement={anc} />
            )):
            (<h3>No announcements</h3>)
          }
        </ul>
      </section>
    );
  }
}

AnnouncementList.defaultProps = {
  announcements: List()
};

export default AnnouncementList;
