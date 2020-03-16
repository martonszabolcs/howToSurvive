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
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class End extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			bounceValue: new Animated.Value(-screenHeight),
			opacity: 1
    };
  }

  _toggleSubview() {
    var toValue = 0;

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
        this.state.bounceValue.stopAnimation();
        clearInterval(this._intervaal);
        this.props.navigation.navigate('Donate');
      }, 2000);
    }, 2000);
	}

  render() {
    return (
      <View style={[styles.container, {opacity: this.state.opacity}]}>
        <Animated.Image
          style={[
            styles.bgPicture,
            {transform: [{translateY: this.state.bounceValue}]},
          ]}
          source={require('../../assets/images/win.png')}
        />
        <Text style={styles.text}>
          I’m looking for a new job but I still develop this game.LOL{' '}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(208, 240, 245)',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: screenHeight / 11,
    zIndex: 10,
    marginTop: 60,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
});

export default End;
