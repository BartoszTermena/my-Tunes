import React, { Component } from 'react'
import { ProductConsumer } from '../context';
import Search from './filters/Search'
import Genre from './filters/Genre'
import Pagination from './filters/Pagination'


export default class SongList extends Component {
  render() {
      return (
        <ProductConsumer>
        {(value) => {
            const {songs, count, msg } = value;
            let view;
            if(songs.length > 0) {
                view = (<div className="App">
                
                  { msg ? msg : 
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
                </div>)
            } else {
                view = <div>Loading...</div>
            }
            return (
                <>
                <Search />
                <Genre />
                {view}
                <Pagination />
                </>
            )
        }}
         </ProductConsumer>
      )
    }
  }
  
