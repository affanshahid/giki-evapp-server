import React from 'react';
import Announcement from './Announcement';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { sortByDate } from '../utils/utils';
import { List } from 'immutable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getAnnouncements } from '../reducers';

class AnnouncementList extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    this.props.fetchAnnouncements();
  }

  getHeaderText() {
    return this.props.announcements.size > 0? 'Announcements': 'No Announcements'
  }

  render () {
    return (
      <section className="announcement-list">
        <h3><span>{this.getHeaderText()}</span></h3>
        <ul>
          {
            sortByDate(this.props.announcements).map(anc => (
              <Announcement
                key={anc.get('id')}
                announcement={anc} />
            ))
          }
        </ul>
      </section>
    );
  }
}

AnnouncementList.defaultProps = {
  announcements: List()
};

const mapStateToProps = (state) => {
  return {
    announcements: getAnnouncements(state)
  };
};

AnnouncementList = connect(
  mapStateToProps,
  actions
)(AnnouncementList);
export default AnnouncementList;
