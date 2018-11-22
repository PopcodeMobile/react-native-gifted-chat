import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import Video from "react-native-video";
import Lightbox from "react-native-lightbox";

export default function MessageVideo({
  containerStyle,
  videoProps,
  videoStyle,
  currentMessage,
  lightboxProps
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Lightbox
        activeProps={{
          style: styles.active
        }}
        {...lightboxProps}
        {...videoProps}
      >
        <Video
          {...videoProps}
          ref={r => {
            this.player = r;
          }}
          source={{ uri: currentMessage.video }}
          style={videoStyle}
          resizeMode="cover"
          onBuffer={this.onBuffer}
          onLoadStart={this.onLoadStart}
          onLoad={this.onLoad}
        />
      </Lightbox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  active: {
    flex: 1,
    resizeMode: "contain"
  }
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
    margin: 3,
    resizeMode: "cover"
  },
  videoProps: {}
};

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  videoStyle: ViewPropTypes.style,
  videoProps: PropTypes.object
};
