const useStyles = makeStyles((theme) =>
  createStyles({
    underline: {
      borderBottom: '1px solid currentColor',
      display: 'inline-block',
      lineHeight: 0.85,
      textShadow: `
        "2px 2px ${theme.palette.background.default}"
        "2px -2px ${theme.palette.background.default}"
        "-2px 2px ${theme.palette.background.default}"
        "-2px -2px ${theme.palette.background.default}"`,
    },
  }),
)