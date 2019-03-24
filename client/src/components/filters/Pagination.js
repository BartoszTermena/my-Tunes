import React, { Component } from 'react'
import { ProductConsumer } from '../../context';

export default class Pagination extends Component {
  render() {

      return (
        <ProductConsumer>
        {(value) => {
            return (
              <>
                <button onClick={() => value.handlePrev()}>prev</button>
                <button onClick={() => value.handleNext()}>next</button>
              </>
              )
        }}
         </ProductConsumer>
      )
    }
  }
  
