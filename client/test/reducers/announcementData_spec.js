/*eslint-env mocha*/
import { fromJS, Map } from 'immutable';
import { expect } from 'chai';
import reducer, { getIsFetching } from '../../src/reducers/announcementData';

describe('Announcement data reducer', () => {

  it('initializes state correctly', () => {
    const curState = undefined;
    const expectedState = fromJS({
      announcements: [],
      isFetching: false,
      error: null
    });
    const nextState = reducer(curState, { type: 'NOTHING' });
    expect(nextState).to.equal(expectedState);
  });

  it('handles FETCH_ANNOUNCEMENTS_SUCCESS', () => {
    const data = [
      { title: 'foo', description: 'bar' },
      { title: 'baz', description: 'qux' }
    ];

    const action = {
      type: 'FETCH_ANNOUNCEMENTS_SUCCESS',
      response: {
        announcements: data
      }
    };

    const curState = fromJS({
      announcements: [],
      isFetching: true,
      error: 'some_error'
    });

    const expectedState = fromJS({
      announcements: data,
      isFetching: false,
      error: null
    });

    const nextState = reducer(curState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('handles FETCH_ANNOUNCEMENTS_REQUEST', () => {
    const action = {
      type: 'FETCH_ANNOUNCEMENTS_REQUEST'
    };

    const curState = fromJS({
      announcements: [],
      isFetching: false,
      error: 'some'
    });

    const expectedState = fromJS({
      announcements: [],
      isFetching: true,
      error: null
    });

    const nextState = reducer(curState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('handles FETCH_ANNOUNCEMENTS_FAILURE', () => {
    const action = {
      type: 'FETCH_ANNOUNCEMENTS_FAILURE',
      message: 'not found'
    };

    const curState = fromJS({
      announcements: [],
      isFetching: true,
      error: null
    });

    const expectedState = fromJS({
      announcements: [],
      isFetching: false,
      error: 'not found'
    });

    const nextState = reducer(curState, action);
    expect(nextState).to.equal(expectedState);
  });

});

describe('Announcement data selectors', () => {

  it('getIsFetching works', () => {
    const curState = fromJS({
      isFetching: true
    });

    expect(getIsFetching(curState)).to.equal(true);
  });

});
