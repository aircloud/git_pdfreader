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
    TouchableHighlight,
    WebView,
    Image,
    ListView,
    DeviceEventEmitter
} from 'react-native';

import AddPdf from './AddPdf';
import PdfShow from './PdfShow';

export default class MainShow extends Component {

    constructor(props){
        super(props);
        var beginUrl = ['/pdf/big.pdf','/pdf/big.pdf'];
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            allUrl:beginUrl,
            dataSource: ds.cloneWithRows(this._genRows(beginUrl)),
        };
    }

    _add(){
        var _that = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'AddPdf',
                component: AddPdf,
                params: {
                    navigator:this.props.navigator,
                    addUrl:function addUrl(newUrl){
                        var temp = _that.state.allUrl;
                        temp.push(newUrl);
                        _that.setState({
                            allUrl:temp
                        });
                        console.log('_that.state.allUrl',_that.state.allUrl);
                    }
                }
            });
        }
        // var temp = this.state.allUrl;
        // temp.push("123123");
        // this.setState({
        //     allUrl:temp
        // });
        // console.log(this.state.allUrl);
        // _that.setState({
        //     dataSource:_that.state.dataSource.cloneWithRows(_that.state.allUrl)
        // });
    }

    _update(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this._genRows(this.state.allUrl))
        });
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

    _gotopdf(urlData){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'PdfShow',
                component: PdfShow,
                params: {
                    navigator:this.props.navigator,
                    urlData:urlData,
                }
            });
        }
    }
    _renderRow(rowData, sectionID, rowID,) {
        console.log("pdf list view rowdata",rowData);
        return (

            <View style={styles.eachLi}>
                <Image style={[styles.thumb]} source={require("./images/pdficon.jpg")} />
                <TouchableHighlight activeOpacity={1} onPress={()=>{this._gotopdf(rowData)}} underlayColor="rgba(255,255,255,0)">
                    <View style={styles.eachLiTextView}>
                        <Text style={styles.eachLiText}>
                            {rowData}
                        </Text>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:"#f3f4f8"}}>
                <View style={styles.mainView}>
                    <View style={styles.MainListView}>
                        <ListView
                            style={styles.ListViewStyle}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                        />
                    </View>
                    <TouchableHighlight activeOpacity={1} onPress={this._add.bind(this)} underlayColor="rgba(255,255,255,0)">
                        <Image source={require("./images/add.png")} style={styles.addIcon}/>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={1} onPress={this._update.bind(this)} underlayColor="rgba(255,255,255,0)">
                        <Text style={{marginBottom:13,fontSize:15}}>刷新列表</Text>
                    </TouchableHighlight>
                </View>
            </View>
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
        width:35,
        height:35,
        marginTop:20,
        marginBottom:10,
    },
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


AppRegistry.registerComponent('MainShow', () => MainShow);
