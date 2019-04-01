import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from "react-native-video";


export default class MessageVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false, fetching: false };
  }

  playVideo() {
    if (!this.state.playing && this.player && !this.state.fetching) {
      this.setState({ playing: true });
      this.player.presentFullscreenPlayer();
    }
  }

  render() {
    const {
      containerStyle,
      videoProps,
      videoStyle,
      imageOverlayStyle,
      currentMessage,
      playImageOverlay,
    } = this.props;
    const { playing, fetching } = this.state;

    return (
      <View style={[styles.container, containerStyle]}>
        <Video
          controls={playing}
          paused={!playing}
          ref={(r) => {
            this.player = r;
          }}
          resizeMode="contain"
          fullscreenOrientation="landscape"
          source={{ uri: currentMessage.video }}
          style={videoStyle}
          {...videoProps}
          onLoad={() => this.setState({ fetching: false })}
          onLoadStart={() => this.setState({ fetching: true })}
          onFullscreenPlayerDidDismiss={() => this.setState({ playing: false })}
        />
        {(!playing || fetching) && (
          <TouchableOpacity
            disabled={fetching}
            onPress={this.playVideo.bind(this)}
            style={styles.videoPlayButton}
          >
            { fetching ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Image
                style={imageOverlayStyle}
                source={playImageOverlay}
              />
            ) }
          </TouchableOpacity>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  videoPlayButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

MessageVideo.defaultProps = {
  currentMessage: {
    // video: null,
  },
  containerStyle: {},
  videoStyle: {
    width: 150,
    height: 100,
    borderRadius: 13,
  },
  videoProps: {},
  imageOverlayStyle: {
    width: 70,
    height: 70,
  },
};

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  videoStyle: ViewPropTypes.style,
  videoProps: PropTypes.object,
  playImageOverlay: PropTypes.number || PropTypes.object,
  imageOverlayStyle: Image.propTypes.style,
};
