import React, { Component } from 'react'
import { ProductConsumer } from '../context';
import Search from './filters/Search'
import Genre from './filters/Genre'
import Pagination from './filters/Pagination'
import Loader from './loader/Loader'
import Create from './Create'

export default class SongList extends Component {
  render() {
      return (
        <ProductConsumer>
        {(value) => {
            const {songs, count, msg } = value;
            let view;
            if(songs.length > 0) {
                view = (<div className="App">
                
                  { msg ? <h3>{msg}</h3> : 
                    songs.map(song => {
                      return (
                        <ul key={song._id}>
                          <li>
                              <h4>{song.title}</h4>
                          </li>
                        </ul>
                      )
                    })
                  }
                  <br />
                  <Pagination />
                  <p className="flow-text">All songs: {count}</p>                
                </div>)
            } else {
                view = <div className="App">
                <Loader />
                </div>
            }
            return (
                <div className="container">
                <div className="row">
                    <div className="col s6">
                         <Genre />
                    </div>
                    <div className="col s6">
                        <Search />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                    {view}
                    </div>
                </div>
                  <Create />
                </div>
            )
        }}
         </ProductConsumer>
      )
    }
  }
  
