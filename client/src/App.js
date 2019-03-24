import React, { Component } from 'react'
import {ProductProvider} from './context'

export default class App extends Component {
  render() {
    return (
      <div>
        <ProductProvider />
      </div>
    )
  }
}
