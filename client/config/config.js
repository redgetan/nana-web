export default class Config {
  static setUserData(data) {
    if (!data.authentication_token) return
    localStorage.setItem("user", JSON.stringify(data))
  }  

  static setAccessToken(provider) {
    if (!this.getAccessToken(provider.name) && provider.access_token) {
      localStorage.setItem(provider.name + "_access_token", provider.access_token)
    }
  }

  static getAccessToken(provider_name) {
    return localStorage.getItem(provider_name + "_access_token")
  }

  static getAuthenticationToken() {
    return JSON.parse(localStorage.getItem("user")).authentication_token
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  static getPartnerAccount() {
    const user = this.getCurrentUser()
    return user.account
  }

  static clearCredentials() {
    localStorage.removeItem("user")
    localStorage.removeItem("instagram_access_token")
  }

  static isSignedIn() {
    return localStorage.getItem("user") !== null
  }

  static getInstagramOAuthUrl() {
    const currentUser = this.getCurrentUser()

    let url =  "https://api.instagram.com/oauth/authorize/?client_id=" + this.c().INSTAGRAM_CLIENT_ID +
                                                      "&redirect_uri=" + this.c().INSTAGRAM_REDIRECT_URI + 
                                                      "&response_type=code"
    if (currentUser) {
      url += "&state=" + this.getAuthenticationToken() 
    }

    return url
  }

  static getStripePublicKey() {
    return this.c().STRIPE_PUBLIC_KEY
  }

  static c() {
    if (process.env.NODE_ENV === "production") {
      return {
        INSTAGRAM_CLIENT_ID: "e1a7ed3d7af44eea8ccad4a5fced1bf5",
        INSTAGRAM_REDIRECT_URI: "https://5jbouftijk.execute-api.us-west-2.amazonaws.com/production/login/callback",
        STRIPE_PUBLIC_KEY: "pk_test_rirrDsVemD2s5DOmg1P4HccZ"
      }
    } else {
      return {
        INSTAGRAM_CLIENT_ID: "e1a7ed3d7af44eea8ccad4a5fced1bf5",
        INSTAGRAM_REDIRECT_URI: "http://dev.nanapx.com:3000/login/callback",
        STRIPE_PUBLIC_KEY: "pk_live_0SvoLzprLiFPyrhb1XUDCWRK"
      }
    }
  }


}
