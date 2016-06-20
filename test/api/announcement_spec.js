/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import { json } from 'body-parser';
import wagner from 'wagner-core';
import { post, get } from 'superagent';

import { init as initModels } from '../../src/models';
import announcementsAPI from '../../src/api/announcement';

describe('Announcement API', () => {
  let Announcement;
  let server;

  before(done => {
    wagner.factory('config', () => {
      return {
        port: 8001,
        env: 'development'
      };
    });

    initModels(wagner);

    Announcement = wagner.invoke(Announcement => Announcement);

    const subRouter = announcementsAPI(wagner);

    const app = express();

    app.use(json());
    app.use(subRouter);

    wagner.invoke((sequelize, config) => {
      sequelize.sync({ force: true }).then(() => {
        server = app.listen(config.port, () => {
          done();
        });
      });
    });
  });

  after(() => {
    server.close();
  });

  beforeEach(done => {
    Announcement.truncate().then(() => {
      done();
    });
  });

  it('loads all announcements', done => {
    Announcement.create({
      title: 'Archery Competition Delay',
      description: 'Delayed to 11:00 pm'
    }).then((anc) => {
      expect(anc).to.be.ok;
      const url = 'http://127.0.0.1:8001/announcement';

      get(url, (err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;

        let announcements;
        expect(() => {
          announcements = JSON.parse(res.text).announcements;
        }).to.not.throw();
        expect(announcements).to.have.lengthOf(1);
        expect(announcements[0].title).to.equal('Archery Competition Delay');
        expect(announcements[0].description).to.equal('Delayed to 11:00 pm');
        done();
      });
    });
  });

  it('returns an empty list when there are no announcements', done => {
    const url = 'http://127.0.0.1:8001/announcement';

    get(url, (err, res) => {
      expect(err).to.not.be.ok;
      expect(res).to.be.ok;

      let announcements;
      expect(() => {
        announcements = JSON.parse(res.text).announcements;
      }).to.not.throw();
      expect(announcements).to.have.lengthOf(0);
      done();
    });
  });

  it('can save new announcements', (done) => {
    const url = 'http://127.0.0.1:8001/announcement';

    post(url).send({
      title: 'Archery Competition Delay',
      description: 'Delayed to 11:00 pm'
    }).end((err, res) => {
      expect(err).to.not.be.ok;
      expect(res).to.be.ok;

      let parsedResponse;
      expect(() => {
        parsedResponse = JSON.parse(res.text);
      }).to.not.throw();
      const success = parsedResponse.success;
      const announcement = parsedResponse.announcement;

      expect(success).to.be.ok;
      expect(announcement).to.be.ok;
      expect(announcement).to.have.property('id');

      Announcement.findById(announcement.id).then(anc => {
        expect(anc).to.be.ok;
        expect(anc.title).to.equal('Archery Competition Delay');
        expect(anc.description).to.equal('Delayed to 11:00 pm');
        done();
      });
    });
  });

  it('does not save non-required data', (done) => {
    const url = 'http://127.0.0.1:8001/announcement';

    post(url).send({
      title: 'Archery Competition Delay',
      description: 'Delayed to 11:00 pm',
      extra: 'extra'
    }).end((err, res) => {
      expect(err).to.not.be.ok;
      expect(res).to.be.ok;

      let parsedResponse;
      expect(() => {
        parsedResponse = JSON.parse(res.text);
      }).to.not.throw();
      const success = parsedResponse.success;
      const announcement = parsedResponse.announcement;

      expect(success).to.be.ok;
      expect(announcement).to.be.ok;
      expect(announcement).to.have.property('id');
      expect(announcement).to.not.have.property('extra');

      Announcement.findById(announcement.id).then(anc => {
        expect(anc).to.be.ok;
        expect(anc.title).to.equal('Archery Competition Delay');
        expect(anc.description).to.equal('Delayed to 11:00 pm');
        done();
      });
    });
  });

  it('errors out if data sent to the server is incomplete', done => {
    const url = 'http://127.0.0.1:8001/announcement';

    post(url).send({}).end((err, res) => {
      expect(err).to.be.ok;
      expect(res).to.be.ok;

      let parsedResponse;
      expect(() => {
        parsedResponse = JSON.parse(res.text);
      }).to.not.throw();
      const success = parsedResponse.success;
      const error = parsedResponse.error;

      expect(success).to.not.be.ok;
      expect(error).to.be.ok;
      done();
    });
  });

});
