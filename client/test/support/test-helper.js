import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jsdom from 'jsdom';

chai.use(chaiImmutable);

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

for (let key of Object.keys(window)) {
  if (!(key in global)) {
    global[key] = window[key];
  }
}
