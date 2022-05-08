import open from 'open'
import axios from 'axios'

export default class Deezer {
  async authorize(appId: string, perms: string): Promise<any> {
    try {
      const redirectUri = 'http://localhost:3001/auth/callback/deezer'

      // eslint-disable-next-line quotes
      const authorizeURL = `https://connect.deezer.com/oauth/auth.php?app_id=${appId}&redirect_uri=${redirectUri}&perms=${perms}`
      return await open(authorizeURL)
    } catch (error: any) {
      console.log('Error authorizing Deezer', error)
    }
  }

  async getToken(appId: string, secret: string, code: string): Promise<any> {
    try {
      const params = new URLSearchParams()
      params.append('app_id', appId)
      params.append('secret', secret)
      params.append('code', code)
      params.append('output', 'json')

      const data = await axios.request<any>(
        {
          method: 'POST',
          url: 'https://connect.deezer.com/oauth/access_token.php',
          data: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      return data
    } catch (error: any) {
      console.log('Could not get Deezer token', JSON.stringify(error.response.data, null, 2))
    }
  }

  async get(user: string, object: string, accessToken: string): Promise<any> {
    try {
      const data = await axios.request<any>(
        {
          method: 'GET',
          // eslint-disable-next-line quotes
          url: `https://api.deezer.com/user/${user}/${object}?access_token${accessToken}`,
        },
      )

      return data
    } catch (error: any) {
      console.log(error.response)
    }
  }

  async getTrack(id: string, accessToken: string): Promise<any> {
    try {
      const data = await axios.request<any>(
        {
          method: 'GET',
          // eslint-disable-next-line quotes
          url: `https://api.deezer.com/track/${id}?access_token${accessToken}`,
        },
      )

      return data
    } catch (error: any) {
      console.log(`Could not get track ${id}`, JSON.stringify(error.response.data, null, 2))
    }
  }

  async tracks(playlist: string, index: number, limit: number, accessToken: string): Promise<any> {
    try {
      const data = await axios.request<any>(
        {
          method: 'GET',
          // eslint-disable-next-line quotes
          url: `https://api.deezer.com/playlist/${playlist}/tracks?access_token${accessToken}&index=${index}&limit=${limit}`,
        },
      )

      return data
    } catch (error: any) {
      console.log(`Could not get tracks at index ${index}`, JSON.stringify(error.response.data, null, 2))
    }
  }
}
