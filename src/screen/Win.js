import * as React from 'react';
import {Image, Animated, Easing} from 'react-native';

import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Header from '../components/Header';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Win extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(screenHeight),
    };
    this.animatedValue = new Animated.Value(0);
  }
  handleAnimation = p => {
    // A loop is needed for continuous animation
    Animated.loop(
      // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(this.animatedValue, {
          toValue: 1.0,
          duration: p,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(this.animatedValue, {
          toValue: -1.0,
          duration: p,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
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

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.bgPicture,
            {transform: [{translateY: this.state.bounceValue}]},
          ]}
          source={require('../../assets/images/win.png')}
        />
        <Text style={styles.text}>SURVIVED</Text>

        <View style={styles.content}>
            <View style={{flex: 1, marginLeft: 20, position: 'absolute', zIndex:2, bottom: 20}}>
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
  image: {
    resizeMode: 'stretch',
    width: 40,
    height: 40,
    zIndex: -1,
  },
  imageLarge: {
    resizeMode: 'stretch',
    width: screenWidth/2,
    height: screenWidth/2,
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
    marginTop: screenHeight/4,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
});

export default Win;
