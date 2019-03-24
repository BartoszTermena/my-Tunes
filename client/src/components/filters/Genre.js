import React, { Component } from 'react'
import { ProductConsumer } from '../../context';

export default class Genre extends Component {
  render() {

      return (
        <ProductConsumer>
        {(value) => {
            return (
              <>
                <select id="lang" onChange={(e) => {value.handleGenre(e)}}>
                    <option value="">All</option>
                    <option value="heavy_metal">Heavy Metal</option>
                    <option value="rap">Rap</option>
                </select>
              </>
              )
        }}
         </ProductConsumer>
      )
    }
  }
  
