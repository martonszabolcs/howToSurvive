/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Animated, Easing} from 'react-native';
import Modal from '../components/Modal';

import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Chooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      firstBTN: false,
      secondBTN: false,
      thirdBTN: false,
      forthBTN: false,
      pressedFirst: false,
      pressedSecond: false,
      pressedThird: false,
      pressedForth: false,
      opacity: 1,
      virus: false,
      modalOpen: false,
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

  componentDidMount() {
    this.handleAnimation(200);

    setTimeout(() => {
      this.setState({
        virus: true,
      });
      this.handleAnimation(600);
    }, 5500);
    this._interval = setInterval(() => {
      const {
        pressedFirst,
        pressedSecond,
        opacity,
        pressedThird,
        pressedForth,
      } = this.state;
      if (opacity > 0 && (pressedFirst || pressedSecond)) {
        this.setState({
          opacity: opacity - 0.04,
        });
      } else if (pressedFirst) {
        this.animatedValue.stopAnimation();
        clearInterval(this._interval);
        setTimeout(() => {
          this.props.navigation.navigate('Die');
        }, 1000);
      } else if (pressedThird) {
        this.animatedValue.stopAnimation();
        clearInterval(this._interval);
        setTimeout(() => {
          this.props.navigation.navigate('Chooser');
        }, 1000);
      } else if (pressedForth) {
        this.animatedValue.stopAnimation();
        clearInterval(this._interval);
        setTimeout(() => {
          this.props.navigation.navigate('Chooser');
        }, 1000);
      }
    }, 50);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const {firstBTN, secondBTN, thirdBTN, forthBTN, modalOpen} = this.state;
    return (
      <View style={styles.container}>
        {modalOpen && (
          <Modal navigation={this.props.navigation} type="Italy" text="You can't cook anything with it" />
        )}
        <Image
          style={[styles.bgPicture]}
          source={require('../../assets/images/Vector.png')}
        />
        <View style={[styles.content]}>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({firstBTN: true})}
                onPressOut={() => this.setState({firstBTN: false})}
                onPressOut={() => this.setState({pressedFirst: true})}
                style={[styles.button, firstBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/paper.png')}
                />
                <Text style={firstBTN ? styles.grayText : styles.text}>
                  Paper
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({secondBTN: true})}
                onPressOut={() => this.setState({secondBTN: false})}
                onPressOut={() => this.setState({modalOpen: true})}
                style={[styles.button, secondBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/flour.png')}
                />
                <Text style={secondBTN ? styles.grayText : styles.text}>
                  Flour
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.row}>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({thirdBTN: true})}
                onPressOut={() => this.setState({thirdBTN: false})}
                onPressOut={() => this.setState({pressedThird: true})}
                style={[styles.button, thirdBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/italy.png')}
                />
                <Text style={thirdBTN ? styles.grayText : styles.text}>
                  Airplane ticket to Italy
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({forthBTN: true})}
                onPressOut={() => this.setState({forthBTN: false})}
                onPressOut={() => this.setState({pressedForth: true})}
                style={[styles.button, forthBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/home.png')}
                />
                <Text style={forthBTN ? styles.grayText : styles.text}>
                  Staying at home
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.gifContainer}>
            <View style={{flex: 1, marginLeft: 20}}>
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
                source={require('../../assets/images/bacteria.png')}
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
                source={require('../../assets/images/bacteria.png')}
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
                source={require('../../assets/images/bacteria.png')}
              />
            </View>
            <Animated.Image
              style={[
                styles.gif,
                this.state.virus
                  ? {
                      transform: [
                        {
                          rotate: this.animatedValue.interpolate({
                            inputRange: [-1, 1],
                            outputRange: ['-0.1rad', '0.1rad'],
                          }),
                        },
                      ],
                    }
                  : {},
              ]}
              source={require('../../assets/images/run.gif')}
            />
            {this.state.virus && (
              <Animated.Image
                style={[
                  styles.image,
                  {
                    right: 20,
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
                source={require('../../assets/images/bacteria.png')}
              />
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: barWidth,
    flex: 1,
  },
  row: {flexDirection: 'row'},
  button: {
    width: screenWidth / 3.5,
    borderRadius: 20,
    height: screenWidth / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    resizeMode: 'stretch',
    width: '60%',
    height: '90%',
  },
  icon: {
    resizeMode: 'stretch',
    width: 70,
    height: 70,
  },

  bgPicture: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%',
    height: '70%',
    top: -screenHeight / 9,
    zIndex: -1,
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
  grayText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'Lato-Bold',
  },
  gifContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight / 2,
  },
  image: {
    marginTop: 20,
    height: 50,
    width: 50,
  },
  imageSmall: {
    marginTop: 20,
    height: 30,
    width: 30,
  },
  imageMini: {
    marginTop: 20,
    height: 20,
    width: 20,
  },
  imageLarge: {
    marginTop: 20,
    height: 80,
    width: 80,
  },
});

export default Chooser;
