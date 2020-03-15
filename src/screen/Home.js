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
const images = {
  tv: {src: require('../../assets/images/tv.png')},
  porn: {src: require('../../assets/images/porn.png')},
  titanic: {src: require('../../assets/images/titanic.png')},
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstBTN: false,
      secondBTN: false,
      pr: false,
      modalOpen: false,
      img: 'tv',
      hideBTN: false,
      bounceValue: new Animated.Value(-screenHeight / 9),
    };
  }

  _toggleSubview() {
    var toValue = -screenHeight / 7;

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 0,
      tension: 20,
      friction: 1,
    }).start();
  }

  componentDidMount() {
    this._toggleSubview();
  }
  pressed(type) {
		if (!this.state.pr){
      setTimeout(() => {
        this.setState({modalOpen: true});
      }, 4000);
  }
    this.setState({img: type, pr: true});
    
  }

  render() {
    const {firstBTN, secondBTN, modalOpen, img} = this.state;
    return (
      <View style={styles.container}>
        {modalOpen && (
          <Modal
            navigation={this.props.navigation}
            type="home"
            color="#7DC8AD"
            text="Two weeks later"
          />
        )}
        <Header />
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
        <View style={[styles.content]}>
          {!this.state.hideBTN && (
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback
                onPressIn={() =>
                  this.setState({firstBTN: true, secondBTN: false})
                }
                onPress={() => this.pressed('porn')}
                style={[styles.button, firstBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/single.png')}
                />
                <Text style={firstBTN ? styles.grayText : styles.text}>
                  ALONE
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={() =>
                  this.setState({secondBTN: true, firstBTN: false})
                }
                onPressOut={() => this.pressed('titanic')}
                style={[styles.button, secondBTN ? styles.noshadow : {}]}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/couple.png')}
                />
                <Text style={secondBTN ? styles.grayText : styles.text}>
                  {'WITH'} {'\n'} {'LOVE'}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <View style={styles.gifContainer}>
          <Animated.Image style={[styles.gif]} source={images[img].src} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7DC8AD',
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
    backgroundColor: '#7DC8AD',
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
    width: '100%',
    height: '80%',
    zIndex: -10,
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
    height: '60%',
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
    zIndex: -2,
    width: screenWidth,
    height: screenHeight / 2,
  },
});

export default Home;
