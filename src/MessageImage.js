/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, View, ViewPropTypes, ActivityIndicator } from 'react-native';
import PhotoView from 'react-native-photo-view';

export default class MessageImage extends React.Component {
  state = { fetching: false, fullScreen: false };

  render () {
    const {
      containerStyle,
      imageProps,
      imageStyle,
      currentMessage,
    } = this.props;
    const spinnerSize = this.state.fullScreen ? 'large' : 'small';

    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity disabled={this.state.fetching}  onPress={() => { this.setState({ fullScreen: true }) }}>
          <Image
              {...imageProps}
              source={{ uri: currentMessage.thumbnail }}
              style={[styles.image, imageStyle]}
              onLoadStart={() => this.setState({ fetching: true })}
              onLoadEnd={() => this.setState({ fetching: false })}
          />
        </TouchableOpacity>
        <Modal
            style={styles.modal}
            animationType="slide"
            transparent={false}
            visible={this.state.fullScreen}
            onRequestClose={() => this.setState({ fullScreen: false })}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <TouchableOpacity style={styles.closeButtonContainer} onPress={() => { this.setState({ fullScreen: false }) }}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <PhotoView
                {...imageProps}
                source={{ uri: currentMessage.image }}
                androidScaleType='center'
                style={styles.fullScreenImage}
                onLoadStart={() => this.setState({ fetching: true })}
                onLoadEnd={() => this.setState({ fetching: false })}
            />
          </SafeAreaView>
        </Modal>
        { this.state.fetching && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color='white' size={spinnerSize} />
          </View>
        ) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 244,
    width: 244,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover'
  },
  fullScreenImage: {
    height: '90%',
    width: 'auto',
    marginHorizontal: 10
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  closeButtonContainer: {
    marginLeft: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(74,74,74,0.7)',
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
};
