import { mergeDeepRight } from 'ramda'
import * as redux from 'redux'
import thunk from 'redux-thunk'
import { ActionModel } from '../../app/interfaces/ApplicationContext'
import { StoreModel } from '../../app/redux/IStore'
import rootReducer from '../../app/redux/reducers'

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  redux.compose

const middlewares: redux.Middleware[] = [thunk]

export const makeStore = (customState = {}) => {
  const root = rootReducer({}, { type: '@@INIT' })
  const state = mergeDeepRight(root, customState)
  return redux.createStore<StoreModel, ActionModel, {}, {}>(
    rootReducer,
    state,
    composeEnhancers(redux.applyMiddleware(...middlewares))
  )
}
