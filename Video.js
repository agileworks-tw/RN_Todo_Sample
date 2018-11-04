import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { RNCamera, FaceDetector } from "react-native-camera";

export default class Video extends Component {
  state = {
    recording: false
  };

  handleRecord = async () => {
    if (this.state.recording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  };

  startRecording = async () => {
    if (this.camera) {
      this.setState({ recording: true });
      // default to mp4 for android as codec is not set
      const recordVideo = await this.camera.recordAsync();
      this.setState({ recording: false });
      console.log(recordVideo);
    }
  };

  stopRecording = () => {
    this.camera.stopRecording();
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity onPress={this.handleRecord} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>
              {this.state.recording ? "Stop" : "Record"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
