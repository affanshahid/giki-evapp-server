import React from 'react';
import Announcement from './Announcement';

class AnnouncementList extends React.Component {
  render () {
    return (
      <section className="announcement-list">
        {
          this.props.announcements.size ?
          this.props.announcements.map(anc => (
            <Announcement
              key={anc}
              title={anc.get('title')}
              description={anc.get('description')} />
          )) :
          (<h3>No announcements</h3>)
        }
      </section>
    );
  }
}

AnnouncementList.defaultProps = {
  announcements: []
};

export default AnnouncementList;
