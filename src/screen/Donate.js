import * as React from 'react';
import {Image, Animated} from 'react-native';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  BackHandler,
  TouchableOpacity,
	ToastAndroid,
	Linking
} from 'react-native';

import Header from '../components/Header';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const donationURL = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=V7BWUM5M9YKDW&source=url";


class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(-screenHeight),
      opacity: 0,
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
		this.state.bounceValue.removeAllListeners()

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidMount() {
    this._toggleSubview();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    setTimeout(() => {
      this._interval = setInterval(() => {
        this.setState({opacity: this.state.opacity + 0.08});
      }, 100);
    }, 1000);
	}
	

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.bgPicture,
            {transform: [{translateY: this.state.bounceValue}]},
          ]}
          source={require('../../assets/images/donate.png')}
        />

        <Image
          style={[styles.image, {opacity: this.state.opacity}]}
          source={require('../../assets/images/me.png')}
        />
        <Text style={[styles.text, {opacity: this.state.opacity}]}>
          So. Thank you for playing HowToSurvive. I’ll be really happy if you
          can donate. It helps to make the new games :)
        </Text>
        <View style={{flexDirection: 'row', opacity: this.state.opacity}}>
          <TouchableOpacity onPress={() =>  Linking.openURL(donationURL)} style={styles.button}>
            <Text style={[styles.btntext]}>{'DONATE'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('jani')} style={styles.button}>
            <Text style={[styles.btntext]}>{'WATCH VIDEO'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {this.props.navigation.reset({routes: [{ name: 'Intro' }] })}}
          style={styles.button2}>
          <Text style={[styles.text]}>I DON'T CARE, LET'S PLAY AGAIN!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(208, 240, 245)',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgPicture: {
    resizeMode: 'cover',
    alignSelf: 'center',
    width: screenWidth * 1.3,
    height: screenHeight * 1.2,
    zIndex: -2,
    position: 'absolute',
  },
  image: {
    resizeMode: 'cover',
    alignSelf: 'center',
    width: screenWidth / 3,
    height: screenWidth / 1.3,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
  btntext: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
  button: {
    backgroundColor: '#FDC255',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 20,
    width: screenWidth / 3,
    height: 50,
  },
  button2: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 20,
    paddingHorizontal: 20,
    height: 50,
  },
});

export default Donate;
