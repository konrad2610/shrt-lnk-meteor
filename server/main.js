import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // Creating and registering new middleware function
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      // res.write('<p>Tinka moja malinka</p>');
      res.end(); // End HTTP request
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
