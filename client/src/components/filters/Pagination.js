import React, { Component } from 'react'
import { ProductConsumer } from '../../context';

export default class Pagination extends Component {
  render() {
      return (
        <ProductConsumer>
        {(value) => {
            return (
              <div className="center-align text-border-top">
                {value.offset <= 0 ? (<button disabled
                className="btn waves-effect waves-light" type="submit" name="action"
                >
                <i className="material-icons left">arrow_back</i>
                prev
                </button>) : (<button 
                className="btn waves-effect waves-light" type="submit" name="action"
                onClick={() => value.handlePrev()}>
                <i className="material-icons left">arrow_back</i>
                prev
                </button>)}
                {value.offset < value.count - value.per_page ? (<button 
                className="btn waves-effect waves-light" type="submit" name="action"
                onClick={() => value.handleNext()}>
                <i className="material-icons right">arrow_forward</i>
                next
                </button>) : (<button disabled
                className="btn waves-effect waves-light" type="submit" name="action"
                >
                <i className="material-icons right">arrow_forward</i>
                next
                </button>)}
                
              </div>
              )
        }}
         </ProductConsumer>
      )
    }
  }
  
