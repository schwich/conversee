import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom'

import './SubTab.css';

export default class SubTab extends React.Component {

  static propTypes = {
    defaultTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })).isRequired,
    activeClassName: PropTypes.string, // (OPT) what css classname to add to the active tab
  }

  static defaultProps = {
    activeClassName: 'subtab-active-tab'
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.defaultTab
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  async handleTabChange(tabName) {
    this.setState({
      activeTab: tabName
    })

    this.props.onTabChange(tabName);
  }

  render() {
    let { defaultTab } = this.props;

    return (
      <div className='subtab-container'>
        <ul className='subtab-bar'>
          {
            this.props.tabs.map(tab => {
              return (
                <NavLink
                  key={tab.name}
                  to={tab.link}
                  exact
                  activeClassName='subtab-active-tab'>
                  <li
                    // className={this.state.activeTab === tab.name ? this.props.activeClassName : null}
                    onClick={() => { this.handleTabChange(tab.name) }}>
                    {tab.name}
                  </li>
                </NavLink>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
