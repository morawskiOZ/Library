const checkErrors = <N, >(formName: keyof N, inputName: keyof N[keyof N], errors: NestDataObject<N>): boolean => {
    return dirty && touched && touched[name] && errors[formName] && !!errors[formName][name]
  }

  const getError = (formName: string, inputName: string, errors: any): string | undefined => {
    return errors[formName] && errors[formName][name]
  }

  const emailErrors = checkErrors<RegisterFormErrors>('registerForm', 'email', errors)