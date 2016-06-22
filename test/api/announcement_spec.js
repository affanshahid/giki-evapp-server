/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import multer from 'multer';
import { post, get } from 'superagent';

import config from '../../src/config';
import { getRouter as getAnnouncementRouter } from '../../src/api/announcement';
import { Announcement, sequelize } from '../../src/models';

describe('Announcement API', () => {
  const url = 'http://127.0.0.1:8001/announcement';
  let server;

  before(done => {
    const parser = multer({ dest: './test/fixtures' });
    const subRouter = getAnnouncementRouter(parser);

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

    post(url)
      .field('title', 'Archery Competition Delay')
      .field('description', 'Delayed to 11:00 pm')
      .set('Content-Type', 'multipart/form-data')
      .end((err, res) => {
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

    post(url)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery Competition Delay')
      .field('description', 'Delayed to 11:00 pm')
      .field('extra', 'extra')
      .end((err, res) => {
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
          expect(anc).to.not.have.property('extra');
          done();
        });
      });
  });

  it('errors out if data sent to the server is incomplete', done => {

    const req = post(url)
      .set('Content-Type', 'multipart/form-data');
    // workaround for sending an empty multipart request,
    // initializes the form-data
    req._getFormData();
    //
    req.end((err, res) => {
      expect(err).to.be.ok;
      expect(err.status).to.equal(400);
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
