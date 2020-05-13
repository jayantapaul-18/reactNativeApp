import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Text,
  View,
  Button,
  StatusBar,
  SafeAreaView,
  Image,
  Picker,
  TouchableOpacity,
} from "react-native";
//import { Header } from 'react-native-elements';
import socketIOClient from "socket.io-client";
import Config from "../config.json";
import { Platform } from "react-native";

import { WebView } from "react-native-webview";
console.log(Config.API_URL + "/app/healthcheck");
console.log("Platform: ", Platform);
// import { accelerometer } from "react-native-sensors";

// const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
//   console.log({ x, y, z, timestamp })
// );

const platformDetect = Platform.select({
  ios: () => console.log("Platform: ", "iOS"),
  android: () => console.log("Platform: ", "Android"),
})();

//export default function LinkScreen() {
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      jsonData: "",
      listDevices: "",
      text: "",
      Platform: "",
      userTypes: [
        { userType: "DEVICES", userName: "CAMERA" },
        { userType: "GPS", userName: "GPS" },
        { userType: "SENSOR", userName: "SENSOR" },
      ],
      selectedUserType: "",
    };
  }

  loadUserTypes() {
    return this.state.userTypes.map((user) => (
      <Picker.Item label={user.userName} value={user.userType} />
    ));
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", data => {this.setState({ response: data })

    fetch(Config.API_URL + "/app/healthcheck", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        this.setState({
          jsonData: text,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(Config.API_URL + "/app/listDevices", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        this.setState({
          listDevices: text,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({ Platform: Platform.OS });
    console.log("Platform: -------->", Platform.OS);
  }

  render() {
    const { jsonData } = this.state;
    const { listDevices } = this.state;
    const { Platform } = this.state;
    console.log("Serial Data response: ", jsonData);

    return (
      <SafeAreaView>
        {/* <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'LIVE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      /> */}

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            source={require("../assets/images/stream.png")}
            style={styles.welcomeImage}
          />
          <TouchableOpacity style={styles.ButtonStyle} onPress={this.onPress}>
            <Text>Devices</Text>
          </TouchableOpacity>
          <Picker
            style={styles.picker}
            selectedValue={this.state.selectedUserType}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedUserType: itemValue })
            }
          >
            {this.loadUserTypes()}
          </Picker>

          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text>Light ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text>Light OFF</Text>
          </TouchableOpacity>

          <Button
            title="List of Devices"
            onPress={() => console.log("Success")}
            style={styles.ButtonStyle}
          />
          <Text>{listDevices}</Text>
          <Button
            title="GPS Data"
            onPress={() => console.log("GPS --> Success")}
            style={styles.ButtonStyle}
          />
          <Text>{jsonData}</Text>
          <Button
            title="Stream ON"
            onPress={() => console.log("Streaming --> Success")}
            style={styles.ButtonStyle}
          />
          <Text>{jsonData}</Text>
          <Button
            title="Platform"
            onPress={() => console.log("Platform --> Success")}
            style={styles.ButtonStyle}
          />
          <Text>{Platform}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 1,
  },
  welcomeImage: {
    width: 60,
    height: 50,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: 10,
  },
  ButtonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 8,
    width: 100,
    marginTop: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 8,
    width: 100,
    marginTop: 16,
  },
  picker: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 6,
    width: 100,
    marginTop: 16,
  },
});

export default App;

// import { Text, View, StatusBar } from 'react-native';
// export default class App extends React.Component {
//   state = {
//     jsonData: '',
//   };
//   componentDidMount() {
//     fetch('http://192.168.0.29:3500', {
//       method: 'GET',
//     })
//       .then(response => response)
//       .then(reasponse => {
//         this.setState({
//           jsonData: response,
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }
//   render() {
//     return (
//       <View style={{ paddingTop: 30 }}>
//         <Text>{this.state.jsonData}</Text>
//       </View>
//     );
//   }
// }

// export default function LinksScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       {/**
//        * Go ahead and delete ExpoLinksView and replace it with your content;
//        * we just wanted to provide you with some helpful links.
//        */}

//     </ScrollView>
//   );
// }

// LinksScreen.navigationOptions = {
//   title: 'Live Links',
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
