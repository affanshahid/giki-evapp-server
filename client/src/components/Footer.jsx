import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <footer className="clearfix">
        <section>
          <h3>GIKI Evapp</h3>
          <p>
            GIK Institute of Engineering Sciences and Technology
            <br />
            Topi (23640)
            <br />
            Khyber Pakhtunkhwa, Pakistan
            <br />
            <a href="http://www.giki.edu.pk" target="_blank">WEBSITE</a>
          </p>
        </section>
        <section className="apps">
          <h3>Download the App</h3>
          <div>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.affan.android.mediaproject&hl=en">
              <img width="150" src="https://storage.googleapis.com/support-kms-prod/D90D94331E54D2005CC8CEE352FF98ECF639" />
            </a>
          </div>
        </section>
        <section>
          <img width="150" src="/images/large.png" />
        </section>
        <div className="legal">
          Copyright (c) 2016 Affan Shahid All Rights Reserved
        </div>
      </footer>
    );
  }
}

export default Footer;
