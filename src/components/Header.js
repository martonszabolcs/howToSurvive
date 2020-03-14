import * as React from 'react';
import {Image} from 'react-native';

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

class Header extends React.Component {
	constructor(props){
		super(props)
	}
  render() {
		console.log(this.props)
    return (
      <View
        style={[
          styles.container,
          {opacity: this.props.opacity ? this.props.opacity : 1},
        ]}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require('../../assets/images/bacteria.png')}
          />
          <Text style={styles.text}>How to survive the Coronavirus</Text>
        </View>
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
  text: {
    fontSize: 20,
    width: screenWidth / 2.5,
    margin: 10,
    fontFamily: 'Lato-Bold',
  },
});

export default Header;
