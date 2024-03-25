import {Button, Text, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import { Fetch } from "../../helpers/Fetch";


// Generic Handler for Grabbing Anilist Category Data for Discovery Page Grids
export default function AnilistDiscoveryGridCall(GraphQLQuery:any, queryName:any, remember=0) {
    
    const [apiData, setApiData] = useState(null) as any;

    const handleApiCall = async () => {
        try {
            const url = 'https://graphql.anilist.co';
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            };
            const data = await Fetch.post(url, { query: GraphQLQuery }, options, queryName, remember);
            setApiData(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        handleApiCall,
        apiData,
    };
}
