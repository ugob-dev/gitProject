
// import passport from 'passport'
const passport = require('passport')

function checkJwt() {
    return (request, response, next) => {
      passport.authenticate('jwt', (error, user) => {
        if (error || !user) {
          console.log("checkJwt error")
          return response
            .status(401)
            .json({ error })
        }
        next()
      })(request, response, next)

    }
    
  }
  
  export default checkJwt
    