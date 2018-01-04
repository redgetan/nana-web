import Frisbee from 'frisbee'

export default class ClientAPI {
  static getInstance() {
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

  static async listUsers() {
    let res = await this.getInstance().get('/users')

    return res
  }
}


