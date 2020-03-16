/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Animated, Easing} from 'react-native';
import Modal from '../components/Modal';
import {StyleSheet, View, Text, Dimensions,BackHandler, ToastAndroid} from 'react-native';
import Header from '../components/Header';
import WheelOfFortune from '../components/react-native-wheel-of-fortune';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const rewards = [
  'WIN',
  'LOSE',
  'WIN',
  'LOSE',
  'WIN',
  'LOSE',
  'WIN',
  'LOSE',
  'WIN',
  'LOSE',
];

class Plane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      firstBTN: false,
      secondBTN: false,
      pressedSecond: false,
      type: '',
      desc: '',
      modalOpen: false,
      hideBTN: false,
      winnerValue: '',
    };
    this.animatedValue = new Animated.Value(0);
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
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  pressed() {
    this.animatedValue.stopAnimation();
    if (Math.random() >= 0.5) {
      this.setState({
        modalOpen: true,
        hideBTN: true,
        type: 'lose',
        desc: 'The airport is closed',
      });
    } else {
      this.setState({
        modalOpen: true,
        hideBTN: true,
        type: 'gohome',
        desc: 'Lucky, You have plane. Go home!',
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
                disabled={this.state.pressedSecond}
                style={[styles.button, firstBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/plane.png')}
                />
                <Text style={firstBTN ? styles.grayText : styles.text}>
                  GO BACK HOME
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({secondBTN: true})}
                onPressOut={() => this.setState({secondBTN: false})}
                onPressOut={() => {
                  this.setState({pressedSecond: true});
                  this.child._onPress();
                }}
                style={[styles.button, secondBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/round.png')}
                />
                <Text style={secondBTN ? styles.grayText : styles.text}>
                  LET'S PLAY
                </Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          <View style={styles.gifContainer}>
            <WheelOfFortune
              onRef={ref => (this.child = ref)}
              rewards={rewards}
              knobSize={20}
              borderWidth={1}
              borderColor={'transparent'}
              innerRadius={50}
              backgroundColor={'white'}
              getWinner={(value, index) => {
                this.setState({winnerValue: value});
                setTimeout(() => {
                  if (value === 'WIN') {
                    this.props.navigation.navigate('Home');
                  } else {
                    this.props.navigation.navigate('Die');
                  }
                }, 2000);
              }}
            />
            {this.state.winnerValue !== '' && (
              <Text style={[styles.text, {position: 'absolute', fontSize: 50}]}>
                {this.state.winnerValue}
              </Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight / 2,
  },
});

export default Plane;
