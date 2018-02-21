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
    let baseURI

    if (process.env.NODE_ENV === "production") {
      baseURI = "https://5jbouftijk.execute-api.us-west-2.amazonaws.com/production"
    } else {
      baseURI = "http://localhost:3000"
      // baseURI = "http://192.168.2.31:3000"
    }

    return {
      baseURI: baseURI,
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

  static put(relativePath, additionalOptions) {
    const options = this.buildOptions("PUT", relativePath, additionalOptions)
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

  static updateUser(id, attributes) {
    return this.put('/users/' + id, {
      body: {
        user: attributes
      }
    })
  }

  static postSMSVerification(csrf, code) {
    return this.post('/users/sms_verification', {
      body: {
        csrf: csrf,
        code: code
      }
    })
  }

  static createReview(attributes) {
    return this.post('/reviews', {
      body: attributes
    })
  }

  static createMessage(attributes) {
    return this.post('/messages', {
      body: attributes
    })
  }

  static getPartnerAccount(accountId) {
    return this.get('/partner_accounts/' + accountId)
  }

  static updatePartner(username, attributes) {
    let body = Object.assign({}, attributes, { user_id: username })

    return this.post('/partner_accounts', {
      body: body
    })
  }
}


