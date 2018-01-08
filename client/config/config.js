export default class Config {
  static setUserData(data) {
    if (!data.authentication_token) return
    localStorage.setItem("authentication_token", data.authentication_token)
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
    return localStorage.getItem("authentication_token")
  }

  static clearCredentials() {
    localStorage.removeItem("authentication_token")
    localStorage.removeItem("instagram_access_token")
  }

  static isSignedIn() {
    return localStorage.getItem("authentication_token") !== null
  }

  static getInstagramOAuthUrl() {
    return "https://api.instagram.com/oauth/authorize/?client_id=" + this.c().INSTAGRAM_CLIENT_ID +
                                                      "&redirect_uri=" + this.c().INSTAGRAM_REDIRECT_URI + 
                                                      "&state=" + this.getAuthenticationToken() + 
                                                      "&response_type=code"
  }

  static c() {
    return {
      INSTAGRAM_CLIENT_ID: "e1a7ed3d7af44eea8ccad4a5fced1bf5",
      INSTAGRAM_REDIRECT_URI: "http://redgetan.cc:3000/login/callback"
    }
  }


}
