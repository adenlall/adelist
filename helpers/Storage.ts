import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {



  public static async reset() {
    console.log("RErSET::DATA");
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // error reading value
      console.error(e);
      return 'false';
    }
  };


  public static async getData(key: string) {
    console.log("GET::DATA", key);
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        try{
          let data = JSON.parse(value);
          if (!data.appremember) {
            throw new RangeError();
          }
          if (data.appremember >= this.getTimePlus()) {
            console.log("TEMP DATA FOUND AND STILL VALID");
            return JSON.stringify(data.data.data);
          }else{
            await AsyncStorage.removeItem(key);
            return false;
          }
          
        }catch{
          console.log("ALWAYZ STORED DATA");
          return value;
        }
      }
      return false;
    } catch (e) {
      // error reading value
      console.error(e);
      return false;
    }
  };

  public static async setData(key: string, value: string, remember = 0) {
    console.log("SET::DATA"+(remember?"::TEMP":""), key);
    try {
      let data = false as boolean|Object;
      if (remember) {
        console.log("SET TEMP DATA FOR "+remember+" days", this.getTimePlus(remember));
        let promis = this.getTimePlus(remember);
        data = {
            appremember : promis,
            data: value
        }
      }
      await AsyncStorage.setItem(key, remember?JSON.stringify(data):value);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  private static getTimePlus(days=0) {
    
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    console.log('plus :: ',days, currentDate.toISOString().slice(0, 10));
    return currentDate.toISOString().slice(0, 10);
  }



}