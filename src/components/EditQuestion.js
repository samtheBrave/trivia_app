import React, { Component } from 'react';

import '../stylesheets/App.css';
import EditFormView from './EditFormView';
import $ from 'jquery';
 
const backend = 'https://triviasiabl.herokuapp.com/';

class EditQuestion extends Component {
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
     
      url: backend+`/questions?page_num=${this.state.page}`, //TODO: update request URL
      type: "GET",
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
      url: backend+`/categories/${id}/questions?page_num=${page}`, //TODO: update request URL
      headers: {
        'Authorization':'Bearer '+  this.props.location.token_data,   
        'Content-Type':'application/json'
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
 

  

  

  render() {
    
    
    return (
      
      <div className="question-view">
         
        <div className="questions-list">
          <h2>Questions</h2>
          {this.state.questions.map((q, ind) => (
            <EditFormView
              key={q.id}
              id={q.id}
              question={q.question}
              answer={q.answer}
              category={this.state.categories[q.category - 1]}
              difficulty={q.difficulty}
              authenticated={this.props.authenticated}
              role={this.props.role}
              token={this.props.location.token_data}

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

export default EditQuestion;
