import axios, { AxiosRequestConfig } from "axios";
import { Storage } from "./Storage";

export class Fetch {
    
    
    public static async post(url:string, query: any, options: AxiosRequestConfig<any> | undefined, key:string|undefined, remember=0) {
          try {
            let data = await Storage.getData(key??url);
            if (data) {
                console.info("RETURN CACHED DATA FOR :"+(key??url));
                return JSON.parse(data);
            }
            console.info("NO CACHE WAS FOUND FOR :"+(key??url));
            const res = await axios.post(url, query, options);
            await Storage.setData(key??url, JSON.stringify(res.data), remember);
            return res.data;
          } catch (e) {
            console.error(e);
            return false;
          }
    }


}