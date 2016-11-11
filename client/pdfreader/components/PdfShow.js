/**
 * Created by Xiaotao.Nie on 5/11/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';

export default class MainShow extends Component {

    constructor(props){
        super(props);
        this.state={
            urlData:this.props.urlData,
        }
    }

    render() {
        var prefix = 'https://pdf.10000h.top/build/generic/web/viewer.html?file=';
        var url=prefix+this.state.urlData;
        return (
            <WebView
                style={styles.webView}
                source={{uri:url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    webView:{
        flex:1,
        marginTop:20
    }
});


AppRegistry.registerComponent('MainShow', () => MainShow);
