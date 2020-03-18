import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Animated,
  Easing,
} from 'react-native';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Win extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(screenHeight),
      opacity: 1,
    };
    this.animatedValue = new Animated.Value(0);
  }
  handleAnimation = p => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: 1.0,
          duration: p,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValue, {
          toValue: -1.0,
          duration: p,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValue, {
          toValue: 0.0,
          duration: p,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  _toggleSubview() {
    var toValue = -screenHeight / 4;
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 0,
      tension: 20,
      friction: 4,
    }).start();
  }

  componentDidMount() {
    this._toggleSubview();
    this.handleAnimation(200);
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

  render() {
    return (
      <View style={[styles.container]}>
        <Animated.Image
          style={[
            styles.bgPicture,
            {opacity: this.state.opacity},
            {transform: [{translateY: this.state.bounceValue}]},
          ]}
          source={require('../../assets/images/win.png')}
        />
        <Text style={styles.text}>SURVIVED</Text>

        <View style={[styles.content, {opacity: this.state.opacity}]}>
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              position: 'absolute',
              zIndex: 2,
              bottom: 20,
            }}>
            <Animated.Image
              style={[
                styles.imageLarge,
                {
                  marginLeft: 40,
                  top: -40,

                  transform: [
                    {
                      rotate: this.animatedValue.interpolate({
                        inputRange: [-1, 1],
                        outputRange: ['-0.1rad', '0.1rad'],
                      }),
                    },
                  ],
                },
              ]}
              source={require('../../assets/images/appleBig.png')}
            />
            <Animated.Image
              style={[
                styles.image,
                {
                  left: 20,
                  top: -20,
                  transform: [
                    {
                      rotate: this.animatedValue.interpolate({
                        inputRange: [-1, 1],
                        outputRange: ['-0.1rad', '0.1rad'],
                      }),
                    },
                  ],
                },
              ]}
              source={require('../../assets/images/apple.png')}
            />

            <Animated.Image
              style={[
                styles.image,
                {
                  height: 20,
                  width: 20,
                  transform: [
                    {
                      rotate: this.animatedValue.interpolate({
                        inputRange: [-1, 1],
                        outputRange: ['-0.1rad', '0.1rad'],
                      }),
                    },
                  ],
                },
              ]}
              source={require('../../assets/images/apple.png')}
            />
          </View>
        </View>
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
  image: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    zIndex: -1,
  },
  imageLarge: {
    resizeMode: 'cover',
    width: screenWidth / 2,
    height: screenWidth / 2,
    zIndex: -1,
  },
  bgPicture: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: screenWidth * 1.5,
    height: screenHeight * 1.1,
    zIndex: -1,
    position: 'absolute',
  },
  text: {
    fontSize: 50,
    zIndex: 10,
    marginTop: screenHeight / 4,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
});

export default Win;
