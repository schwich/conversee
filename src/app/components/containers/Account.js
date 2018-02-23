import React from 'react';
import { connect } from 'react-redux';
import SubTab from '../general/SubTab';

class Account extends React.Component {

  static tabNames = {
    OVERVIEW: 'overview',
    YOUR_POSTS: 'your posts',
    YOUR_COMMENTS: 'your comments',
    SAVED_POSTS: 'saved posts',
    SAVED_COMMENTS: 'saved comments',
    UPVOTED: 'upvoted',
    DOWNVOTED: 'downvoted',
    hidden: ''
  }

  constructor(props) {
    super(props);

    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {

  }

  async onTabChange(tabName) {
    switch (tabName) {

    }
  }

  render() {
    return (
      <div className='user-account-container'>
        <h2>{this.props.username}</h2>
        <p>This will eventually have all of your account details.</p>
        <SubTab
          defaultTab='overview'
          onTabChange={this.onTabChange}
          tabs={
            [
              { name: 'overview' },
              { name: 'your posts' },
              { name: 'your comments' },
              { name: 'saved posts' },
              { name: 'saved comments' },
              { name: 'upvoted' },
              { name: 'downvoted' },
              { name: 'hidden' },
            ]}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    uid: state.user.uid
  }
}

export default connect(mapStateToProps)(Account);