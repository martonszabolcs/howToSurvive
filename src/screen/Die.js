import * as React from 'react';
import {Image, Animated} from 'react-native';

import {StyleSheet, View, Text, Dimensions, BackHandler} from 'react-native';
import Header from '../components/Header';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const barWidth = Dimensions.get('screen').width - 80;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class Die extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    bounceValue: new Animated.Value(screenHeight),
  };
  }

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
  handleBackPress = () => {
    return true;
  };
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidMount() {
    this._toggleSubview();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.bgPicture,
            {transform: [{translateY: this.state.bounceValue}]},
          ]}
          source={require('../../assets/images/die.png')}
        />
        <Text style={styles.text}>RIP</Text>

        <View style={styles.content}>
          <Image
            style={styles.gif}
            source={require('../../assets/images/run.gif')}
          />
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
  gif: {
    resizeMode: 'stretch',
    width: '100%',
    height: '88%',
    zIndex: -1,
  },
  bgPicture: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: screenWidth * 1.5,
    height: screenHeight * 1.1,
    zIndex: 2,
    position: 'absolute',
  },
  text: {
    fontSize: 50,
    zIndex: 10,
    marginTop: 60,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
});

export default Die;
