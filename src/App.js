import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import AddView from "./components/FormView";
import Quizview from "./components/QuizView";
import EditQuestion from "./components/EditQuestion";
import ExternalApi from "./views/ExternalApi";
import QuestionView from "./components/QuestionView"
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading,isAuthenticated, Role,Token_data} = useAuth0();
  
  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
     
      <div id="app" className="d-flex flex-column h-100">
        
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route exact path="/" render={props => <QuestionView authenticated={isAuthenticated} role={Role} token={Token_data} {...props} />} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/addview" component={AddView} />
            <Route path="/quizview" component={Quizview} />
            <Route path="/quizview" component={Quizview} />
            <Route path="/editquestion" component={EditQuestion} />

            {/* <Route exact path="/editquestion" render={props => <EditQuestion authenticated={isAuthenticated} role={Role} token={Token_data} {...props} />} /> */}
 

            EditQuestion
          </Switch>
        </Container>
        <Footer />
      </div>
     
       
    </Router>
  );
};

export default App;
