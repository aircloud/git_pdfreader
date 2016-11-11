/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import HomeApp from './HomeApp';

export default class pdfreader extends Component {
  render() {
    return (
        <View style={styles.topView}>
          <HomeApp/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  topView:{
    flex:1,
  }
});

AppRegistry.registerComponent('pdfreader', () => pdfreader);
