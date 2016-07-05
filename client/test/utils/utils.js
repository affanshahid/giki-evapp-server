/*eslint-env mocha*/
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { sortByDate } from '../../src/utils/utils';

describe('Utilities', () => {

  describe('sortByDate', () => {
    it('sorts given List of Maps by `createdAt` key', () => {
      const testData = fromJS([
        {title: 'third', description: 'bar', createdAt:'02/02/1994 8:00', id:1},
        {title: 'last', description: 'bar', createdAt:'02/02/1990 8:00', id:4},
        {title: 'first', description: 'qux', createdAt:'02/04/1995 11:00', id:2},
        {title: 'second', description: 'JS', createdAt:'03/02/1994 12:00', id:3}
      ]);

      const sortedData = sortByDate(testData);
      expect(sortedData.size).to.equal(4);
      expect(sortedData.get(0).get('title')).to.equal('first');
      expect(sortedData.get(1).get('title')).to.equal('second');
      expect(sortedData.get(2).get('title')).to.equal('third');
      expect(sortedData.get(3).get('title')).to.equal('last');
    });
  });

});
