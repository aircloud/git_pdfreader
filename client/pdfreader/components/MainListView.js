/**
 * Created by Xiaotao.Nie on 10/11/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */


import React, { Component } from 'react';
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Image,
    View,
    ListView,
    RecyclerViewBackedScrollView,
    TouchableHighlight,
    Text,
    Navigator
} from 'react-native';

export default class MainListView extends Component{

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            pending:false,
            dataSource: ds.cloneWithRows(this._genRows(this.props.data)),
        }
    }

    render(){
        return (
            <ListView
                style={styles.ListViewStyle}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }

    _genRows(pressData){
        var dataBlob = [];
        for (var ii = 0; ii < pressData.length; ii++) {
            dataBlob.push(pressData[ii])
        }
        return dataBlob;
    }

    _pressRow(rowID) {
        console.log(rowID);
        console.log(this.props);
    }

    _renderRow(rowData, sectionID, rowID,) {
        console.log("pdf list view rowdata",rowData);
        return (
            <View style={styles.eachLi}>
                <Image style={[styles.thumb]} source={require("./images/pdficon.jpg")} />
                <View style={styles.eachLiTextView}>
                    <Text style={styles.eachLiText}>
                        {rowData}
                    </Text>
                </View>
            </View>
        );
    }
};

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    row: {
        alignItems:'center',
        height:220,
        overflow:"hidden",
    },
    ListViewStyle:{
        flex:1
    },
    thumb: {
        // marginTop:50,
        margin:10,
        width:60,
        height:60,
    },
    eachLi:{
        margin:6,
        borderWidth:2,
        borderColor:"#c2272b",
        height:80,
        width:340,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:"#ffffff",
    },
    eachLiTextView:{
        flex:1,
        margin:10,
    },
    eachLiText:{
        flex:1,
        fontSize:16,
    }

});