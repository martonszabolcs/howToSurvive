/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Modal from '../components/Modal';
import FastImage from 'react-native-fast-image';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Image,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import Header from '../components/Header';
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
      pressedThird: false,
      pressedForth: false,
      opacity: 1,
      headerOpacity: 0,
      virus: false,
      modalOpen: false,
      firstColor: 208,
      secondColor: 240,
      thirdColor: 245,
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
  handleBackPress = () => {
    ToastAndroid.showWithGravity(
      "Don't cheat! 🙃",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.handleAnimation(200);

    setTimeout(() => {
      this.setState({
        virus: true,
      });
      this.handleAnimation(600);
    }, 6000);
    this._interval = setInterval(() => {
      const {
        pressedFirst,
        opacity,
        headerOpacity,
        pressedThird,
        pressedForth,
        firstColor,
        secondColor,
        thirdColor,
      } = this.state;
      if (
        opacity > 0 &&
        headerOpacity < 1 &&
        (pressedFirst || pressedForth || pressedThird)
      ) {
        this.setState({
          opacity: opacity - 0.08,
          headerOpacity: headerOpacity + 0.08,
        });
      } else if (pressedFirst) {
        this.animatedValue.stopAnimation();
        clearInterval(this._interval);
        this.props.navigation.navigate('Paper');
      } else if (pressedThird) {
        this.animatedValue.stopAnimation();
        clearInterval(this._interval);
        this.props.navigation.navigate('Plane');
      } else if (pressedForth) {
        if (firstColor > 125 || secondColor > 200 || thirdColor > 173) {
          this.setState({
            firstColor: firstColor < 124 ? firstColor : firstColor - 4,
            secondColor: secondColor < 199 ? secondColor : secondColor - 4,
            thirdColor: thirdColor < 172 ? thirdColor : thirdColor - 4,
          });
        } else {
          this.animatedValue.stopAnimation();

          clearInterval(this._interval);
          this.props.navigation.reset({routes: [{name: 'Home'}]});
        }
      }
    }, 50);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
    this.animatedValue.stopAnimation();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  changeColor() {
    return (
      'rgb(' +
      this.state.firstColor +
      ', ' +
      this.state.secondColor +
      ', ' +
      this.state.thirdColor +
      ')'
    );
  }

  render() {
    console.log(this.state.bounceValue);

    const {firstBTN, secondBTN, thirdBTN, forthBTN, modalOpen} = this.state;
    return (
      <View style={[styles.container, {backgroundColor: this.changeColor()}]}>
        {modalOpen && (
          <Modal
            navigation={this.props.navigation}
            type="flour"
            text="You can't cook anything with it"
          />
        )}
        <Header opacity={this.state.headerOpacity} />
        <Image
          style={[styles.bgPicture]}
          source={require('../../assets/images/Vector.png')}
        />
        <View style={[styles.content, {opacity: this.state.opacity}]}>
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
                  source={require('../../assets/images/plane.png')}
                />
                <Text style={thirdBTN ? styles.grayText : styles.text}>
                  Airplane ticket
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
                source={Platform.OS === 'android' ? require('../../assets/images/bacteria.png') : require('../../assets/images/apple.png')}
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
                source={Platform.OS === 'android' ? require('../../assets/images/bacteria.png') : require('../../assets/images/apple.png')}
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
                source={Platform.OS === 'android' ? require('../../assets/images/bacteria.png') : require('../../assets/images/apple.png')}
              />
            </View>
            <Animated.View
              style={[
                styles.gif2,
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
              ]}>
              <FastImage
                style={styles.gif}
                source={require('../../assets/images/run.gif')}
              />
            </Animated.View>
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
                source={Platform.OS === 'android' ? require('../../assets/images/bacteria.png') : require('../../assets/images/apple.png')}
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
    resizeMode: 'cover',
    marginLeft: 40,
    width: '70%',
    height: '90%',
  },
  gif2: {
    width: '80%',
    height: '100%',
  },
  icon: {
    resizeMode: 'cover',
    width: 70,
    height: 70,
  },

  bgPicture: {
    resizeMode: 'cover',
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
