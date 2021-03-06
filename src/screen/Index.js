import * as React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FastImage from 'react-native-fast-image';


import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';
import Header from '../components/Header';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
const barWidth = Dimensions.get('screen').width - 80;

class Index extends React.Component {
  state = {
    progress: 0,
    opacity: 1,
    BGopacity: 1,
    firstColor: 0,
    secondColor: 0,
    thirdColor: 0,
    launch: Platform.OS === 'android' ? true : false,
  };
  componentDidMount() {
    this._interval = setInterval(() => {
      const {
        progress,
        opacity,
        BGopacity,
        firstColor,
        secondColor,
        thirdColor,
      } = this.state;
      if (BGopacity > 0) {
        this.setState({
          BGopacity: BGopacity - 0.02,
        });
      } else {
        this.setState({launch: false});
      }
      if (progress < 100) {
        this.setState({
          progress: progress + 1,
        });
      } else if (opacity > 0) {
        this.setState({
          opacity: opacity - 0.02,
        });
      } else if (firstColor < 208 || secondColor < 240 || thirdColor < 245) {
        this.setState({
          firstColor: firstColor > 207 ? firstColor : firstColor + 4,
          secondColor: secondColor > 239 ? secondColor : secondColor + 4,
          thirdColor: thirdColor > 244 ? thirdColor : thirdColor + 4,
        });
      } else {
        clearInterval(this._interval);
        this.props.navigation.navigate('Intro');
      }
    }, 50);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  opacity(rgbString, opacity) {
    return rgbString.split(')')[0] + ',' + opacity + ')';
  }
  changeColor() {
    const {firstColor, secondColor, thirdColor} = this.state;
    return 'rgb(' + firstColor + ', ' + secondColor + ', ' + thirdColor + ')';
  }
  render() {
    const brandColor = 'rgba(46, 49, 49)';
    const {opacity, BGopacity, progress} = this.state;
    const progressCustomStyles = {
      backgroundColor: this.opacity(brandColor, opacity),
      borderRadius: 10,
      borderColor: 'transparent',
    };
    if (this.state.launch) {
      return (
        <FastImage
          style={{
            opacity: BGopacity,
            width: '100%',
            marginLeft: 10,
            height: '100%',
          }}
          resizeMode="cover"
          source={require('../../assets/images/launch.png')}
        />
      );
    } else {
      return (
        <View style={[styles.container, {backgroundColor: this.changeColor()}]}>
          <Header />
          <FastImage
            style={[styles.gif, {opacity: opacity}]}
            source={require('../../assets/images/hs.gif')}
          />
          {opacity > 0 && (
            <View>
              <ProgressBarAnimated
                width={barWidth}
                {...progressCustomStyles}
                value={progress}
              />
              {Platform.OS === 'android' && (
                <View style={[styles.content, {opacity: opacity}]}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/images/bat.png')}
                  />
                  <Text style={styles.text}>{progress + ' %'}</Text>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/images/hand-sanitizer.png')}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: barWidth,
    marginTop: 20,
    flexDirection: 'row',
  },
  gif: {
    resizeMode: 'cover',
    width: '100%',
    height: '30%',
  },
  icon: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 20,
    margin: 10,
    color: 'gray',
    fontFamily: 'Lato-Bold',
  },
});

const stateToProps = state => ({
  state: state.state,
});

const dispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(stateToProps, dispatchToProps)(Index);
