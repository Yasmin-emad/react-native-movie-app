// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { getMovies, addFavorite, removeFavorite } from "../Store/Action";

export const MovieList = ({ navigation }) => {
  const { movies, favorites } = useSelector((state) => state.moviesReducer);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  const addToFavorites = (movie) => dispatch(addFavorite(movie));
  const removeFromFavorites = (movie) => dispatch(removeFavorite(movie));

  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  // useEffect(() => {
  //   fetchMovies();
  //   // console.log(movies);
  //   // axios
  //   //   .get(
  //   //     "https://api.themoviedb.org/3/movie/popular?api_key=1583bd4a7b0da462480c756403c9bc65"
  //   //   )
  //   //   .then((res) => setMovies(res.data.results))
  //   //   .catch((err) => console.log(err));
  // }, []);

  const handleAddFavorite = (movie) => {
    addToFavorites(movie);
  };

  const handleRemoveFavorite = (movie) => {
    removeFromFavorites(movie);
  };

  const exists = (movie) => {
    if (favorites.filter((item) => item.id === movie.id).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <View style={{ flex: 1, marginTop: 44, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 22 }}>Popular Movies</Text>
      <View style={{ flex: 1, marginTop: 12 }}>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const IMAGE_URL =
              "https://image.tmdb.org/t/p/w185" + item.poster_path;
            return (
              <View style={{ marginVertical: 12 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Image
                    source={{
                      uri: IMAGE_URL,
                    }}
                    resizeMode="cover"
                    style={{ width: 100, height: 150, borderRadius: 10 }}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View>
                      <Text style={{ fontSize: 22, paddingRight: 16 }}>
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons color="green" name="thumb-up" size={32} />
                      <Text
                        style={{
                          fontSize: 18,
                          paddingLeft: 10,
                          color: "#64676D",
                        }}
                      >
                        {item.vote_count}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          exists(item)
                            ? handleRemoveFavorite(item)
                            : handleAddFavorite(item)
                        }
                        activeOpacity={0.7}
                        style={{
                          marginLeft: 14,
                          flexDirection: "row",
                          padding: 2,
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          height: 40,
                          width: 40,
                        }}
                      >
                        <MaterialIcons
                          color="orange"
                          size={32}
                          name={exists(item) ? "favorite" : "favorite-outline"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.paragraph}>Movie List</Text>
    //   {movies.map((movie, index) => {
    //     return (
    //       <View style={{marginVertical: 12}}>
    //       <Card style={{flexDirection: 'row', flex: 1}} key={index}>

    //         {/* style={styles.box} */}
    //         <Card.Title style={{fontSize: 22, paddingRight: 16}}
    //         //   onPress={() =>
    //         //     navigation.navigate("Sub", {
    //         //       screen: "Single Movie",
    //         //       params: { id: movie.id },
    //         //     })
    //         //   }
    //         >
    //           {movie.title}
    //         </Card.Title>

    //         <Card.Image
    //           // style={styles.movieImageImg}
    //           source={{
    //             uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=1583bd4a7b0da462480c756403c9bc65`,
    //           }}
    //           resizeMode="cover"
    //           style={{width: 100, height: 150, borderRadius: 10}}
    //         />

    //         <Button title="Details" onPress={() => navigation.navigate('Single Movie', {id:movie.id})}/>
    //         <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     marginTop: 10,
    //                     alignItems: 'center',
    //                   }}>
    //                   <MaterialIcons color="green" name="thumb-up" size={32} />
    //                   <Text
    //                     style={{
    //                       fontSize: 18,
    //                       paddingLeft: 10,
    //                       color: '#64676D',
    //                     }}>
    //                     {item.vote_count}
    //                   </Text>
    //                   <TouchableOpacity
    //                     onPress={() =>
    //                       exists(item)
    //                         ? handleRemoveFavorite(item)
    //                         : handleAddFavorite(item)
    //                     }
    //                     activeOpacity={0.7}
    //                     style={{
    //                       marginLeft: 14,
    //                       flexDirection: 'row',
    //                       padding: 2,
    //                       borderRadius: 20,
    //                       alignItems: 'center',
    //                       justifyContent: 'center',
    //                       height: 40,
    //                       width: 40,
    //                     }}>
    //                     <MaterialIcons
    //                       color="orange"
    //                       size={32}
    //                       name={exists(item) ? 'favorite' : 'favorite-outline'}
    //                     />
    //                   </TouchableOpacity>
    //                 </View>
    //       </Card>
    //       </View>
    //     );
    //   })}
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 40,
//     backgroundColor: "#ccc",
//     boxSizing: "borderBox",
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#34495e",
//   },
//   main: {
//     flex: 1,
//     backgroundColor: "#fff",
//     width: 500,
//     // borderBottom:1
//   },
//   box: {
//     width: 900,
//     // border-bottom:1px dashed #413e3e;
//     paddingBottom: 21,
//   },
//   head: {
//     width: 980,
//     paddingTop: 14,
//     paddingBottom: 11,
//   },
//   headH2: {
//     float: "left",
//     display: "inline",
//   },
//   movie: {
//     width: 152,
//     float: "left",
//     paddingRight: 12,
//   },
//   movieImage: {
//     /* float:left; */
//     width: 252,
//     height: 214,
//     position: "relative",
//   },
//   movieImageImg: {
//     // width: "100%",
//     height: 214,
//   },
// });


import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  FlatList,
  useRef
} from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../Store/Action'

const ToDo = () => {
    const [value, setValue] = useState('')
    const listItems = useSelector(state => state.itemList)
    const dispatch = useDispatch()
    // const Ref = useRef();
  
    const onSaveNote = value => {
      dispatch(addItem(value))
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.modalContainer}>
            <Text style={{ color: '#444', fontSize: 24, marginBottom: 5 }}>
              Write your To Do Item!
            </Text>
            <TextInput
              style={{
                height: 50,
                width: 600,
                padding: 5,
                borderColor: 'gray',
                borderBottomWidth: 2
                
              }}
            //   ref={Ref}
              numberOfLines={1}
              onChangeText={value => setValue(value)}
              value={value}
            //   clearButtonMode="always"
            />
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: 'blue',
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5
              }}
              onPress={() => onSaveNote(value)}>
              <MaterialIcons
                name='arrow-forward'
                size={40}
                color='#fff'
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 20
        }}>
        {listItems.length !== 0 ? (
          <FlatList
            data={listItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeItem(item.id))}
                  style={styles.button}>
                  <MaterialIcons name='delete' color={"FF2D2D"}  size={20} style={{ color: "#FF2D2D", fontSize: 35}} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={{ fontSize: 30, color: '#FF2D2D' }}>Your list is empty !</Text>
        )}
      </View>
      </View>
    )
}

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: '30%',
    width: '100%',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: 60,
    top: 10,
    left: 50
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.25
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400'
  },
  button: {
    borderRadius: 8,
    fontSize: 10,
    // backgroundColor: '#ff333390',
    padding: 5
  }
})

