import { Text, View } from "react-native";
import * as React from "react";
import { Storage } from "../helpers/Storage";

export default function MangaHome() {
    const data = [] as any;
    const [ code, setCode ] = React.useState() as any;
    const [ code1, setCode1 ] = React.useState() as any;
    const [ code2, setCode2 ] = React.useState() as any;
    React.useEffect(()=>{
        console.log('start');
        
        
        Storage.getData('access_token').then(res=>data.push({
            name:"access_token",
            value:res
        })).catch((err)=>{
            console.log('err : ', err);
        });
        Storage.getData('refresh_token').then(res=>data.push({
            name:"refresh_token",
            value:res
        })).catch((err)=>{
            console.log('err : ', err);
        });
        Storage.getData('isUserLoggedIn').then(res=>data.push({
            name:"isUserLoggedIn",
            value:res
        })).catch((err)=>{
            console.log('err : ', err);
        });
        Storage.getData('expires_in').then(res=>data.push({
            name:"expires_in",
            value:res
        })).catch((err)=>{
            console.log('err : ', err);
        });
        Storage.getData('refresh_token').then((res)=>{
            data.push({
                name:"access_token",
                value:res
            });
            setCode2(res);
        }).catch((err)=>{
            console.log('err : ', err);
        });
        Storage.getData('access_token').then((res)=>{
            data.push({
                name:"access_token",
                value:res
            });
            setCode1(res);
        }).catch((err)=>{
            console.log('err : ', err);
        });
        Storage.getData('anilistUserCode').then((res)=>{
            data.push({
                name:"anilistUserCode",
                value:res
            });
            setCode(res);
            console.log('seeeeeeted');
            
        }).catch((err)=>{
            console.log('err : ', err);
        });
        console.log('finish ', data);
    },[])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MangaHome!</Text>
            {
                data?.map((item:any,i:number)=>(
                    <Text key={i}>
                        {item?.name??"namme"} : {item?.value??"val"}
                    </Text>
                ))
            }
            <Text>{code??"dddddddddddd"}</Text>
            <Text>{code1??"111111111111"}</Text>
            <Text>{code2??"22222222222222"}</Text>
        </View>
    );
}