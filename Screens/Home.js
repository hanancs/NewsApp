import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getData } from '../utils/storage';

const Home = (props) => {

  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      setUsername(await getData('username'))
      //  console.log('useEffect',await getData('username'))
    })();
  }, [])

  const CategoriesAr = [
    {
      name: "Business",
      path: "Business",
      imgURL: "https://img.icons8.com/clouds/100/000000/analytics.png",
    },
    {
      name: "Technology",
      path: "Technology",
      imgURL: "https://img.icons8.com/clouds/100/000000/transaction-list.png",
    },
    {
      name: "Science",
      path: "Science",
      imgURL: "https://img.icons8.com/clouds/100/000000/innovation.png",
    },
    {
      name: "Health",
      path: "Health",
      imgURL: "https://img.icons8.com/clouds/100/000000/client-company.png",
    }
  ]

  const GridItem = (gridProps) => {
    const { data } = gridProps;
    return (
      <>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(data.path)}
          >
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{data.name}</Text>
            </View>
            <View style={styles.imgbody}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: data.imgURL,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </>

    )
  }

  return (
    <ScrollView style={styles.sclb}>
      <Text style={styles.title}>Hi {username}</Text>
      <View style={styles.containerX}>
        {CategoriesAr.map((item, index) => <GridItem data={item}  key={index}/>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "white",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  containerX: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 8,
    maxHeight: 400,
    backgroundColor: "#61dafb",

  },
  card: {
    height: 150,
    width: 150,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    margin: 22,

  },
  imgbody: {
    paddingTop: 20,
  },
  tinyLogo: {
    height: 90,
    width: 90,
  },
  header: {
    flexDirection: "row",
  },
  sclb: {
    backgroundColor: "#61dafb",
  }
});

export default Home;