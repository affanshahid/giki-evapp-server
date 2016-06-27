/*eslint-env mocha*/
import { expect } from 'chai';
import express from 'express';
import multer from 'multer';
import glob from 'glob';
import { unlinkSync } from 'fs';
import { post, get } from 'superagent';

import config from '../../src/config';
import { getRouter as getModuleRouter } from '../../src/api/news';
import { News, sequelize } from '../../src/models';

describe('News API', () => {
  const baseUrl = `http://127.0.0.1:${config.port}`;
  const newsUrl = `${baseUrl}/news/`;
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
    News.truncate().then(() => {
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

  it('it loads all news', done => {
    News.bulkCreate([{
      title: 'Archery',
      description: 'Archery Competition'
    }, {
      title: 'Swimming',
      description: 'Swimming Competition'
    }]).then(() => {
      get(newsUrl, (err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed).to.have.property('newsList');
        const newsList = parsed.newsList;
        expect(newsList).to.have.lengthOf(2);
        expect(newsList[0].title).to.equal('Archery');
        expect(newsList[1].title).to.equal('Swimming');
        done();
      });
    });
  });

  it('returns an empty list if there is no news', done => {
    get(newsUrl, (err, res) => {
      expect(err).to.not.be.ok;
      expect(res).to.be.ok;
      let parsed;
      expect(() => {
        parsed = JSON.parse(res.text);
      }).to.not.throw();
      expect(parsed).to.have.property('newsList');
      expect(parsed.newsList).to.have.lengthOf(0);
      done();
    });
  });

  it('can save new news', done => {
    post(newsUrl)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .end((err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.be.ok;
        expect(parsed).to.have.property('news');
        expect(parsed.news.title).to.equal('Archery');
        expect(parsed.news.description).to.equal('Archery Competition');
        News.findOne().then(newsItem => {
          expect(newsItem.title).to.equal('Archery');
          expect(newsItem.description).to.equal('Archery Competition');
          done();
        });
      });
  });

  it('does not save extra data', done => {
    post(newsUrl)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
      .field('description', 'Archery Competition')
      .field('useless', 'useless')
      .end((err, res) => {
        expect(err).to.not.be.ok;
        expect(res).to.be.ok;
        let parsed;
        expect(() => {
          parsed = JSON.parse(res.text);
        }).to.not.throw();
        expect(parsed.success).to.be.ok;
        expect(parsed).to.have.property('news');
        expect(parsed.news.title).to.equal('Archery');
        expect(parsed.news.description).to.equal('Archery Competition');
        expect(parsed.news).to.not.have.property('useless');
        News.findOne().then(newsItem => {
          expect(newsItem.title).to.equal('Archery');
          expect(newsItem.description).to.equal('Archery Competition');
          expect(newsItem).to.not.have.property('useless');
          done();
        });
      });
  });

  it('errors out if the data sent is incomplete', done => {
    // no description
    post(newsUrl)
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'Archery')
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
        News.find().then(newsItem => {
          expect(newsItem).to.not.be.ok;
          done();
        });
      });
  });

  describe('Image API', () => {

    it('can accept image uploads', done => {
      post(newsUrl)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'Archery')
        .field('description', 'Archery Competition')
        .attach('image', './test/fixtures/dot.png')
        .end((err, res) => {
          expect(err).to.not.be.ok;
          expect(res).to.be.ok;
          let parsed;
          expect(() => {
            parsed = JSON.parse(res.text);
          }).to.not.throw();
          expect(parsed.success).to.be.ok;
          expect(parsed).to.have.property('news');
          expect(parsed.news.title).to.equal('Archery');
          expect(parsed.news.description).to.equal('Archery Competition');
          expect(parsed.news).to.have.property('fileUrl');
          News.findOne().then(newsItem => {
            expect(newsItem.title).to.equal('Archery');
            expect(newsItem.description).to.equal('Archery Competition');
            expect(newsItem).to.have.property('fileUrl');
            done();
          });
        });
    });

    it('allows uploaded files to be accessed', done => {
      post(newsUrl)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'Archery')
        .field('description', 'Archery Competition')
        .attach('image', './test/fixtures/dot.png')
        .end((err, res) => {
          expect(err).to.not.be.ok;
          expect(res).to.be.ok;
          let parsed;
          expect(() => {
            parsed = JSON.parse(res.text);
          }).to.not.throw();
          expect(parsed.success).to.be.ok;
          expect(parsed).to.have.property('news');
          expect(parsed.news.title).to.equal('Archery');
          expect(parsed.news.description).to.equal('Archery Competition');
          expect(parsed.news).to.have.property('fileUrl');
          News.findOne().then(newsItem => {
            expect(newsItem.title).to.equal('Archery');
            expect(newsItem.description).to.equal('Archery Competition');
            expect(newsItem).to.have.property('fileUrl');
            get(imageUrl + parsed.news.fileUrl, (err, res) => {
              expect(err).to.not.be.ok;
              expect(res).to.be.ok;
              expect(res).to.have.property('status', 200);
              done();
            });
          });
        });
    });

    it('returns an error if more than one image is uploaded', (done) => {
      post(newsUrl)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'Archery')
        .field('description', 'Archery Competition')
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
