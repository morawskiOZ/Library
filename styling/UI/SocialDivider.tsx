import React from 'react'

const useStyles = makeStyles((theme) =>
  createStyles({
    socialDivider: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'var(--auth-form-inner-width)',
    },
  }),
)


export default function SocialDivider() {
  return (
    <Box my={4} mb={4} className={classes.socialDivider}>
    <Box flex="1 0 auto">
      <Divider />
    </Box>
    <Box flex="0 0 50px">
      <Typography align="center" variant="body2">
        or
      </Typography>
    </Box>
    <Box flex="1 0 auto">
      <Divider />
    </Box>
    </Box>
  )
}


