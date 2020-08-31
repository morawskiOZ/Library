import { ContextProviderFactory } from '@limango/context-provider'
import { TranslationContextProvider } from '@limango/translation-provider'
import { WestLimangoTheme } from '@limango/ui/lib/Themes/WestLimangoTheme'
import { ThemeProvider } from '@material-ui/styles'
import * as PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import Cookies from 'universal-cookie/es6'
import { getTranslationGuesserForCountry } from '../../shared/translationGuessers'
import { TranslationProviderFactory } from '../../shared/translationProviderFactory'
import { makeStore } from './makeStore'
export const testWrapper1 = (Component: any, props = {}, state = {}) => {
  return function reduxWrap() {
    return (
      <Provider store={makeStore(state)}>
        <Component {...props} />
      </Provider>
    )
  }
}

const ContextProvider = ContextProviderFactory({
  childContextTypes: {
    language: PropTypes.string,
    cookies: PropTypes.any,
    apiCall: PropTypes.func,
    store: PropTypes.any
  }
})

export const testWrapper = <P extends object>(
  Component: React.ComponentType<P>,
  props = {},
  state = {}
) => {
  return class ComponentWithHooks extends React.Component<P> {
    translationProvider: any = TranslationProviderFactory([], getTranslationGuesserForCountry('de'))
    render() {
      return (
        <StaticRouter location={'/'}>
          <ContextProvider
            context={{
              language: 'de',
              cookies: new Cookies(),
              store: makeStore(state)
            }}
          >
            <Provider store={makeStore(state)}>
              <ThemeProvider theme={WestLimangoTheme}>
                <TranslationContextProvider translation={this.translationProvider} language={'de'}>
                  <Component {...this.props} />
                </TranslationContextProvider>
              </ThemeProvider>
            </Provider>
          </ContextProvider>
        </StaticRouter>
      )
    }
  }
}
