import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    songs: [],
    count: 0,
    hasNext: null,
    hasPrevious: null,
    next: null,
    previous: null
  }
  fetchSongs(){
    axios.get('http://localhost:8080/songs/')
    .then(res => {
      this.setState({
        songs: res.data.data.results,
        count: res.data.count,
        hasNext: res.data.data.hasNext,
        hasPrevious: res.data.data.hasPrevious,
        next: res.data.data.next,
        previous: res.data.data.previous
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  componentDidMount(){
    this.fetchSongs();
 }
 handlePagination = (e) => {
   let link;
   if (e === 'next'){
     link = `http://localhost:8080/songs?${e}=${this.state.next}`
   } else if (e === 'previous') {
    link = `http://localhost:8080/songs?${e}=${this.state.previous}`
   }
  axios.get(link)
  .then(res => {
    this.setState({
      songs: res.data.data.results,
      count: res.data.count,
      hasNext: res.data.data.hasNext,
      hasPrevious: res.data.data.hasPrevious,
      next: res.data.data.next,
      previous: res.data.data.previous
    })
  })
  .catch(err => {
    console.log(err)
  })
 }
  render() {
    const { songs, count, hasNext, hasPrevious, next, previous } = this.state;
    if( count > 0 ) {
      return (
        <div className="App">
          {
            songs.map(song => {
              return (
                <ul key={song._id}>
                  <li>{song.title}</li>
                </ul>
              )
            })
          } 
          <br />
          {count}
          <br />
          {hasNext ? <button onClick={() => this.handlePagination('next')}>next</button> : null}
          {hasPrevious ? <button onClick={() => this.handlePagination('previous')}>prev</button> : null}
        </div>
      );
    }
    else {
      return (
        <div>
          Loading...
        </div>
      )
    }
    
  }
}

export default App;
