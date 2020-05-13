import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Button,
} from "react-native";
import Constants from "expo-constants";
import * as LocalAuthentication from "expo-local-authentication";

import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  state = {
    authenticated: false,
    modalVisible: true,
    failedCount: 0,
  };

  // setModalVisible(visible) {
  //   this.setState({ modalVisible: visible });
  // }

  clearState = () => {
    this.setState({ authenticated: false, failedCount: 0 });
  };

  scanFingerPrint = async () => {
    try {
      let results = await LocalAuthentication.authenticateAsync();
      console.log(results);
      if (results.success) {
        this.setState({
          modalVisible: false,
          authenticated: true,
          failedCount: 0,
        });
      } else {
        this.setState({
          failedCount: this.state.failedCount + 1,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={[
        styles.container,
        this.state.modalVisible
          ? { backgroundColor: "#b7b7b7" }
          : { backgroundColor: "white" },
      ]}
    >
      <Button
        title={
          this.state.authenticated
            ? "Reset and begin Authentication again"
            : "Begin Authentication"
        }
        onPress={() => {
          this.clearState();
          if (Platform.OS === "android") {
            console.log("Platform.OS: ", Platform.OS);
            //this.setModalVisible(!this.state.modalVisible);
            this.scanFingerPrint();
          } else {
            this.scanFingerPrint();
          }
        }}
      />

      {this.state.authenticated && (
        <Text style={styles.text}>Authentication Successful! 🎉</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onShow={this.scanFingerPrint}
      >
        <View style={styles.modal}>
          <View style={styles.innerContainer}>
            <Text>Sign in with fingerprint</Text>
            <Image
              style={{ width: 128, height: 128 }}
              // source={require('../assets/images/iot.png')}
            />
            {this.state.failedCount > 0 && (
              <Text style={{ color: "red", fontSize: 14 }}>
                Failed to authenticate, press cancel and try again.
              </Text>
            )}
            <TouchableHighlight
              onPress={async () => {
                LocalAuthentication.cancelAuthenticate();
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return <Text style={styles.developmentModeText}>{learnMoreButton}</Text>;
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://rationalappdev.com/react-native-cheat-sheet/#justify-content"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://react-apollo.github.io/2017/01/28/React%20Native%20Styling%20Cheat%20Sheet/"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  modal: {
    flex: 1,
    marginTop: "90%",
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    marginTop: "30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 22,
    paddingTop: 20,
  },
});
