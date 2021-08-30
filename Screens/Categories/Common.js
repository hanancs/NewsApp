import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image,
    SafeAreaView
} from 'react-native';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import moment from "moment";

const deviceHeight = Dimensions.get('screen').height

const Common = () => {

    const [loading, setLoading] = useState(false);
    const [axiosData, setAxiosData] = useState(null);

    const CategoriesDetailsAr = [
        {
            apiName: "business",
            categoryName: "Business",
            componentName: "Business"
        },
        {
            apiName: "science",
            categoryName: "Science",
            componentName: "Science"
        },
        {
            apiName: "technology",
            categoryName: "Technology",
            componentName: "Technology"
        },
        {
            apiName: "health",
            categoryName: "Health",
            componentName: "Health"
        },

    ]

    const goForAxios = () => {
        setLoading(true)
        loadingValue = true;
        axios.get("https://newsapi.org/v2/everything?q=health&apiKey=7dfdf4c9bb44442389f27ff0a8f2d7ed")
            .then(response => {
                console.log(response.data.articles)
                setLoading(false);
                setAxiosData(response.data.articles);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        goForAxios()
    }, [])

    const FlatListSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }

    const renderItem = (data) => {

        console.log('Render Item: ', data);

        const item = data.item;

        return (
            <TouchableOpacity style={styles.list} >
                <View style={styles.row}>
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: item.urlToImage,
                            }}
                        />
                    </View>

                    <View style={styles.textareax}>
                        <Text style={styles.baseText} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.lightText} numberOfLines={2}>{item.description}</Text>
                        <Text style={styles.date}> {moment(item.publishedAt).format("MMMM Do, YYYY")} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }

    return (

        <View style={styles.parentContainer} >

            <FlatList
                data={axiosData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                    <Text style={{ fontSize: 16, color: 'red' }}>Loading Data...</Text>
                </View>
            }

        </View>

    );
}

const styles = StyleSheet.create({
    parentContainer: {
        justifyContent: 'center',
    },
    container: {
        backgroundColor: "#fff"
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 0,
        margin: 5,
        backgroundColor: "#fff"
    },
    tinyLogo: {
        width: 60,
        height: 60,
    },
    baseText: {
        fontWeight: 'bold'
    },
    date: {
        color: 'grey'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30
    },
    textareax: {
        padding: 5,
    }
});

export default Common;