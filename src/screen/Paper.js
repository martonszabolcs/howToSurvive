/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import Modal from '../components/Modal';
import {
  StyleSheet,
  View,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Header from '../components/Header';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
var first = '';
var second = '';
if (Math.random() >= 0.5) {
  first = require('../../assets/images/shop1.png');
  second = require('../../assets/images/shop2.png');
} else {
  first = require('../../assets/images/shop2.png');
  second = require('../../assets/images/shop1.png');
}
class Paper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      firstBTN: false,
      secondBTN: false,
      type: '',
      desc: '',
      modalOpen: false,
      hideBTN: false,
    };
    this.animatedValue = new Animated.Value(0);
  }

  handleAnimation = p => {
    // A loop is needed for continuous animation
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

  componentDidMount() {
    this.handleAnimation(600);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    ToastAndroid.showWithGravity(
      "Don't cheat! 🙃",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return true;
  };

  pressed() {
    this.animatedValue.stopAnimation();
    if (Math.random() >= 0.5) {
      this.setState({
        modalOpen: true,
        hideBTN: true,
        type: 'lose',
        desc: 'It’s an empty shop',
      });
    } else {
      this.setState({
        modalOpen: true,
        hideBTN: true,
        type: 'gohome',
        desc: 'Lucky, You have paper. Go home!',
      });
    }
  }

  render() {
    const {firstBTN, secondBTN, modalOpen} = this.state;
    return (
      <View style={styles.container}>
        {modalOpen && (
          <Modal
            navigation={this.props.navigation}
            type={this.state.type}
            text={this.state.desc}
          />
        )}
        <Header />
        <Image
          style={[styles.bgPicture]}
          source={require('../../assets/images/Vector.png')}
        />
        <View style={[styles.content]}>
          {!this.state.hideBTN && (
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({firstBTN: true})}
                onPressOut={() => this.setState({firstBTN: false})}
                onPress={() => this.pressed()}
                style={[styles.button, firstBTN ? styles.noshadow : {}]}>
                <Image style={styles.icon} source={first} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({secondBTN: true})}
                onPressOut={() => this.setState({secondBTN: false})}
                onPressOut={() => this.pressed()}
                style={[styles.button, secondBTN ? styles.noshadow : {}]}>
                <Image style={styles.icon} source={second} />
              </TouchableWithoutFeedback>
            </View>
          )}
          <View style={styles.gifContainer}>
            <Animated.Image
              style={[
                styles.gif,
                {
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
              source={require('../../assets/images/paperBig.png')}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: screenHeight / 6,
    width: barWidth,
    flex: 1,
  },
  row: {flexDirection: 'row'},
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
    width: '60%',
    height: '60%',
  },
  icon: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
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
  gifContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight / 2,
  },
});

export default Paper;
