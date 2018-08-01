import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './components/question-list';
import QuestionDetail from './components/question-detail';
import { Route, Link } from 'react-router-dom';

const AppDisplay = () => (
  <div>
    <h1>
      <Link to={"/"}>
        Isomorphic React
      </Link>
    </h1>
    <div>
      <Route exact path="/" render={ () => <QuestionList /> }/>
      <Route exact path="/questions/:id"
              render={ ({match}) => <QuestionDetail question_id={match.params.id} /> }
      />
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
};
//export default AppDisplay;
export default connect(mapStateToProps)(AppDisplay);
