'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://122.228.14.21:8689"', //测试服
  login:'"http://localhost:8989/login"'
})
