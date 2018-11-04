import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert
} from "react-native";
// import { Constants } from 'expo';
import Sound from "react-native-sound";
import { AudioRecorder, AudioUtils } from "react-native-audio";

export default class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
    hasPermission: false,
    recording: false,
    audioPath: null,
    playing: false
  };

  componentDidMount() {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      AudioRecorder.onFinished = data => {
        Alert.alert("Record Finish");
      };
    });
  }

  _handleTextChange = value => {
    const inputValue = value;
    this.setState(() => ({
      inputValue
    }));
  };

  _handleSendButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
    this.setState(prevState => ({
      todoList: [...prevState.todoList, this.state.inputValue],
      inputValue: ""
    }));
  };

  _handleDeleteButtonPress = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        (item, i) => parseInt(id) !== i
      );
      return {
        todoList
      };
    });
  };

  record = async () => {
    const audioPath = AudioUtils.DocumentDirectoryPath + "/test.aac";
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac"
    });

    this.setState({ recording: true, audioPath });
    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      this.setState({ recording: false, audioPath: null });
      console.log(error);
    }
  };

  stop = async () => {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }

    this.setState({ recording: false });

    try {
      const filePath = await AudioRecorder.stopRecording();
      console.log(filePath);
      return filePath;
    } catch (error) {
      console.error(error);
    }
  };

  play = async () => {
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, "", error => {
        if (error) {
          console.log("failed to load the sound", error);
        }
      });

      setTimeout(() => {
        this.setState({ playing: true });
        sound.play(success => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
          this.setState({ playing: false });
        });
      }, 500);
    }, 500);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formView}>
          <TextInput
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            placeholder="Input todo"
          />
          <Button title="Add" onPress={this._handleSendButtonPress} />
        </View>
        <FlatList
          data={this.state.todoList}
          style={styles.listView}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{item}</Text>
                <Button
                  title="Delete"
                  onPress={() => {
                    this._handleDeleteButtonPress(index);
                  }}
                  style={styles.deleteButton}
                />
              </View>
            );
          }}
        />
        <View style={styles.formView}>
          <Button
            title={this.state.recording ? "Stop" : "Record"}
            onPress={this.state.recording ? this.stop : this.record}
          />
          <View height={15} />
          <Button
            title="Play"
            onPress={this.play}
            disabled={this.state.audioPath === null || this.state.recording || this.state.playing}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#eee"
  },
  formView: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8
  },
  inputForm: {
    backgroundColor: "#fff",
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8
  },
  todoItem: {
    alignItems: "center",
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    // border: '1 solid #333',
    flex: 1,
    flexDirection: "row"
  },
  todoText: {
    flex: 1
  },
  recordRow: {
    flexDirection: "row"
    // justifyContent: 'space-around',
    // alignItems: 'center'
  }
});
