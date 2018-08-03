import { createStore, combineReducers, applyMiddleware } from 'redux';
import { identity } from 'lodash';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import fetchQuestions from './sagas/fetch-questions';
import fetchQuestion from './sagas/fetch-question';
import * as reducers from './reducers';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';

export default function(history, defaultState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = routerMiddleware(history);
  const middlewareChain = [middleware, sagaMiddleware];
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewareChain.push(logger);
  }
  const store = createStore(combineReducers({
      ...reducers,
      router
    }), defaultState, applyMiddleware(...middlewareChain));
  sagaMiddleware.run(fetchQuestions);
  sagaMiddleware.run(fetchQuestion);
  return store;
};
