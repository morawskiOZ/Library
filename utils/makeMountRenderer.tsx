import { mount } from 'enzyme'
import React from 'react'

export const makeMountRender = (Component: any, defaultProps = {}) => {
  return (customProps = {}) => {
    const props = {
      ...defaultProps,
      ...customProps
    }
    return mount(<Component {...props} />)
  }
}
