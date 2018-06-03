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
      baseURI = "http://dev.nanapx.com:3000"
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

  static signup(attributes) {
    return this.post('/users', {
      body: attributes
    })
  }

  static listUsers(address) {
    return address ? this.get('/users?address=' + address) : this.get('/users')
  }

  static listBookings(address) {
    return this.get('/book_requests') 
  }

  static getUser(username) {
    return this.get('/users/' + username)
  }

  static getUserAccount() {
    return this.get('/account')
  }

  static getUserPhotos(user_id) {
    return this.get('/users/' + user_id + "/photos")
  }

  static updateUser(id, attributes) {
    return this.put('/users/' + id, {
      body: {
        user: attributes
      }
    })
  }

  static changeUserAvatar(id, avatar) {
    return this.put('/users/' + id + '/change_avatar', {
      body: {
        avatar: avatar
      }
    })
  }

  static applyAsPhotographer(id) {
    return this.post('/users/' + id + '/apply_as_photographer')
  }

  static toggleServices(id, isPhotographer) {
    return this.post('/users/' + id + '/toggle_services', {
      body: {
        is_photographer: isPhotographer
      }
    })
  }

  static getCurrentStep() {
    return this.get('/users/current_step')
  }

  static completeServicesStep(id, step) {
    return this.post('/users/' + id + '/complete_step', {
      body: {
        step_type: "my_services_step",
        step: step
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

  static createPhoto(attributes) {
    return this.post('/photos', {
      body: attributes
    })
  }

  static deletePhoto(photoId) {
    return this.post('/photos/' + photoId + "/delete")
  }

  static createMessage(attributes) {
    return this.post('/messages', {
      body: attributes
    })
  }

  static createBookRequest(attributes) {
    return this.post('/book_requests', {
      body: attributes
    })
  }

  static createPaymentMethod(attributes) {
    return this.post('/payment_methods', {
      body: attributes
    })
  }

  static s3Sign(attributes) {
    return this.post('/users/s3_sign', {
      body: attributes
    })
  }

  // needs cookie with access_token
  static signinViaHttpCookie() {
    // return this.post('/users/signin')

    const options = this.getDefaultOptions()

    return fetch(options.baseURI + '/users/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((body) => {
      return Promise.resolve({ body: body })
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


