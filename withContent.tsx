const withContent = <T extends any>(Component: React.ComponentType<T>, content: ReactElement, props: T) => {
    return () => (
      <Component {...props} >
        {content}
      </ Component>)
  }
  const buttonProps: FacebookButtonProps = {
    language,
    handleFacebookLoginClick,
    isLogin, isSubmitting, pageType
  }
  return withContent<FacebookButtonProps>(FacebookButton, renderContent(), buttonProps)()