/**
 * Created by Xiaotao.Nie on 10/11/2016.
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
    TextInput,
    TouchableHighlight
} from 'react-native';

export default class MainShow extends Component {

    constructor(props){
        super(props);
        this.state={
            newUrl:"",
        }
    }

    _return(){
        this.props.addUrl(this.state.newUrl);
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={{flex:1,paddingTop:200,alignItems:'center'}}>
                <View style={styles.inputView}>
                    <View style={styles.inputViewText}>
                        <TextInput
                            style={styles.realinputViewText}
                            autoFocus={true}
                            placeholder="Please input the url of pdf"
                            onChangeText={(newUrl) => this.setState({newUrl:newUrl})}
                            value={this.state.newUrl}
                        />
                    </View>
                </View>
                <View style={styles.inputView}>
                    <TouchableHighlight style={styles.uploadButtonT} activeOpacity={1} onPress={this._return.bind(this)} underlayColor="rgba(255,255,255,0)">
                        <View style={styles.uploadButton}>
                            <View style={styles.uploadButtonBox}>
                                <Text style={styles.uploadButtonLabel}>立即添加</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputViewText:{height: 35, borderColor: '#333333', borderWidth: 1,flex:1,},
    realinputViewText:{
        marginTop:2,
        marginBottom:2,
        marginLeft:10,
        flex:1,
        height:31
    },
    inputView:{
        margin:5,
        flexDirection:'row',
        width:320,
    },
    uploadButtonT:{
        flex:1,
    },
    uploadButton: {
        marginTop: 5,
        flex:1,
    },
    uploadButtonBox: {
        flex: 1,
        height:38,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#c2272b',
        borderRadius: 3,
    },
    uploadButtonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});


AppRegistry.registerComponent('MainShow', () => MainShow);
