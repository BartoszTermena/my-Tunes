import React, { Component } from 'react'
import { ProductConsumer } from '../../context';

export default class Genre extends Component {
  render() {
      return (
        <ProductConsumer>
        {(value) => {
            return (
              <div>
                <label>Select Genre</label>
                
                <select
                className="browser-default"
                onChange={(e) => {value.handleGenre(e)}}>
                    <option value="">All</option>
                    <option value="heavy_metal">Heavy Metal</option>
                    <option value="rap">Rap</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                </select>
              </div>
              )
        }}
         </ProductConsumer>
      )
    }
  }
  
