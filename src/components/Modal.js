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
		this.setState({isModalVisible: false})
		if (type === 'Italy') navigation.navigate('Die');
  };

  render() {
    const {buttonShadow, pressed} = this.state;
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
                  <Text style={[styles.text, {marginBottom: 40}]}>
                    {this.props.text}
                  </Text>
                  <View
                    style={[
                      styles.button,
                      buttonShadow ? styles.noshadow : {},
                    ]}>
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/soap.png')}
                    />
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
