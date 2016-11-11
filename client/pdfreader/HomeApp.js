/**
 * Created by Xiaotao.Nie on 11/11/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    WebView,
    Image,
    Navigator,
} from 'react-native';

import MainShow  from './components/MainShow';

export default class HomeApp extends Component {

    constructor(props){
        super(props);
        this.state={
            allUrl:['https://pdf.10000h.top','https://pdf.10000h.top','https://pdf.10000h.top'],
        }
    }

    _add(){

    }

    render() {
        return (
            <Navigator
                initialRoute = {{ name: 'MainShow', component: MainShow }}
                configureScene = {(route) => {
                    return Navigator.SceneConfigs.HorizontalSwipeJump ;
                }}
                renderScene = {(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator = {navigator}/>
                }} />
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:"#f3f4f8",
        marginTop:20,
        alignItems:'center'
    },
    webView:{
        flex:1,
        marginTop:20,
        alignItems: 'center',
    },
    MainListView:{
        flex:1,
        alignItems: 'center',
    },
    addIcon:{
        width:40,
        height:40,
        marginTop:20,
        marginBottom:20,
    }
});


AppRegistry.registerComponent('HomeApp', () => HomeApp);
