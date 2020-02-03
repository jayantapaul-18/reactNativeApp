import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Text, View,Button, StatusBar ,SafeAreaView,Image} from 'react-native';
import socketIOClient from "socket.io-client";
import Config from "../config.json";
import {Platform} from 'react-native';
console.log(Config.API_URL+'/test');
console.log("Platform: ",Platform);

const platformDetect = Platform.select({
  ios: () => console.log("Platform: ", "iOS"),
  android: () => console.log("Platform: ", "Android"),
})();


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      jsonData: '',
      text:''
    };
  }

 

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", data => {this.setState({ response: data })

      fetch(Config.API_URL+'/test', {
        method: 'GET',
      })
        .then(response => response.text())
        .then(text => {
          this.setState({
            jsonData: text,
          });
        })
        .catch(error => {
          console.error(error);
        });

  }
  
  render() {
    const { jsonData } = this.state;
    console.log('Rendered response: ', jsonData);
    return (
      <SafeAreaView>
        <ScrollView
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}></View>
  
         <Image source={require('../assets/images/play.png')} style={styles.welcomeImage}/>
         <Button title="Test me" onPress={() => console.log("Success")}/>
         <Text>{jsonData}</Text>
     
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeImage: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
