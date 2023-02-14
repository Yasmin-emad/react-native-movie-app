import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { removeFavorite } from "../Store/Action";

const Favorites = () => {
  const { favorites } = useSelector((state) => state.moviesReducer);
  const dispatch = useDispatch();
  const removeFromFavorites = (movie) => dispatch(removeFavorite(movie));
  const handleRemoveFavorite = (movie) => {
    removeFromFavorites(movie);
  };

  return (
    <View style={{ flex: 1, marginTop: 44, paddingHorizontal: 20 }}>
      <Text style={styles.paragraph}>Favorites</Text>
      <View style={{ flex: 1, marginTop: 8 }}>
        {favorites.length === 0 ? (
          <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "center", color: '#FFC000' }}>
            No Favorite items to show.
          </Text>
        ) : (
          <View>
              {favorites.map((item, index) => {
              return (
                <View style={{ marginVertical: 12 }}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}?api_key=1583bd4a7b0da462480c756403c9bc65`,
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
                        <MaterialIcons
                          color="blue"
                          name="thumb-up"
                          size={32}
                        />
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
                          onPress={() => handleRemoveFavorite(item)}
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
                            name="favorite"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
              })
            }
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    // backgroundColor: "#ccc",
    boxSizing: "borderBox",
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  main: {
    flex: 1,
    backgroundColor: "#fff",
    width: 500,
    // borderBottom:1
  },
  box: {
    width: 900,
    // border-bottom:1px dashed #413e3e;
    paddingBottom: 21,
  },
  head: {
    width: 980,
    paddingTop: 14,
    paddingBottom: 11,
  },
  headH2: {
    float: "left",
    display: "inline",
  },
  movie: {
    width: 152,
    float: "left",
    paddingRight: 12,
  },
  movieImage: {
    /* float:left; */
    width: 252,
    height: 214,
    position: "relative",
  },
  movieImageImg: {
    // width: "100%",
    height: 214,
  },
});

export default Favorites;
