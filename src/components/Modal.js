import * as React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Picker,
  Platform,
} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const images = {
  flour: {src: require('../../assets/images/soap.png')},
  home: {src: require('../../assets/images/soap.png')},
  lose: {src: require('../../assets/images/sad.png')},
  gohome: {src: require('../../assets/images/homeBig.png')},
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
      buttonShadow: false,
      pressed: false,
    };
  }
  onPress = () => {
    const {type, navigation} = this.props;
    this.setState({isModalVisible: false});
    console.log(this.props)
      
    if (type === 'flour') navigation.navigate('Die');
    if (type === 'lose') navigation.navigate('Die');
    if (type === 'gohome') navigation.navigate('Home');
    if (type === 'home') {
      navigation.navigate('Win');
    }

  };

  render() {
    const {buttonShadow, pressed} = this.state;
    const {type, text, color} = this.props;
    return (
      <View style={{flex: 1}}>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.content}>
            <View style={styles.container}>
              <TouchableWithoutFeedback
                onPressIn={() => this.setState({buttonShadow: true})}
                onPressOut={() => this.setState({buttonShadow: false})}
                onPress={() => this.onPress()}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.text, {marginBottom: 40}]}>{text}</Text>
                  <View
                    style={[
                      styles.button,
                      buttonShadow ? styles.noshadow : {},
                      color ? {backgroundColor: color} : {}
                    ]}>
                    <Image style={styles.icon} source={images[type].src} />
                    <Text style={buttonShadow ? styles.grayText : styles.text}>
                      PUSH
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 2,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    top: -screenWidth * 1.73,
    margin: 'auto',
    position: 'absolute',
    paddingBottom: screenWidth / 13,
    borderRadius: screenWidth,
    height: screenWidth * 2,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 50,
    width: 50,
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
  button: {
    backgroundColor: 'rgb(208, 240, 245)',
    width: screenWidth / 2,
    borderRadius: 20,
    height: screenHeight / 3,
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
  icon: {
    resizeMode: 'cover',
    width: screenWidth/2.5,
    height: screenWidth/2.5,
  },
  text: {
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
  grayText: {
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'Lato-Bold',
  },
});

export default Header;
