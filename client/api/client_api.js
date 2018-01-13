import request from 'request-promise-native'
import Config from './../config/config'

export default class ClientAPI {
  static getOptions() {
    if (Config.isSignedIn()) {
      return this.getAuthenticationOptions()
    } else {
      return this.getDefaultOptions()
    }
  }

  static getAuthenticationOptions() {
    const options = this.getDefaultOptions() 
    options["headers"]["Authorization"] = "Token " + Config.getAuthenticationToken()
    return options
  }

  static getDefaultOptions() {
    return {
      baseURI: 'http://localhost:3000',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      },
      json: true,
      resolveWithFullResponse: true,
      simple: false
    }
  }

  static buildOptions(method, relativePath, additionalOptions) {
    const options = Object.assign({}, this.getOptions(), additionalOptions)
    options["method"] = method
    options["uri"] = options["baseURI"] + relativePath
    return options
  }

  static post(relativePath, additionalOptions) {
    const options = this.buildOptions("POST", relativePath, additionalOptions)
    return request(options)
  }

  static get(relativePath, additionalOptions) {
    const options = this.buildOptions("GET", relativePath, additionalOptions)
    return request(options)
  }

  static signin(email, password) {
    return this.post('/users/signin', {
      body: {
        email: email,
        password: password
      }
    })
  }

  static signup(email, password) {
    return this.post('/users', {
      body: {
        email: email,
        password: password
      }
    })
  }

  static listUsers() {
    return this.get('/users')
  }

  static getUser(username) {
    return this.get('/users/' + username)
  }

  static getUserAccount() {
    return this.get('/account')
  }

  static createReview(attributes) {
    return this.post('/reviews', {
      body: attributes
    })
  }
}


