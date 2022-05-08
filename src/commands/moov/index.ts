/* eslint-disable no-warning-comments */
import {Command, Flags} from '@oclif/core'
import 'dotenv/config'
import * as _ from 'lodash'
import express, {Express, Request, Response} from 'express'
import {writeFile, readFile} from 'node:fs/promises'

import Deezer from '../../authentication/deezer'
import Spotify from '../../authentication/spotify'

export default class Moov extends Command {
  state = {
    SERVER_ON: false,
    SPOTIFY_CLIENT_ID: String(process.env.SPOTIFY_CLIENT_ID),
    SPOTIFY_CLIENT_SECRET: String(process.env.SPOTIFY_CLIENT_SECRET),
    SPOTIFY_CODE: '',
    SPOTIFY_ACCESS_TOKEN: '',
    DEEZER_APP_ID: String(process.env.DEEZER_APP_ID),
    DEEZER_SECRET: String(process.env.DEEZER_SECRET),
    DEEZER_CODE: '',
    DEEZER_TOKEN: '',
  }

  static description = 'Move music'

  static examples = [
    '$ moov -f deezer -t spotify',
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Source data to parse music from', required: true}),
    to: Flags.string({char: 't', description: 'Target data to import music to', required: true}),
  }

  async run(): Promise<void> {
    // const {flags} = await this.parse(Moov)
    // const from = flags.from
    // const to = flags.to

    this.boot() // Boot the API for specifics callbacks URLs
    while (!this.state.SERVER_ON) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(1000, 'server to boot')
    }

    // Get Loved Deezer Tracks
    const tracks = await this.getDeezerTracks()

    // Synchronize tracks
    await this.setSpotifyTracks(tracks)

    // ciao
    this.exit()
  }

  boot(): void {
    const app: Express = express()
    const port = '3001'

    app.use(express.json())
    app.get('/auth/callback/:source', (req: Request, res: Response) => {
      // TODO: should generalize for other providers
      const source = req.params.source
      const code = String(req.query.code)
      const error = String(req.query.error_reason || req.query.error)

      if (!code && error) {
        throw new Error(error)
      }

      if (source === 'deezer') {
        this.state.DEEZER_CODE = code
      } else {
        this.state.SPOTIFY_CODE = code
      }

      res.send({success: true})
    })

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
      this.state.SERVER_ON = true
    })
  }

  async sleep(ms: number, reason?: string): Promise<void> {
    await new Promise(resolve => {
      setTimeout(resolve, ms)
      if (reason) console.log(`Waiting for ${reason}..`)
    })
  }

  async getDeezerTracks(): Promise<any> {
    const deezer = new Deezer()
    await deezer.authorize(this.state.DEEZER_APP_ID, 'basic_access,email,offline_access')

    while (!this.state.DEEZER_CODE) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(3000, 'user to authorize the Deezer process on browser')
    }

    const tokenData = await deezer.getToken(this.state.DEEZER_APP_ID, this.state.DEEZER_SECRET, this.state.DEEZER_CODE)
    if (!tokenData) {
      return []
    }

    const urlData = new URL(`https://connect.deezer.com/oauth/access_token.php?${tokenData.data}`)
    const params = urlData.searchParams
    const token = params.get('access_token')
    this.state.DEEZER_TOKEN = String(token)
    this.log('Deezer token: ', this.state.DEEZER_TOKEN)

    // const playlists = await deezer.get('2154769402', 'playlists', this.state.DEEZER_TOKEN)

    // eslint-disable-next-line no-warning-comments
    // TODO: fetch the loved track code by iterating on playlists
    // this.log(playlists.data.data)
    const lovedPlaylist = String(process.env.DEEZER_LOVED_PLAYLIST)

    const file = await readFile('./assets/tracks.json')
    const tempTracks = JSON.parse(file.toString('utf-8'))
    // console.log('tempTracks', tempTracks)
    const tracks: any = tempTracks ? tempTracks : {}
    const tracksLength = Object.values(tracks).length

    const initTotal = await deezer.tracks(lovedPlaylist, 0, 1, this.state.DEEZER_TOKEN)
    const totalTracks = _.get(initTotal, 'data.total')

    if (tracksLength === 0 || tracksLength < totalTracks) {
      // TODO: let hasNext while
      for (let i = 0; i < 100; i++) {
        // eslint-disable-next-line no-await-in-loop
        const tracksData = await deezer.tracks(lovedPlaylist, Object.values(tracks).length, 100, this.state.DEEZER_TOKEN)
        const data = _.get(tracksData, 'data.data')
        if (data && data.length > 0) {
          for (const d of data) {
            tracks[d.id] = d
          }

          if (tracksData.data.next) {
            // eslint-disable-next-line no-await-in-loop
            await this.sleep(300, `safe rate limit while getting tracks at index ${i} - total ${tracksData.data.total}`)  // wait to avoid rate limiting
          } else {
            console.log('Reached end of tracks.')
            break
          }
        } else {
          break  // no more tracks
        }
      }
    } else {
      console.log('Skipping fetch tracks from Deezer.')
    }

    if (Object.values(tracks).length === 0) {
      console.log('No tracks found, exiting process.')
      this.exit()
    }

    // Overwrites local tracks for local testing in case of failure
    console.log(`Saving ${Object.values(tracks).length} tracks to memory`)
    await writeFile('./assets/tracks.json', JSON.stringify(tracks))

    // Enrich tracks
    for (const [id, track] of Object.entries(tracks)) {
      const isrc = _.get(track, 'isrc')
      // console.log('ISRC', track)
      if (isrc) {
        console.log(`Deezer track for ISRC ${isrc} already exists.`)
      } else {
        const trackId = _.get(track, 'id')
        console.log(`Enriching Deezer track with id #${trackId}.`)
        // eslint-disable-next-line no-await-in-loop
        const enrichedTrack = await deezer.getTrack(trackId, this.state.DEEZER_TOKEN)
        tracks[id] = Object.assign(track, enrichedTrack.data)

        // eslint-disable-next-line no-await-in-loop
        await writeFile('./assets/tracks.json', JSON.stringify(tracks))  // regularly write in case of errors (should batch)

        // eslint-disable-next-line no-await-in-loop
        await this.sleep(100)  // wait to avoid rate limiting even if they say there's none
      }
    }

    return tracks
  }

  async setSpotifyTracks(tracks: any): Promise<any> {
    // Spotify Auth Process
    const spotify = new Spotify()
    await spotify.authorize(this.state.SPOTIFY_CLIENT_ID)

    while (!this.state.SPOTIFY_CODE) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(3000, 'user to authorize the Spotify process on browser')
    }

    const tokenData = await spotify.geToken(this.state.SPOTIFY_CODE, this.state.SPOTIFY_CLIENT_ID, this.state.SPOTIFY_CLIENT_SECRET)
    if (!tokenData) {
      return []
    }

    this.state.SPOTIFY_ACCESS_TOKEN = tokenData.data.access_token

    for (const track of Object.values(tracks)) {
      const temp: any = Object.assign({}, track)

      // eslint-disable-next-line no-await-in-loop
      const spotifyTrack = await spotify.search(`isrc:${temp.isrc}`, 'track', 1, this.state.SPOTIFY_ACCESS_TOKEN)
      const item = _.get(spotifyTrack, 'data.tracks.items')
      if (item[0]) {
        // eslint-disable-next-line no-await-in-loop
        const success = await spotify.saveTrack(item[0].id, this.state.SPOTIFY_ACCESS_TOKEN)
        success ? console.log(`Successfuly saved Spotify track #${item[0].id}`) : console.log(`Something went wrong when saving track ${item[0].id}`)
        // TODO: optimze for batch of 50 according to doc
      }

      // eslint-disable-next-line no-await-in-loop
      await this.sleep(300)  // Spotify implements rate liting https://developer.spotify.com/documentation/web-api/guides/rate-limits/
    }
  }
}
