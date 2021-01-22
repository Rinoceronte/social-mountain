import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();

    this.state = {search: ''};

    this.search = this.search.bind(this);
  }


  updateSearch(val){
    this.setState({search: val});
    this.props.search(val);
  }

  search(){
    this.props.search(this.state.search);
  }


  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={e => this.updateSearch(e.target.value)} />

          <SearchIcon id="Search__icon" onClick={this.search}/>
        </div>
        
      </section>
    )
  }
}