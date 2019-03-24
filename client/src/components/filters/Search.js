import React, { Component } from 'react'
import { ProductConsumer } from '../../context';

export default class Search extends Component {
  render() {

      return (
        <ProductConsumer>
        {(value) => {
            return (
              <div>
                <div className="input-field col s9">
                <input type="text" placeholder="search" onChange={(e) => {value.handleSearch(e)}}/>
                <label htmlFor="icon_prefix2">Search Song</label>
              </div>    
              <div className="input-field col s3">
                <button 
                onClick={(e) => {value.handleSubmit(e)}}
                className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">search</i>
               </button>
           </div>
              </div>
              )
        }}
         </ProductConsumer>
      )
    }
  }
  
