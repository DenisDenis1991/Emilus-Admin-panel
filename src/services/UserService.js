import fetch from 'auth/FetchInterceptor'

const UserService = {}

UserService.fetchUsers = function (data) {
	return fetch({
		url: 'https://jsonplaceholder.typicode.com/users',
		method: 'GET',
		data: data
	})
}

export default UserService;