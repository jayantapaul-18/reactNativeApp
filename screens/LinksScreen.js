import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Text, View, StatusBar } from 'react-native';
import socketIOClient from "socket.io-client";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      jsonData: '',
      text:'',
      endpoint: "http://192.168.0.29:3500/test"
    };
  }
  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", data => {this.setState({ response: data })

  
      fetch('http://192.168.0.29:3500/test', {
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
      <View style={{ paddingTop: 30 }}>
              <Text>{jsonData}</Text>
        </View>
    );
  }
}


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
