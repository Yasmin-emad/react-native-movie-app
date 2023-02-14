import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import axios from "axios";
// import React, { useState } from "react";
import React, { useEffect } from "react";
import { Card } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { getMovies, addFavorite, removeFavorite } from "../Store/Action";

export const Home = ({ navigation }) => {
  const { movies, favorites } = useSelector((state) => state.moviesReducer);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  const addToFavorites = (movie) => dispatch(addFavorite(movie));
  const removeFromFavorites = (movie) => dispatch(removeFavorite(movie));

  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
    // console.log(movies);
    // axios
    //   .get(
    //     "https://api.themoviedb.org/3/movie/popular?api_key=1583bd4a7b0da462480c756403c9bc65"
    //   )
    //   .then((res) => setMovies(res.data.results))
    //   .catch((err) => console.log(err));
  }, []);

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
    <View style={{ width: "100%" }}>
      <Text style={styles.paragraph}>Movie App</Text>
      <View style={{ flex: 1, flexDirection: "row"}}>
        {movies.map((movie, index) => {
          return (
            <View
              style={{
                width: 400,
                alignItems: "center",
                boxSizing: "borderBox",
                padding: 20,
                marginStart: "auto",
                marginEnd: "auto",
              }}
            >
              <Card style={{ flexDirection: "row", flex: 1 }} key={index}>
                {/* style={styles.box} */}
                {/* <View style={{ flex:1, flexDirection: "row" }}> */}
                <Card.Title
                  style={{ fontSize: 22, paddingRight: 16 }}
                  //   onPress={() =>
                  //     navigation.navigate("Sub", {
                  //       screen: "Single Movie",
                  //       params: { id: movie.id },
                  //     })
                  //   }
                >
                  {movie.title}
                </Card.Title>

                <Card.Image
                  // style={styles.movieImageImg}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=1583bd4a7b0da462480c756403c9bc65`,
                  }}
                  resizeMode="cover"
                  style={{
                    width: 400,
                    height: 350,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                />
                {/* </View> */}

                <Button
                  title="Details"
                  color={"#FF2D2D"}
                  style={{ borderRadius: 10 }}
                  onPress={() =>
                    navigation.navigate("Single Movie", { id: movie.id })
                  }
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons color="blue" name="thumb-up" size={32} />
                  <Text
                    style={{
                      fontSize: 18,
                      paddingLeft: 10,
                      color: "#64676D",
                    }}
                  >
                    {movie.vote_count}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      exists(movie)
                        ? handleRemoveFavorite(movie)
                        : handleAddFavorite(movie)
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
                      name={exists(movie) ? "favorite" : "favorite-outline"}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          );
        })}
      </View>
      <Button
        title="Show All Movies"
        color={"#151C27"}
        onPress={() =>
          navigation.navigate("Movie App", { screen: "All Movies" })
        }
      />
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
    // width: "100%"
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFC000",
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
    width: "100%",
    height: 214,
  },
});
