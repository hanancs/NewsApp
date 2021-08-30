import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import moment from "moment";

const Science = () => {

  const [loading, setLoading] = useState(false);
  const [activeData, setActiveData] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(1);


  useEffect(() => {
    goForAxios()
  }, [])

  const Loaderx = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#78acff" />
        <Text style={{ fontSize: 16, color: '#78acff' }}>Loading Data...</Text>
      </View>
    )
  }

  const goForAxios = async () => {
    await axios.get(`https://newsapi.org/v2/everything?q=Science&apiKey=c3761b65071340fe87d1ac28053e68b3&page=${scrollIndex}&pageSize=10`)
      .then(response => {
        setLoading(false);
        setActiveData(response.data.articles.slice(0, 10));
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchNextItems = async () => {
    if (scrollIndex <= 9) {
      setScrollIndex(scrollIndex + 1);
      console.log('scroll:', scrollIndex + 1);
      const response = await axios.get(`https://newsapi.org/v2/everything?q=Science&apiKey=c3761b65071340fe87d1ac28053e68b3&page=${scrollIndex + 1}&pageSize=10`);
      const newArray = [...activeData, ...response.data.articles];
      setActiveData(newArray);
    } else {
      return
    }
  };

  const FlatListSeparator = () => {
    return (
      <View style={{
        height: 3,
        width: "100%",
        backgroundColor: "#78acff",
      }}
      />
    );
  }

  const renderItem = (data) => {
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
        data={activeData}
        renderItem={renderItem}
        ItemSeparatorComponent={FlatListSeparator}
        initialNumToRender={10}
        onEndReachedThreshold={0.7}
        onEndReached={fetchNextItems}
        ListFooterComponent={scrollIndex <= 10 && scrollIndex >= 1 &&
          <Loaderx />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
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

export default Science;