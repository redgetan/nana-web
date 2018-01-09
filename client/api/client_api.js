import Frisbee from 'frisbee'
import Config from './../config/config'

export default class ClientAPI {
  static getInstance() {
    if (Config.isSignedIn()) {
      if (!this.authenticatedApi) {
        this.authenticatedApi = new Frisbee({
          baseURI: 'http://localhost:3000',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Token " + Config.getAuthenticationToken()

          }
        })
      }

      return this.authenticatedApi
    } else {
      if (!this.api) {
        this.api = new Frisbee({
          baseURI: 'http://localhost:3000',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      }

      return this.api
    }
  }

  static async signin(email, password) {
    let res = await this.getInstance().post('/users/signin', {
      body: {
        email: email,
        password: password
      }
    })

    return res
  }

  static async signup(email, password) {
    let res = await this.getInstance().post('/users', {
      body: {
        email: email,
        password: password
      }
    })

    return res
  }

  static listUsers() {
    return this.getInstance().get('/users')
  }

  static getUser(username) {
    return this.getInstance().get('/users/' + username)
  }

  static getUserAccount() {
    return this.getInstance().get('/account')
  }
}


