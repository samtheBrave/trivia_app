import React, { Component } from 'react';

import '../stylesheets/App.css';
import Question from './Question';
import Search from './Search';
import $ from 'jquery';
const authConfig = require("./src/auth_config.json");

class QuestionView extends Component {
  constructor(props){
    super();
    this.state = {
      searchQuery: '',
      questions: [],
      page: 1,
      totalQuestions: 0,
      categories: [],
      currentCategory: null 
       
      
    }
     

  }
 
  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    $.ajax({
     
      url: authConfig.backend+`/questions?page_num=${this.state.page}`, //TODO: update request URL
      type: "GET",
      headers: {
        "accept": "application/json",
        "Access-Control-Request-Headers":"*"
      },
      success: (result) => {
        this.setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          categories: result.categories,
          currentCategory: result.current_category })
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  selectPage(num) {
    if (this.state.currentCategory) {
      this.getByCategory(this.state.currentCategory.id, num)
    } else if (this.state.searchQuery) {
      this.submitSearch(this.state.searchQuery, num)
    } else {
      this.setState({page: num}, () => this.getQuestions());
    }
  }

  createPagination(){
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalQuestions / 10)
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === this.state.page ? 'active' : ''}`}
          onClick={() => {this.selectPage(i)}}>{i}
        </span>)
    }
    return pageNumbers;
  }

  getByCategory= (id, page = 1) => {
    $.ajax({
      url: authConfig.backend+`/categories/${id}/questions?page_num=${page}`, //TODO: update request URL
      headers: {
        'Authorization':'Bearer '+ this.props.token,   
        'Content-Type':'application/json',
        "accept": "application/json",
        "Access-Control-Request-Headers":"*"
      },
      type: "GET",
      success: (result) => {
        this.setState({
          page: page,
          questions: result.questions,
          totalQuestions: result.total_questions,
          currentCategory: result.current_category })
        return;
      },
      error: (error) => {
        alert('No Permission to search by Categories. Please login')
        return;
      }
    })
  }

  submitSearch = (searchTerm,page=1) => {
    $.ajax({
      url: authConfig.backend+`/searchquestions?page_num=${page}`, //TODO: update request URL
      type: "POST",
      dataType: 'json',
      headers: {
        "accept": "application/json",
        "Access-Control-Request-Headers":"*"
      },
      contentType: 'application/json',
      data: JSON.stringify({searchTerm: searchTerm}),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        this.setState({
          searchQuery: searchTerm,
          page: page,
          questions: result.questions,
          totalQuestions: result.total_questions,
          currentCategory: result.current_category
        });
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  questionAction = (id) => (action) => {
    if(action === 'DELETE') {
      if(window.confirm('are you sure you want to delete the question?')) {
        $.ajax({
          url:authConfig.backend+ `/questions/${id}`, //TODO: update request URL
          headers: {
            'Authorization':'Bearer '+ this.props.token,   
            'Content-Type':'application/json',
            "accept": "application/json",
            "Access-Control-Request-Headers":"*"
          },
          type: "DELETE",
          success: (result) => {
            this.getQuestions();
          },
          error: (error) => {
            alert('You don not have permission to delete')
            return;
          }
        })
      }
    }
  }

  render() {
    
    
    return (
      
      <div className="question-view">
        <div className="categories-list">
          <h2 onClick={() => {this.getQuestions()}}>Categories</h2>
          <ul>
            {this.state.categories.map((category) => (
              <li key={category.id} onClick={() => {this.getByCategory(category.id)}}>
                {category.type}
                <img className="category" src={`${category.type.toLowerCase()}.svg`}/>
              </li>
            ))}
          </ul>
          <Search submitSearch={this.submitSearch}/>
        </div>
        <div className="questions-list">
          <h2>Questions</h2>
          {this.state.questions.map((q, ind) => (
            <Question
              key={q.id}
              question={q.question}
              answer={q.answer}
              category={this.state.categories[q.category - 1]}
              difficulty={q.difficulty}
              questionAction={this.questionAction(q.id)}
              authenticated={this.props.authenticated}
              role={this.props.role}
            />
          ))}
          <div className="pagination-menu">
            {this.createPagination()}
          </div>
        </div>

      </div>
    );
  }
}

export default QuestionView;
