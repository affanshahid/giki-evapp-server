import React from 'react';
import Announcement from './Announcement';

class AnnouncementList extends React.Component {

  render () {
    return (
      <section className="announcement-list">
        <h1>Announcements</h1>
        <ul>
          {
            this.props.announcements.size ?
            this.props.announcements.map(anc => (
              <Announcement
                key={anc.get('id')}
                title={anc.get('title')}
                description={anc.get('description')}
                createdAt={anc.get('createdAt')} />
            )) :
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
