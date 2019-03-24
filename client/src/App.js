import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    songs: [],
    count: 0,
    search: '',
    offset: 0,
    per_page: 2,
    msg: ''
  }
  fetchSongs(){
    axios.get('http://localhost:8080/songs/')
    .then(res => {
      console.log(res)
      this.setState({
        songs: res.data.data,
        count: res.data.count
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  componentDidMount(){
    this.fetchSongs();
 }
 handleNext = () => {
   if(this.state.offset < this.state.count - this.state.per_page) {
   this.setState((prevState) => {
      return {offset: prevState.offset + 2}
   }, () => {
    const { offset, per_page } = this.state;
    let link;
    link = `http://localhost:8080/songs?offset=${offset}&per_page=${per_page}`
    axios.get(link)
    .then(res => {
      console.log(res)
      this.setState({
        songs: res.data.data,
        count: res.data.count
      })
    })
    .catch(err => {
      console.log(err)
    })
   })
  } else return
  }
  handlePrev = () => {
    if(this.state.offset > 0) {
    this.setState((prevState) => {
       return {offset: prevState.offset - 1}
    }, () => {
     const { offset, per_page } = this.state;
     let link;
     link = `http://localhost:8080/songs?offset=${offset}&per_page=${per_page}`
     axios.get(link)
     .then(res => {
       console.log(res)
       this.setState({
         songs: res.data.data,
         count: res.data.count
       })
     })
     .catch(err => {
       console.log(err)
     })
    })
   } else return
   }
   handleSearch = (e) => {
      this.setState({
        search: e.target.value
      }) 
   }
   handleSubmit = () => {
      console.log(this.state)
     const { search } = this.state;
     let link;
     link = `http://localhost:8080/songs?q=${search}`
     axios.get(link)
     .then(res => {
       if(res.data.data.length > 0) {
       this.setState({
         songs: res.data.data,
         count: res.data.count,
         msg: ''
       })
      } else {
        this.setState({
          msg: 'No result'
        })
      }
     })
     .catch(err => {
       console.log(err)
     }) 
  
    }
  render() {
    const { songs, count, msg } = this.state;
    
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
          <button onClick={() => this.handlePrev()}>prev</button>
          <button onClick={() => this.handleNext()}>next</button>
          <br />
          <input type="text" placeholder="search" onChange={this.handleSearch}/>
          <button onClick={this.handleSubmit}>Search</button>
          <br />
          {msg.length > 0 ? msg : null}
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
