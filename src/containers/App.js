import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import axios from 'axios'
import '../css/index.css'


class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount() {
    this.getRobots()
  }

  async getRobots() {
      // const robots = await axios.get('https://jsonplaceholder.typicode.com/users');
      const robots  = await fetch('https://jsonplaceholder.typicode.com/users');
      const users   = await robots.json();

      this.setState({ robots: users })
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
  }

  render() {
    const {robots, searchField } = this.state
    const filteredRobots = robots.filter(robot => {

      return robot.name.toLowerCase().includes(
        searchField.toLowerCase()
      );
    });

    return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots}/>
        </Scroll>
      </div>
    )
  }
}

export default App;