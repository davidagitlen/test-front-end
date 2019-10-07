import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      snacks: [ { snackName: 'groats', delicious: 'Nah', cheap: 'You better believe it' }],
      error: ''
    }
  }

  componentDidMount() {
    this.fetchData(process.env.REACT_APP_BACKEND_URL + '/api/v1/snacks')
  }

  fetchData = async (url) => {
    try { 
    console.log('trying the fetch!', url)
    const snacks = await fetch(url);
    console.log(snacks)
    const parsedSnacks = await snacks.json();
    console.log(parsedSnacks)
    this.setState({snacks: [...this.state.snacks, ...parsedSnacks.snacks]})
    } catch (error) {
    this.setState({error})
    }
  }

  render() {
    const snackList = this.state.snacks.map(snack => {
      const {snackName, delicious, cheap} = snack;
      return <div className='snack-card' key={Date.now() + snackName}>
        <p>Snack Name: {snackName}</p>
        <p>Delicious: {delicious}</p>
        <p>Cheap? : {cheap}</p>
      </div>
    });
    console.log(this.state)
    return (
      <>
        <header className='App-header'><h1>Snack Ideas!</h1></header>
        <div className="App">
          {snackList}
        </div >
      </>
    );
  }
}

export default App;
