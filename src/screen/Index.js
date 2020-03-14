import * as React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Header from '../components/Header';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
const barWidth = Dimensions.get('screen').width - 80;

class Index extends React.Component {
  state = {
    progress: 0,
    opacity: 1,
    firstColor: 0,
    secondColor: 0,
    thirdColor: 0,
  };
  componentDidMount() {
    this._interval = setInterval(() => {
      const {
        progress,
        opacity,
        firstColor,
        secondColor,
        thirdColor,
      } = this.state;
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
        this.props.navigation.navigate('Intro');
      }
    }, 50);
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  addOpacity(rgbString, opacity) {
    return rgbString.split(')')[0] + ',' + opacity + ')';
  }
  changeColor() {
    return (
      'rgb(' +
      this.state.firstColor +
      ', ' +
      this.state.secondColor +
      ', ' +
      this.state.thirdColor +
      ')'
    );
  }
  render() {
    const brandColor = 'rgba(46, 49, 49)';
    const {opacity, progress} = this.state;
    const progressCustomStyles = {
      backgroundColor: this.addOpacity(brandColor, opacity),
      borderRadius: 10,
      borderColor: 'transparent',
    };
    return (
      <View style={[styles.container, {backgroundColor: this.changeColor()}]}>
        <Header/>
        <Image
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
          </View>
        )}
      </View>
    );
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
    resizeMode: 'stretch',
    width: '100%',
    height: '30%',
  },
  icon: {
    resizeMode: 'stretch',
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
