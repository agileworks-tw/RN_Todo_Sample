import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { RNCamera, FaceDetector } from "react-native-camera";
import Video from "react-native-video";
export default class VideoScreen extends Component {
  state = {
    recording: false,
    recordVideo: null
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
      this.setState({ recordVideo });
    }
  };

  stopRecording = () => {
    this.camera.stopRecording();
  };

  reset = () => {
    this.setState({
      recordVideo: null
    });
  };

  render() {
    return this.state.recordVideo ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Video
          source={{
            uri: this.state.recordVideo.uri
          }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
        <TouchableOpacity onPress={this.reset}>
          <Text style={{ fontSize: 22 }}>Back</Text>
        </TouchableOpacity>
      </View>
    ) : (
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
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "center"
          }}
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
  },
  backgroundVideo: {
    height: "80%",
    width: "100%"
  }
});
