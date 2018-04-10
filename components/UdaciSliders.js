import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Slider } from 'react-native';
import {Entypo} from '@expo/vector-icons'
import {purple,white,gray} from '../utils/colors'
export const UdaciSliders = ({max,step,unit,value,onChange}) => {
    return(
        <View style={styles.row}>
            <Slider style={{flex:2}} value={value} step={step} maximumValue={max} minimumValue={0} onValueChange={onChange}/>

            <View style={{flex:1}} style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:15
    },
    btn:{
        padding:10,
        margin:5,
        backgroundColor:purple,
        borderRadius:2

    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
      },
})