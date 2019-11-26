import React, { Component } from 'react';
import $ from 'jquery';
import '../stylesheets/FormView.css';
import Select  from 'react-dropdown-select'
const backend = 'https://cors-anywhere.herokuapp.com/https://triviasiabl.herokuapp.com';
const backend2 = 'https://triviasiabl.herokuapp.com';
import withUnmounted from '@ishawnwang/withunmounted'


class FormView extends Component {
  constructor(props){
    super();
    this.state = {
      question: "",
      answer: "",
      difficulty: 1,
      category: 1,
      categories: []
    }
    
     
     
     
  }
  
   

  componentDidMount(){
     
    $.ajax({
      url: backend+`/categories`,
      headers: {
        'Authorization':'Bearer '+ this.props.location.token_data,   
        'Content-Type':'application/json'
      }, //TODO: update request URL
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


  submitCategory = (id_data,type_cat) => {
    
    $.ajax({
      url: backend+'/new_category',
      beforeSend: function(xhrObj){
        //xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader("Access-Control-Allow-Headers","x-requested-with");
      }, 
      headers: {
        'Authorization':'Bearer '+ this.props.location.token_data,   
        'Content-Type':'application/json'
      },//TODO: update request URL
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        id: id_data,
        type: type_cat,
       
      }),
     
      success: (result) => {
        this.state.categories.push({id:id_data,type:type_cat})
        this.updatecategories(id_data)
        alert('New Category Added')
        return;
      },
      error: (error) => {
        alert('Unable to add Category. Please try your request again')
        return;
      }
    })
  }

  submitQuestion = (event) => {
    event.preventDefault();
    $.ajax({
      
      url: backend+'/new_questions', //TODO: update request URL
      type: "POST",
      beforeSend: function(xhrObj){
        //xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader("Access-Control-Allow-Headers","x-requested-with");
      },
      headers: {
        'Authorization':'Bearer '+ this.props.location.token_data,   
        'Content-Type':'application/json'
      },
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        question: this.state.question,
        answer: this.state.answer,
        difficulty: this.state.difficulty,
        category: this.state.category
      }),
      
      success: (result) => {
        document.getElementById("add-question-form").reset();
        return;
      },
      error: (error) => {
        alert('Unable to add question. Please try your request again')
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  updatecategories=(id) => {

    this.setState({ category: id})

  }



  render() {
    
     
    
    return (
      <div id="add-form">
        <h2>Add a New Trivia Question</h2>
        <form className="form-view" id="add-question-form" onSubmit={this.submitQuestion}>
          <label>
            Question
            <input type="text" name="question" onChange={this.handleChange}/>
          </label>
          <label>
            Answer
            <input type="text" name="answer" onChange={this.handleChange}/>
          </label>
          <label>
            Difficulty
            <select name="difficulty" onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          
          <label>Categories</label>
          <Select
            create
            onCreateNew={(item) =>{
              this.submitCategory(this.state.categories.slice(-1)[0].id+1,item.value)
              console.log('%c New item created ', 'background: #555; color: tomato', this.state.categories )}
            
            }
               
            options= { this.state.categories.map(cat => {
              return({label: cat.type,value:cat.id});
            })
            }
            dropdownPosition="bottom"
            dropdownHeight="300px"
            values={[]}
            onChange={ (value) => {
              
              this.updatecategories(value[0].value)
              
            }
          }
          />
          
      
          <input type="submit" className="button" value="Submit" />
        </form>
      </div>
    );
  }
}

export default FormView;
