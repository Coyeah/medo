const Mock = require('mockjs');

const userLogin = {
  username: 'Coyeah Chen',
  email: 'Coyeah_chen@outlook.com',
  role: 'admin',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNveWVhaCBDaGVuIiwiZW1haWwiOiJDb3llYWhfY2hlbkBvdXRsb29rLmNvbSJ9.dXk5eIbyL8R4372YQskK4duD7c2bi8iUy4UW9qPho1M'
};

const userRegister = {
  status: 'ok'
}

Mock.mock('/api/user/login', 'post', userLogin);
Mock.mock('/api/user/register', 'post', userRegister);

export default {
  'POST /api/user/login': userLogin,
  'POST /api/user/register': userRegister,
}
