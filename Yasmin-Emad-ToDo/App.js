// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
// import Nav from './components/navigation';
// import * as React from 'react';
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import 'react-native-gesture-handler';
import { MovieList } from "./components/MovieList";
import { Card } from "./components/Card";
import { Home } from "./components/Home";
import { SingleMovie } from "./components/SingleMovie";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import { store } from "./Store/Store";
import Favorites from "./components/Favorites";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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

function Sub() {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen name="Single Movie" component={SingleMovie} />
    // </Stack.Navigator>
    <Provider store={store}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ focused }) => (
              // drawer.iconType =
              <MaterialIcons
                name="home"
                size={30}
                color={focused ? "#FFC000" : "black"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="All Movies"
          component={MovieList}
          options={{
            drawerIcon: ({ focused }) => (
              // drawer.iconType =
              <MaterialIcons
                name="movie"
                size={30}
                color={focused ? "#FFC000" : "black"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Sub"
          component={Sub}
          options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={Favorites}
          options={{
            drawerIcon: ({ focused }) => (
              // drawer.iconType =
              <MaterialIcons
                name="favorite"
                size={30}
                color={focused ? "#FFC000" : "black"}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </Provider>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movie App" component={Sub} />
        {/* <Stack.Screen name="MovieList" component={MovieList} /> */}
        <Stack.Screen name="Single Movie" component={SingleMovie} />
      </Stack.Navigator>
      {/* <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="All Movies" component={MovieList} />
        <Drawer.Screen name="Sub" component={Sub} 
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
        />
      </Drawer.Navigator> */}

      {/* <Stack.Navigator>      
      <Stack.Screen name="Single Movie" component={SingleMovie } />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
