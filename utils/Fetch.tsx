import { Cache } from "./Cache";

export class Fetch {

  protected path?: string


  public async use(uri: string) {
    const data = await this.process(uri);
    return data;
  }

  private async process(uri: string) {
    const cached = await Cache.get(uri, true);
    if (cached) {
      return cached;
    }
    try {
      const response = await fetch(uri)
      const json = await response.json()
      await Cache.set(uri, json);
      return json;
    } catch (error) {
      console.error(error)
      return []
    }
  }

}
