import * as React from 'react';
import {Image, Animated} from 'react-native';

import {StyleSheet, View, Text, Dimensions, BackHandler, ToastAndroid} from 'react-native';
import Header from '../components/Header';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Intro extends React.Component {
  state = {
    bounceValue: new Animated.Value(-screenHeight),
    showButton: false,
    firstButton: false,
    secondButton: false,
    pressedFirst: false,
    pressedSecond: false,
    opacity: 1,
  };

  _toggleSubview() {
    var toValue = -screenHeight / 4;
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 10,
      tension: 2,
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    
    setTimeout(() => {
      this.setState({showButton: true});
    }, 500);
    this._toggleSubview();
    this._interval = setInterval(() => {
      const {pressedFirst, pressedSecond, opacity} = this.state;
      if (opacity > 0 && (pressedFirst || pressedSecond)) {
        this.setState({
          opacity: opacity - 0.04,
        });
      } else if (pressedFirst) {
        clearInterval(this._interval);
        setTimeout(() => {
          this.props.navigation.navigate('Die');
        }, 1000);
      } else if (pressedSecond) {
        clearInterval(this._interval);
        setTimeout(() => {
          this.props.navigation.navigate('Chooser');
        }, 1000);
      }
    }, 50);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

  }

  render() {
    const {firstButton, secondButton} = this.state;
    return (
      <View style={styles.container}>
        <Header opacity={this.state.opacity} />
        <Animated.Image
          style={[
            styles.bgPicture,
            {
              opacity: this.state.pressedSecond ? 1 : this.state.opacity,
              transform: [{translateY: this.state.bounceValue}],
            },
          ]}
          source={require('../../assets/images/Vector.png')}
        />
        {this.state.showButton && (
          <View style={[styles.content, {opacity: this.state.opacity}]}>
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({firstButton: true})}
                onPressOut={() => this.setState({firstButton: false})}
                onPress={() => this.setState({pressedFirst: true, firstButton: true})}
                style={[styles.button, firstButton ? styles.noshadow : {}]}>
                <Text
                  style={[
                    firstButton ? styles.grayText : styles.text,
                    {
                      opacity: this.state.pressedSecond
                        ? 1
                        : this.state.opacity,
                    },
                  ]}>
                  {'I'} {'\n'} {"DON'T"} {'\n'} {'CARE'}
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({secondButton: true})}
                onPressOut={() => this.setState({secondButton: false})}
                onPressOut={() => this.setState({pressedSecond: true, secondButton: true})}
                style={[styles.button, secondButton ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/soap.png')}
                />
                <Text style={secondButton ? styles.grayText : styles.text}>
                  PUSH
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <Image
              style={styles.gif}
              source={require('../../assets/images/read.gif')}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: barWidth,
    marginTop: screenHeight / 5,
    flex: 1,
  },
  button: {
    backgroundColor: 'rgb(208, 240, 245)',
    width: screenWidth / 3.5,
    borderRadius: 20,
    height: screenWidth / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    resizeMode: 'stretch',
    width: '70%',
    height: '60%',
  },
  icon: {
    resizeMode: 'stretch',
    width: '70%',
    height: '50%',
  },
  bgPicture: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%',
    height: '70%',
    zIndex: -1,
    position: 'absolute',
  },
  text: {
    fontSize: 25,
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  grayText: {
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'gray',
    fontFamily: 'Lato-Bold',
  },
});

export default Intro;
