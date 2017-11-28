const User = require('../db/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, err)
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, err)
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy