/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import multer from 'multer';
import { get } from 'superagent';

import config from '../../src/config';
import { getRouter as getModuleRouter } from '../../src/api/module';
import { Module, sequelize } from '../../src/models';

describe('Module API', () => {
  const url = 'http://127.0.0.1:8001/module';
  let server;

  before(done => {
    const parser = multer({ dest: './test/fixtures' });
    const subRouter = getModuleRouter(parser);

    const app = express();
    app.use(subRouter);

    sequelize.sync({ force: true }).then(() => {
      server = app.listen(config.port, () => {
        done();
      });
    });
  });

  after(() => {
    server.close();
  });

  beforeEach(done => {
    Module.truncate().then(() => {
      done();
    });
  });

  it('it loads all modules', done => {
    Module.bulkCreate([
      {
        title: 'Archery',
        description: 'Archery Competition',
        startTime: 1466620272000,
        endTime: 1466620272000,
        locTag: 'H10'
      },
      {
        title: 'Swimming',
        description: 'Swimming Competition',
        startTime: 1466620272000,
        endTime: 1466620272000,
        locTag: 'H9'
      }
    ]).then(() => {
      get(url, (err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed).to.have.property('modules');
        const modules = parsed.modules;
        expect(modules).to.have.lengthOf(2);
        expect(modules[0].title).to.equal('Archery');
        expect(modules[1].title).to.equal('Swimming');
        done();
      });
    });
  });

  it('returns an empty list if there are no modules', done => {
    get(url, (err, res) => {
      expect(err).to.not.be.ok;
      expect(res).to.be.ok;
      let parsed;
      expect(() => {
        parsed = JSON.parse(res.text);
      }).to.not.throw();
      expect(parsed).to.have.property('modules');
      expect(parsed.modules).to.have.lengthOf(0);
      done();
    });
  });

  

});
