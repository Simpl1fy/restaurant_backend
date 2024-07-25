const Employee = require('./Models/employee');
const passport = require('passport');
const localStratergy = require('passport-local').Strategy;

passport.use(new localStratergy(async (USERNAME, PASSWORD, done) => {
	try {
		// authentication logic
		const user = await Employee.findOne({username: USERNAME});
		if(!user) {
			return done(null, false, {'mesage': 'Incorrect Username'});
		}
		const isPasswordMatch = user.password === PASSWORD ? true: false;
		if(isPasswordMatch) {
			return done(null, user, {'message': 'Authentication Succesful'});
		} else {
			return done(null, false, {'message': 'Incorrect Password'});
		}
	} catch(err) {
		done(err)
	}
}))

module.exports = passport;