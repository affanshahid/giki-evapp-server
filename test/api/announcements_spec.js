/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import wagner from 'wagner-core';
import {get } from 'superagent';

import { init as initConfig } from '../../src/config';
import { init as initModels } from '../../src/models';
import announcementsAPI from '../../src/api/announcements';

describe('Announcements API', () => {
  let Announcement;
  let server;

  before(done => {
    initConfig(wagner);
    initModels(wagner);

    Announcement = wagner.invoke(Announcement => Announcement);

    const subRouter = announcementsAPI(wagner);

    const app = express();
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

});
