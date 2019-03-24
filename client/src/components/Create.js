import React, { Component } from 'react'
import { ProductConsumer } from '../context';


export default class Create extends Component {
  render() {
      return (
        <ProductConsumer>
        {(value) => {
            return (
                <div className="container container-footer">
                <div className="row center-align">
                    <h3>Add Song</h3>
                    <form className="col s12" onSubmit={(e) => {value.handleSubmitCreatedSong(e)}}>
                     <div className="row">
                        <div className="input-field col s6">
                        <input 
                        onChange={(e) => value.handleCreate(e)}
                        name="createdTitle" id="title" type="text"/>
                        <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-field col s6">
                        <input 
                        onChange={(e) => value.handleCreate(e)}
                        name="createdBy" id="createdBy" type="text"/>
                        <label htmlFor="createdBy">Created By</label>
                        </div>
                        <div className="col s12">
                        <label>Genre</label>
                        <select
                        className="browser-default"
                        name="createdGenre"
                        onChange={(e) => {value.handleCreate(e)}}>
                            <option value="heavy_metal">Heavy Metal</option>
                            <option value="rap">Rap</option>
                            <option value="pop">Pop</option>
                            <option value="rock">Rock</option>
                        </select>
                        </div>
                        <button 
                        className="btn waves-effect waves-light text-border-top " type="submit"
                        onClick={(e) => {value.handleSubmitCreatedSong(e)}} >Submit</button>
                    </div>
                    </form>
                </div>
                </div>
            )
        }}
         </ProductConsumer>
      )
    }
  }
  
