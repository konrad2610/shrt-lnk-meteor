import React from 'react';
import {Meteor} from 'meteor/meteor';

import PageContent from './PageContent';
import PrivateHeader from './PrivateHeader';

export default class Link extends React.Component {
  onEnterPrivatePage (props) {
    if (!Meteor.userId()) {
      props.history.replace('/');
    }
  }
  componentWillMount() {
    this.onEnterPrivatePage(this.props);
  }
  componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
          this.onEnterPrivatePage(nextProps);
      }
  }
  render () {
    return (
      <div>
        <PrivateHeader title='Your Links'/>
        <PageContent/>
      </div>
    );
  }
}
