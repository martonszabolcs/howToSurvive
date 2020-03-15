/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Animated, Easing} from 'react-native';
import Modal from '../components/Modal';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Header from '../components/Header';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Plane extends React.Component {
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
    this.handleAnimation(600);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }

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
        desc: 'Lucky, You have Plane. Go home!',
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
                <Image style={styles.icon} source={require('../../assets/images/plane.png')} />
								<Text style={firstBTN ? styles.grayText : styles.text}>
								GO BACK HOME
                </Text></TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({secondBTN: true})}
                onPressOut={() => this.setState({secondBTN: false})}
                onPressOut={() => this.pressed()}
                style={[styles.button, secondBTN ? styles.noshadow : {}]}>
                <Image style={styles.icon} source={require('../../assets/images/round.png')} />
								<Text style={secondBTN ? styles.grayText : styles.text}>
                  LET'S PLAY
                </Text></TouchableWithoutFeedback>
            </View>
          )}
          <View style={styles.gifContainer}>
            
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
    resizeMode: 'stretch',
    width: '60%',
    height: '60%',
  },
  icon: {
    resizeMode: 'stretch',
    width: 80,
    height: 80,
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
});

export default Plane;
