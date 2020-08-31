import * as React from 'react'
import { TranslationContextProvider, useTranslator } from '@limango/translation-provider'
import { Footer } from '@limango/footer'
import { default as translationsDE } from '@limango/footer/src/assets/translation/de.json'
import { default as translationsPL } from '@limango/footer/src/assets/translation/pl.json'
import { default as translationsFR } from '@limango/footer/src/assets/translation/fr.json'
import { default as translationsNL } from '@limango/footer/src/assets/translation/nl.json'
import { translationProvider } from '@limango/footer/src/helpers/translations'

import {LANGUAGE} from '@limango/footer/src/interfaces/Language'
import { useParameter } from '@storybook/addons'
import { WestLimangoTheme } from '@limango/ui/src/Themes/WestLimangoTheme'
import { limangoPLTheme } from '@limango/ui/src/Themes/LimangoPLTheme'

export default {
  title: 'Footer',
  component: Footer,
  parameters: { language: LANGUAGE.DE},
  decorators: [
    StoryFn => {
      const theme = useParameter('theme')
      const translator = useTranslator()
      return StoryFn({ translator, theme })
    },
    (StoryFn, { parameters }) => {
      return (
        <TranslationContextProvider
          translation={translationProvider(parameters.language, parameters.translations)}
          language={parameters.language}
        >
          <StoryFn />
        </TranslationContextProvider>
      )
    }
  ]
}

export const FooterDE = props => {
  return <Footer {...props} />
}

export const FooterPL = props => {
  return <Footer {...props} />
}
FooterPL.story = {
  parameters: {
    language: LANGUAGE_PL,
    translations: translationsPL,
    theme: limangoPLTheme
  }
}

export const FooterNL = props => {
  return <Footer {...props} />
}
FooterNL.story = {
  parameters: {
    language: LANGUAGE_NL,
    translations: translationsNL
  }
}

export const FooterFR = props => {
  return <Footer {...props} />
}
FooterFR.story = {
  parameters: {
    language: LANGUAGE_FR,
    translations: translationsFR
  }
}
