import { Button, View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

export const SingleMovie = ({ navigation, route }) => {
  const id = route.params.id;

  const [movie, setMovie] = useState([]);
  console.log(id);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=1583bd4a7b0da462480c756403c9bc65`
      )
      .then((res) => setMovie(res.data))
      .catch((err) => alert(err));
  }, []);

  console.log(movie);

  return (
    <View style={{ margin: 10, width: "100%" }}>
      <View key={movie.id}>
        <View style={{ flex: 1, flexDirection: "row", marginStart: "auto", marginEnd: "auto" }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}?api_key=1583bd4a7b0da462480c756403c9bc65`,
            }}
            resizeMode="cover"
            style={{ width: 400, height: 400, borderRadius: 10 }}
          />
          <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <View
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#FFC000",
                marginBottom: 10
              }}
            >
              {movie.original_title}
            </View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}> {movie.overview} </Text>
            <View style={{ flix: 1, flexDirection: "row", padding: 40 }}>
              <MaterialIcons color="blue" name="thumb-up" size={30} />
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingEnd: 10,
                  color: "#64676D",
                }}
              >
                {movie.vote_count}
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  marginStart: 10,
                  flex: 1,
                  flexDirection: "row",
                  width: 50,
                }}
              >
                {/* <Text style={{ padding: 5 }}>Watch Now</Text>{" "} */}
                <Button title="Watch Naw!" color={"#FF2D2D"} />
                {/* <MaterialIcons color="blue" name="movie" size={22} /> */}
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
        
      </View>
    </View>
  );
};
