import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

import IssueList from './IssueList';
import FullIssue from './FullIssue';


class App extends Component {
  state = {
    user: "",
    repo: "",
    issues: [],
    perPage: 10,
    page: 1,
    links:"",
    loading: false,
    error: "",
    repos: [],
    autocomplete: false
  }
  
  onChangeHandler = (e) => {
    this.setState({
     [e.target.name]: e.target.value,
     error: "",
     links: ""
    });
  }
  
  onSubmitHandler = (e) => {
    if(e) {
      e.preventDefault();
    }
    const { user, repo, perPage } = this.state;
    if (!user || !repo) {
       this.setState({
          error: "Пожалуйста заполните поля"
        });
      return;
    }
    this.setState({
      loading: true,
      autocomplete:false
    });
    
    axios.get(`https://api.github.com/repos/${user}/${repo}/issues?per_page=${perPage}&page=1`)
    .then(response => {
      const error = response.data.length > 0 ? "" : "Для данного репозитория нету открытых обращений";
      this.setState({
        issues: response.data,
        links: response.headers.link,
        loading: false,
        page: 1,
        error
      });
    }).catch(e => {
      this.setState({
        loading: false,
        error: "Ошибка. Попробуйте еще раз"
      });
    });
    
  }
  
  onBlurHandler = () => {
    const { user } = this.state;
    axios.get(`https://api.github.com/users/${user}/repos?per_page=100`)
    .then(response => {
      this.setState({
        repos: response.data
      });
    }).catch(e => {
    });
  }
  
  onFocusHandler = () => {
    this.setState({
      autocomplete: true
    });
  }
  
  onClickHandler = (page) => {
    const { user, repo, perPage } = this.state;
    if (!user || !repo) {
       this.setState({
          error: "Пожалуйста заполните поля"
        });
      return;
    }
    this.setState({
      loading: true
    });
    
    axios.get(`https://api.github.com/repos/${user}/${repo}/issues?per_page=${perPage}&page=${page}`)
    .then(response => {
      this.setState({
        issues: response.data,
        links: response.headers.link,
        loading: false,
        page
      });
    }).catch(e => {
      this.setState({
        loading: false,
        error: "Ошибка. Попробуйте еще раз"
      });
    });
  }
  
  autocompleteHandler = (e) => {
    this.setState({
      repo: e.currentTarget.textContent
    }, () => this.onSubmitHandler());
  }
  
  autocompleteOnBlurHandler = () => {
    this.setState({
      autocomplete: false
    });
  }
  
  render() {
    return (
      <div className="app">
        
        {this.state.loading && <div className="loading"><div className="loader">Loading...</div></div>}
         
        <form onSubmit={this.onSubmitHandler}>
       
        <input autoComplete="off"
               placeholder="Имя пользователя" 
               type="text" 
               name="user" 
               value={this.state.user} 
               onBlur={this.onBlurHandler} 
               onChange={this.onChangeHandler}
        />
               
        <select name="perPage" onChange={this.onChangeHandler}>
          <option value="10">Кол-во обращений</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        
        <input autoComplete="off"
               placeholder="Название репозитория"
               ref="x" type="text"
               name="repo"
               value={this.state.repo}
               onBlur={this.autocompleteOnBlurHandler}
               onFocus={this.onFocusHandler}
               onChange={this.onChangeHandler}
        />
               
        <button onMouseDown={this.onSubmitHandler}>Поиск</button>
        
        <div className="wrapper">
        {this.state.autocomplete && <div className="folding-list"> 
        {this.state.repos.filter(repo => repo.name.indexOf(this.refs.x.value) > -1).map(repo => <div key={repo.name} onMouseDown={this.autocompleteHandler}>{repo.name}</div>)}
        </div> }
        
        </div>
        
        </form>
        
        <div className="error">{this.state.error}</div>
        
        {this.state.loading &&  (<Redirect to="/" push/>)}
        
        <Route exact path="/"  render={() => <IssueList issues={this.state.issues} 
                                                        links={this.state.links} 
                                                        page={this.state.page} 
                                                        clickHandler={this.onClickHandler}/>} />
                                                        
        <Route path="/:id" render={({match}) => <FullIssue issue={this.state.issues.find(issue=> issue.id === parseInt(match.params.id,10))} />}/>
      </div>
    );
  }
}

export default App;
