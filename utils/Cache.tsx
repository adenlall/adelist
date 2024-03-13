import AsyncStorage from '@react-native-async-storage/async-storage'

export class Cache {

    public static async set(key: string, value: any) {
        try {
          value = JSON.stringify(value);
          await AsyncStorage.setItem(key, value);
          return true;
        } catch (e) {
          return false;
        }
      }

      public static async get(key: string, parsed?:boolean) {
        try {
          const data: any = await AsyncStorage.getItem(key);
          return parsed ? JSON.parse(data) : data;
        } catch (e) {
          return false;
        }
      }
          
}
