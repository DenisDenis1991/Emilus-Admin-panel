import UserService from 'services/UserService'
const { createProxyMiddleware } = require('http-proxy-middleware')
console.log(UserService)
module.exports = function(app) {
	app.use('/api', createProxyMiddleware({
			target: 'https://jsonplaceholder.typicode.com/users', // <--- config the url based on your backend server
			changeOrigin: true,
		})
	)
}
