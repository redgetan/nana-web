import request from 'request-promise-native'
import Config from './../config/config'

export default class InstagramAPI {
  static getOptions() {
    return {
      baseURI: 'https://api.instagram.com/v1/',
      headers: {
        'Accept': 'application/json'
      },
      json: true,
      resolveWithFullResponse: true
    }
  }

  static buildOptions(method, relativePath, additionalOptions) {
    const options = Object.assign({}, this.getOptions(), additionalOptions)
    options["method"] = method
    options["uri"] = options["baseURI"] + relativePath
    return options
  }

  static get(relativePath, additionalOptions) {
    const options = this.buildOptions("GET", relativePath, additionalOptions)
    return request(options)
  }

  static getSelfMediaRecent() {
    const accessToken = Config.getAccessToken("instagram")
    return this.get(`users/self/media/recent/?access_token=${accessToken}&count=5`)
  }

}
