import open from 'open'
import axios from 'axios'

const REDIRECT_URI = 'http://localhost:3001/auth/callback/spotify'

export default class Spotify {
  async authorize(clientId: string): Promise<any> {
    try {
      const scope = 'user-library-modify user-library-read'

      // eslint-disable-next-line quotes
      const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}`
      return await open(authorizeURL)
    } catch (error: any) {
      console.log('Error authorizing Spotify', error.response)
    }
  }

  async geToken(code: string, clientId: string, clientSecret: string): Promise<any> {
    try {
      const params = new URLSearchParams()
      params.append('grant_type', 'authorization_code')
      params.append('redirect_uri', REDIRECT_URI)
      params.append('code', code)

      const data = await axios.request<any>(
        {
          method: 'POST',
          url: 'https://accounts.spotify.com/api/token',
          data: params,
          headers: {
            Authorization: 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      return data
    } catch (error: any) {
      console.log(`Error getting Spotify token ${JSON.stringify(error.response.data, null, 2)}`)
    }
  }

  async search(query: string, type: string, limit: number, accessToken: string): Promise<any> {
    try {
      const data = await axios.request<any>(
        {
          method: 'GET',
          // eslint-disable-next-line quotes
          url: `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`,
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        },
      )

      return data
    } catch (error: any) {
      console.log(`Error searching Spotify ${JSON.stringify(error.response.data, null, 2)}`)
    }
  }

  async saveTrack(ids: string, accessToken: string): Promise<any> {
    try {
      const data = await axios.request<any>(
        {
          method: 'PUT',
          // eslint-disable-next-line quotes
          url: `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        },
      )

      return data
    } catch (error: any) {
      console.log(`Could not save Spotify track ${JSON.stringify(error.response.data, null, 2)}`)
    }
  }
}
