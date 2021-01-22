import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search = this.search.bind(this);
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results => {
      this.setState({
        posts: results.data
      });
    }).catch(() => {});
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then(results => {
      this.setState({posts: results.data});
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then( results => {
      this.setState({posts: results.data});
    });
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(results => {
      this.setState({posts: results.data});
    });
  }

  search(str){
    let filter = '';
    if(str !== ''){
      filter = `filter?text=${encodeURI(str)}`;
    }
    console.log(filter);
    
    axios.get(`https://practiceapi.devmountain.com/api/posts/${filter}`).then(results => {
      this.setState({posts: results.data});
    }).catch(() => this.setState({posts: []}));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header search={this.search}/>

        <section className="App__content">

          <Compose createPost={this.createPost} />
          {
            posts.map(post => <Post key={post.id} text={post.text} date={post.date} id={post.id} update={this.updatePost} deletefn={this.deletePost}/>)
          }

        </section>
      </div>
    );
  }
}

export default App;
