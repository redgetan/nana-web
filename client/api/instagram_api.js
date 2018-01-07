import Frisbee from 'frisbee'
import Config from './../config/config'

export default class InstagramAPI {
  static getInstance() {
    if (!this.api) {
      this.api = new Frisbee({
        baseURI: 'https://api.instagram.com/v1',
        headers: {
          'Accept': 'application/json'
        }
      })
    }

    return this.api
  }

  static getSelfMediaRecent() {
    const accessToken = Config.getAccessToken("instagram")
    return this.getInstance().get(`users/self/media/recent/?access_token=${accessToken}&count=5`)
  }

}
