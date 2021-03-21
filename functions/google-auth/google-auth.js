const { OAuth2Client } = require('google-auth-library')
const http = require('http')
const url = require('url')
const open = require('open')
const destroyer = require('server-destroy')
const config = require('./config')
exports.handler = function (event, context, callback) {
  /**
   * Start by acquiring a pre-authenticated oAuth2 client.
   */
  async function main() {
    const oAuth2Client = await getAuthenticatedClient()
    // Make a simple request to the People API using our pre-authenticated client. The `request()` method
    // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
    const url = 'https://people.googleapis.com/v1/people/me?personFields=names'
    const res = await oAuth2Client.request({ url })

    // After acquiring an access_token, you may want to check on the audience, expiration,
    // or original scopes requested.  You can do that with the `getTokenInfo` method.
    const tokenInfo = await oAuth2Client.getTokenInfo(
      oAuth2Client.credentials.access_token,
    )
    callback(null, {
      statusCode: 200,
      body: tokenInfo,
    })
  }

  /**
   * Create a new OAuth2Client, and go through the OAuth2 content
   * workflow.  Return the full client to the callback.
   */
  function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
      // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
      // which should be downloaded from the Google Developers Console.
      const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_AUTH_CLIENT_ID || config.GOOGLE_AUTH_CLIENT_ID,
        process.env.GOOGLE_AUTH_CLIENT_SECRET ||
          config.GOOGLE_AUTH_CLIENT_SECRET,
        'https://gocampme.netlify.app/dashboard',
      )
      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'online',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      })

      // Open an http server to accept the oauth callback. In this simple example, the
      // only request to our webserver is to /oauth2callback?code=<code>
      const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf('/oauth2callback') > -1) {
              // acquire the code from the querystring, and close the web server.
              const qs = new url.URL(req.url, 'http://localhost:3000')
                .searchParams
              const code = qs.get('code')
              res.end(
                'Authentication successful! Please return to the console.',
              )
              server.destroy()

              // Now that we have the code, use that to acquire tokens.
              const r = await oAuth2Client.getToken(code)
              // Make sure to set the credentials on the OAuth2 client.
              oAuth2Client.setCredentials(r.tokens)
              console.info('Tokens acquired.')
              resolve(oAuth2Client)
            }
          } catch (e) {
            reject(e)
          }
        })
        .listen(3001, () => {
          // open the browser to the authorize url to start the workflow
          open(authorizeUrl, { wait: false }).then((cp) => cp.unref())
        })
      destroyer(server)
    })
  }

  main().catch(console.error)
}