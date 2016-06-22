/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import multer from 'multer';
import { post, get } from 'superagent';

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

  it('can save new modules', done => {
    post(url)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('startTime', '1466620272000')
      .field('endTime', '1466620272000')
      .field('locTag', 'H10')
      .end((err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.be.ok;
        expect(parsed).to.have.property('module');
        expect(parsed.module.title).to.equal('Archery');
        expect(parsed.module.description).to.equal('Archery Competition');
        expect(parsed.module).to.have.property('startTime');
        expect(parsed.module).to.have.property('endTime');
        Module.findOne().then(mod => {
          expect(mod.title).to.equal('Archery');
          expect(mod.description).to.equal('Archery Competition');
          done();
        });
      });
  });

  it('can accept image uploads', done => {
    post(url)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('startTime', '1466620272000')
      .field('endTime', '1466620272000')
      .field('locTag', 'H10')
      .attach('image', './test/fixtures/dot.png')
      .end((err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.be.ok;
        expect(parsed).to.have.property('module');
        expect(parsed.module.title).to.equal('Archery');
        expect(parsed.module.description).to.equal('Archery Competition');
        expect(parsed.module).to.have.propert('fileId');
        expect(parsed.module).to.have.property('startTime');
        expect(parsed.module).to.have.property('endTime');
        Module.findOne().then(mod => {
          expect(mod.title).to.equal('Archery');
          expect(mod.description).to.equal('Archery Competition');
          expect(mod).to.have.propert('fileId');
          done();
        });
      });
  });

  it('stores the correct time supplied as a timestamp', (done) => {
    post(url)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('startTime', '06-23-2016 1:10 AM UTC')
      .field('endTime', '06-23-2016 1:10 AM UTC+5')
      .field('locTag', 'H10')
      .end((err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.be.ok;
        expect(parsed).to.have.property('module');
        Module.findOne().then(mod => {
          expect(mod.title).to.equal('Archery');
          const startEpoch = new Date(mod.startTime).getTime();
          const endEpoch = new Date(mod.endTime).getTime();
          expect(startEpoch).to.equal(new Date('06-23-2016 1:10 AM UTC').getTime());
          expect(endEpoch).to.equal(new Date('06-23-2016 1:10 AM UTC+5').getTime());
          done();
        });
      });
  });

  it('stores the correct time supplied as epoch time', (done) => {
    post(url)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('startTime', '1466620272000')
      .field('endTime', '1466620272000')
      .field('locTag', 'H10')
      .end((err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.be.ok;
        expect(parsed).to.have.property('module');
        Module.findOne().then(mod => {
          expect(mod.title).to.equal('Archery');
          const startEpoch = new Date(mod.startTime).getTime();
          const endEpoch = new Date(mod.endTime).getTime();
          expect(startEpoch).to.equal(1466620272000);
          expect(endEpoch).to.equal(1466620272000);
          done();
        });
      });
  });

});
