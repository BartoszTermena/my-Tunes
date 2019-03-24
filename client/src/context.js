import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SongList from './components/SongList'

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    songs: [],
    count: 0,
    search: '',
    offset: 0,
    per_page: 2,
    msg: '',
    genre: '',
    createdTitle: '',
    createdGenre: '',
    createdBy: ''
  }
  fetchSongs(){
    axios.get('/songs')
    .then(res => {
      this.setState({
        songs: res.data.data,
        count: res.data.count,
        msg: ''
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  componentDidMount(){
    this.fetchSongs();
 }
 handleCreate = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  }) 
 }
 handleSubmitCreatedSong = e => {
    e.preventDefault();
    axios.post('/songs', {
      title: this.state.createdTitle,
      genre: this.state.createdGenre,
      createdBy: this.state.createdBy
    })
    .then(res => {
      this.fetchSongs()
      this.setState({
        createdTitle: '',
        createdGenre: '',
        createdBy: ''
      })
    })
    .catch(err => {
      console.log(err);
    });
 }
 handleNext = () => {
   if(this.state.offset < this.state.count - this.state.per_page) {
   this.setState((prevState) => {
      return {offset: prevState.offset + 2}
   }, () => {
    const { offset, per_page } = this.state;
    let link;
    link = `/songs?offset=${offset}&per_page=${per_page}`
    axios.get(link)
    .then(res => {
      this.setState({
        songs: res.data.data,
        count: res.data.count,
        msg: ''
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
       return {offset: prevState.offset - 2}
    }, () => {
     const { offset, per_page } = this.state;
     let link;
     link = `/songs?offset=${offset}&per_page=${per_page}`
     axios.get(link)
     .then(res => {
       console.log(res)
       this.setState({
         songs: res.data.data,
         count: res.data.count,
         msg: ''
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
     link = `/songs?q=${search}`
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
    handleGenre = e => {
      this.setState({
        genre: e.target.value
      }, () => {
        const { genre } = this.state;
        let link;
        link = `/songs?genre=${genre}`
        if(genre.length > 0) {
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
      } else {
        this.fetchSongs();
      }
      })
    }
  render() {
    return (
      <ProductContext.Provider 
      value={{
        ...this.state,
        handleCreate: this.handleCreate,
        handleSubmitCreatedSong: this.handleSubmitCreatedSong,
        fetchSongs: this.fetchSongs,
        handleNext: this.handleNext,
        handlePrev:this.handlePrev,
        handleSearch: this.handleSearch,
        handleSubmit: this.handleSubmit,
        handleGenre: this.handleGenre
      }}>
        <SongList />
      </ProductContext.Provider>
    )
    
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
