/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import multer from 'multer';
import glob from 'glob';
import { unlinkSync } from 'fs';
import { post, get } from 'superagent';

import config from '../../src/config';
import { getRouter as getModuleRouter } from '../../src/api/module';
import { Module, sequelize } from '../../src/models';

describe('Module API', () => {
  const baseUrl = `http://127.0.0.1:${config.port}`;
  const moduleUrl = `${baseUrl}/module/`;
  const imageUrl = `${baseUrl}/image/`;
  let server;

  before(done => {
    const parser = multer(config.multerOpts);
    const subRouter = getModuleRouter(parser);

    const app = express();
    app.use(subRouter);
    app.use('/image/', express.static('./test/fixtures/data/images/'));
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

  afterEach(() => {
    glob('test/fixtures/data/images/*', (err, files) => {
      for (let file of files) {
        unlinkSync(file);
      }
    });
  });

  it('it loads all modules', done => {
    Module.bulkCreate([{
      title: 'Archery',
      description: 'Archery Competition',
      startTime: 1466620272000,
      endTime: 1466620272000,
      locTag: 'H10'
    }, {
      title: 'Swimming',
      description: 'Swimming Competition',
      startTime: 1466620272000,
      endTime: 1466620272000,
      locTag: 'H9'
    }]).then(() => {
      get(moduleUrl, (err, res) => {
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
    get(moduleUrl, (err, res) => {
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
    post(moduleUrl)
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

  it('stores the correct time supplied as a timestamp', (done) => {
    post(moduleUrl)
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
    post(moduleUrl)
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

  it('does not save extra data', done => {
    post(moduleUrl)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('startTime', '1466620272000')
      .field('endTime', '1466620272000')
      .field('useless', 'useless')
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
        expect(parsed.module).to.not.have.property('useless');
        Module.findOne().then(mod => {
          expect(mod.title).to.equal('Archery');
          expect(mod.description).to.equal('Archery Competition');
          expect(mod).to.not.have.property('useless');
          done();
        });
      });
  });

  it('errors out if the data sent is incomplete', done => {
    // no loctag
    post(moduleUrl)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('startTime', '1466620272000')
      .field('endTime', '1466620272000')
      .end((err, res) => {
        expect(err).to.be.ok;
        expect(err.status).to.equal(400);
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.not.be.ok;
        expect(parsed).to.have.property('error');
        Module.find().then(mod => {
          expect(mod).to.not.be.ok;
          done();
        });
      });
  });

  describe('Image API', () => {

    it('can accept image uploads', done => {
      post(moduleUrl)
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
          expect(parsed.module).to.have.property('fileUrl');
          expect(parsed.module).to.have.property('startTime');
          expect(parsed.module).to.have.property('endTime');
          Module.findOne().then(mod => {
            expect(mod.title).to.equal('Archery');
            expect(mod.description).to.equal('Archery Competition');
            expect(mod).to.have.property('fileUrl');
            done();
          });
        });
    });

    it('allows uploaded files to be accessed', done => {
      post(moduleUrl)
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
          expect(parsed.module).to.have.property('fileUrl');
          expect(parsed.module).to.have.property('startTime');
          expect(parsed.module).to.have.property('endTime');
          Module.findOne().then(mod => {
            expect(mod.title).to.equal('Archery');
            expect(mod.description).to.equal('Archery Competition');
            expect(mod).to.have.property('fileUrl');
            get(imageUrl + parsed.module.fileUrl, (err, res) => {
              expect(err).to.not.be.ok;
              expect(res).to.be.ok;
              expect(res).to.have.property('status', 200);
              done();
            });
          });
        });
    });

    it('returns an error if more than one image is uploaded', (done) => {
      post(moduleUrl)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'Archery')
        .field('description', 'Archery Competition')
        .field('startTime', '1466620272000')
        .field('endTime', '1466620272000')
        .field('locTag', 'H10')
        .attach('image', './test/fixtures/dot.png')
        .attach('image', './test/fixtures/dot.png')
        .end((err, res) => {
          expect(err).to.be.ok;
          expect(res).to.be.ok;
          expect(res).to.have.property('status', 500);
          done();
        });
    });

  });

});
