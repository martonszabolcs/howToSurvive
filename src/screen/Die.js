import * as React from 'react';
import {Image, Animated} from 'react-native';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import Header from '../components/Header';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image'

const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Die extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(-screenHeight),
      opacity: 1,
    };
  }

  _toggleSubview() {
    var toValue = -screenHeight / 4;

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 0,
      tension: 20,
      friction: 4,
    }).start();
  }
  handleBackPress = () => {
    ToastAndroid.showWithGravity(
      "Don't cheat! 🙃",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return true;
  };

  componentWillUnmount() {
    clearInterval(this._interval);

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidMount() {
    this._toggleSubview();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    setTimeout(() => {
      this._interval = setInterval(() => {
        this.setState({opacity: this.state.opacity - 0.08});
      }, 100);
      setTimeout(() => {
        clearInterval(this._intervaal);
        this.props.navigation.navigate('End');
      }, 2000);
    }, 2000);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Animated.Image
          style={[
            styles.bgPicture,
            {
              opacity: this.state.opacity,
              transform: [{translateY: this.state.bounceValue}],
            },
          ]}
          source={require('../../assets/images/die.png')}
        />
        <Text style={styles.text}>RIP</Text>
        {this.state.opacity > 0.9 && (
          <View style={[styles.content, {opacity: this.state.opacity}]}>
            <FastImage
              style={styles.gif}
              source={require('../../assets/images/run.gif')}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(208, 240, 245)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: barWidth,
    marginTop: screenHeight / 5,
    flex: 1,
    zIndex: 1,
  },
  button: {
    backgroundColor: 'rgb(208, 240, 245)',
    width: screenWidth / 3.5,
    borderRadius: 20,
    height: screenWidth / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  noshadow: {
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    resizeMode: 'cover',
    width: '100%',
    height: '88%',
    zIndex: -1,
  },
  bgPicture: {
    resizeMode: 'cover',
    alignSelf: 'center',
    width: screenWidth * 1.5,
    height: screenHeight * 1.2,
    zIndex: 2,
    position: 'absolute',
  },
  text: {
    fontSize: 50,
    zIndex: 10,
    marginTop: 60,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
});

export default Die;
