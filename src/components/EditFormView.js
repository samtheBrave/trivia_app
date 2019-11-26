import React, { Component } from 'react';
import $ from 'jquery';
import '../stylesheets/EditFormView.css';
const backend = 'https://cors-anywhere.herokuapp.com/https://triviasiabl.herokuapp.com';

class EditFormView extends Component {
  constructor(props){
    super();
     
    this.state = {
      id: props.id,
      question: props.question,
      answer: props.answer,
      difficulty: props.difficulty,
      category: props.category["id"],
      categories: []
    }

    
     
  }
  
  componentDidMount(){
     
    $.ajax({
      url: backend+`/category`,
       //TODO: update request URL
      type: "GET",
      success: (result) => {
        this.setState({ categories: result.categories })
        return;
      },
      error: (error) => {
        alert('Unable to load categories. Please try your request again')
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  submitQuestion = (event) => {
    event.preventDefault();
     
     $.ajax({
      
      url: backend+'/update_questions/'+this.state.id, //TODO: update request URL
      type: "PATCH",
      headers: {
        'Authorization':'Bearer '+ this.props.token,   
        'Content-Type':'application/json'
      },
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        id: this.state.id,
        question: this.state.question,
        answer: this.state.answer,
        difficulty: this.state.difficulty,
        category: this.state.category
      }),
       
      success: (result) => {
        
       // document.getElementById("add-question-form").reset();

        alert('Data updated !')

        return;
      },
      error: (error) => {
        alert('Unable to add question. Please try your request again')
        return;
      }
    })
  }

   



  render() {
    
    const { id, question, answer, category, difficulty , authenticated, role} = this.props;
   
    
    return (
      <div id="add-form">
        <h2>Edit Trivia Question</h2>
        <form className="form-view" id="add-question-form" onSubmit={this.submitQuestion}>
          <label>
            Question
            <input type="text" name="question" defaultValue={question} onChange={this.handleChange}/>
          </label>
          <label>
            Answer
            <input type="text" name="answer" defaultValue={answer} onChange={this.handleChange}/>
          </label>
          <label>
            Difficulty
            <select name="difficulty" defaultValue={difficulty} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          
          <label>
            Category
            <select name="category"   onChange={this.handleChange}>
              {this.state.categories.map((category) => {
                  if (category.id === this.state.category) 
                  return (
                    <option key={category.id} selected value={category.id}>{category.type}</option>
                  )
                  else return (
                    <option key={category.id} value={category.id}>{category.type}</option>
                  )
                })
                } 
                 
            </select>
          </label>
          
      
          <input type="submit" className="button" value="Update" />
        </form>
      </div>
    );
  }
}

export default EditFormView;
