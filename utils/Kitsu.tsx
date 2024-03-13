import { Fetch } from './Fetch'
type Attribute =
  | 'createdAt'
  | 'updatedAt'
  | 'startDate'
  | 'endDate'
  | 'nextRelease'
  | 'en'
  | 'en_jp'
  | 'status'
  | 'subtype'
  | Sortable
type Sortable =
  | 'createdAt'
  | 'averageRating'
  | 'episodeCount'
  | 'episodeLength'
  | 'totalLength'
  | 'userCount'
  | 'ratingRank'
  | 'popularityRank'
  | 'favoritesCount'
type Filter = [Attribute, string | number | boolean][]

export class Kitsu {
  protected uri: string = 'https://kitsu.io/api/edge/'
  protected path?: string = ''
  protected type?: string

  constructor(type: string = 'anime') {
    this.type = type
  }

  public async getRatedAnimes(limit?: number, filter?: Filter) {
    this.setPath(
      this.type +
        '?page[limit]=' +
        (limit ?? 20) +
        '&sort=-averageRating' +
        this.parseFilter(filter)
    )
    const data = await this.process()
    return data
  }
  public async getPopularAnimes(limit?: number, filter?: Filter) {
    this.setPath(
      this.type +
        '?page[limit]=' +
        (limit ?? 20) +
        '&sort=popularityRank' +
        this.parseFilter(filter)
    )
    const data = await this.process()
    return data
  }
  public async getAringAnimes(
    limit?: number,
    sort: Sortable = 'averageRating',
    desc: boolean = false,
    filter?: Filter
  ) {
    this.setPath(
      this.type +
        '?filter[status]=current&page[limit]=' +
        (limit ?? 20) +
        '&sort=' +
        (desc ? '-' : '') +
        sort +
        this.parseFilter(filter)
    )
    const data = await this.process()
    return data
  }

  public async getAnimes(
    limit?: number,
    sort: Sortable = 'averageRating',
    desc: boolean = false,
    filter?: Filter
  ) {
    this.setPath(
      this.type +
        '?page[limit]=' +
        (limit ?? 20) +
        '&sort=' +
        (desc ? '-' : '') +
        sort +
        this.parseFilter(filter)
    )
    const data = await this.process()
    return data
  }

  public async getAnimeData(id: number) {
    this.setPath(this.type + '/' + id)
    const data = await this.process()
    return data
  }

  public async getAnimeStreamers(id: number) {
    this.setPath(this.type + '/' + id + '/streaming-links')
    const data = await this.process()
    return data
  }
  public async getMangaChapters(id: number) {
    this.setPath(this.type + '/' + id + '/chapters')
    const data = await this.process()
    return data
  }
  
  public async getEpisodeData(id: number) {
    this.setPath('episodes/' + id)
    const data = await this.process()
    return data
  }

  public async getAnimeEpisodes(id: number, limit: number = 20) {
    this.setPath(this.type + '/' + id + '/episodes' + '?page[limit]=' + limit)
    const data = await this.process()
    return data
  }

  public async search(q: string, limit: number = 20) {
    this.setPath(this.type + '' + '?filter[text]=' + q)
    const data = await this.process()
    return data
  }

  public async process() {
    const fetch = new Fetch()
    const data = await fetch.use(this.uri + this.path)
    return data
  }

  private parseFilter(filter: Filter | undefined): string {
    if (!filter) {
      return ''
    }
    let parsed: string = ''
    filter.forEach(([key, val]) => {
      parsed += '&filter[' + key + ']=' + val
    })
    return parsed
  }

  public setUri(v: string) {
    this.uri = v
  }
  public setPath(v: string) {
    this.path = v
  }
}
