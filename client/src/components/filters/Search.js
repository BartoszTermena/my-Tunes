import React, { Component } from 'react'
import { ProductConsumer } from '../../context';

export default class Search extends Component {
  render() {

      return (
        <ProductConsumer>
        {(value) => {
            return (
              <>
                <input type="text" placeholder="search" onChange={(e) => {value.handleSearch(e)}}/>
                <button onClick={(e) => {value.handleSubmit(e)}}>Search</button>                
              </>
              )
        }}
         </ProductConsumer>
      )
    }
  }
  
