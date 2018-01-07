export default class Config {
  static setUserData(data) {
    if (typeof data.authentication_token === "undefined") return
    localStorage.setItem("authentication_token", data.authentication_token)
  }  

  static getAuthenticationToken() {
    return localStorage.getItem("authentication_token")
  }

  static clearCredentials() {
    localStorage.removeItem("authentication_token")
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
