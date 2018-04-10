import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {Entypo} from '@expo/vector-icons'
import {purple,white,gray} from '../utils/colors'
export const UdaciSteppers = ({max,step,unit,value,onIncrement,onDecrement}) => {
    return(
        <View style={styles.row}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={onDecrement} style={styles.btn}>
                    <Entypo name="minus" size={30} color={white} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onIncrement} style={styles.btn}>
                    <Entypo name="plus" size={30} color={white} />
                </TouchableOpacity>
            </View>

            <View style={styles.metricCounter}>
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