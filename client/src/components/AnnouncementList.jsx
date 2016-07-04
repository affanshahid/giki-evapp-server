import React from 'react';
import Announcement from './Announcement';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AnnouncementList extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getSortedList() {
    return this.props.announcements.sort((a1, a2) => {
      const date1 = new Date(a1.get('createdAt')).getTime();
      const date2 = new Date(a2.get('createdAt')).getTime();

      if (date1 < date2) return 1;
      if (date1 > date2) return -1;
      return 0;
    });
  }

  render () {
    return (
      <section className="announcement-list">
        <h1>Announcements</h1>
        <ul>
          {
            this.props.announcements.size ?
            this.getSortedList().map(anc => <Announcement key={anc.get('id')} announcement={anc} />) :
            (<h3>No announcements</h3>)
          }
        </ul>
      </section>
    );
  }
}

AnnouncementList.defaultProps = {
  announcements: []
};

export default AnnouncementList;
