import {Button, Text, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import { Fetch } from "../../helpers/Fetch";


// Generic Handler for Grabbing Anilist Category Data for Discovery Page Grids
export default function GetAnime(GraphQLQuery:any, Variables:any, key:any, remeber=0) {
    const [apiData, setApiData] = useState(null);

    const handleApiCall = async () => {
        try {
            const url = 'https://graphql.anilist.co';
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            };
            const data = await Fetch.post(url, { query: GraphQLQuery, variables: Variables }, options, key??Variables?.id, remeber);
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
