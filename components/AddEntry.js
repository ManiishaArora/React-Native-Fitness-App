import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,AsyncStorage} from 'react-native';
import {getMetricMetaInfo,timeToString,getDailyReminderValue,clearLocalNotification,setLocalNotification} from '../utils/helpers.js'
import {UdaciSteppers} from './UdaciSteppers'
import {UdaciSliders} from './UdaciSliders'
import {purple,white,blue} from '../utils/colors'
import  {submitEntry,removeEntry} from '../utils/api'
import {Ionicons} from '@expo/vector-icons'
import {connect} from 'react-redux'
import  {addEntry,receiveEntries} from '../actions/index'
import { NavigationActions } from 'react-navigation'


class AddEntry extends Component {
    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0
    }
    submit = () => {
        const key = timeToString()
        const entry = this.state
        
        this.props.dispatch(addEntry({
            [key]:entry
        }))
        this.setState({
            run:0,
            bike:0,
            swim:0,
            sleep:0,
            eat:0
        })
        submitEntry({entry,key})
        clearLocalNotification()
              .then(setLocalNotification)
        this.toHome()
    }
    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]:getDailyReminderValue()
        }))
        removeEntry(key)
        this.toHome()
    }
    increment = (metric) => {
        const {step,max} = getMetricMetaInfo(metric)
        const value = this.state[metric]
        if(value<max)
            this.setState({[metric]:value+step})
    }
    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric)
        const value = this.state[metric]
        if(value!==0)
            this.setState({[metric]:value-step})
    }
    slide = (metric,value) => {
        this.setState({[metric]:value})
    }
    toHome = () => {
            this.props.navigation.dispatch(NavigationActions.back({key: 'AddEntry'}))
    }
    render(){

        if(this.props.alreadyLogged){
            return(
                <View style={{flex:1}}>
                    <View style={styles.column}>
                        <Ionicons name={'ios-happy-outline'} size={100} />
                        <Text>You've already logged information for the day</Text>
                        <TouchableOpacity onPress={this.reset}><Text style={{color:purple}}>Reset</Text></TouchableOpacity>
                    </View>
                </View>
            )
        }
        const metaInfo = getMetricMetaInfo()
        const date = timeToString()
        return(
            <View style={styles.container}>
                <View style={styles.dateHdr}>
                     <Text style={styles.dateHdrTxt}>{(new Date()).toLocaleDateString()}</Text>
                </View>
                {Object.keys(metaInfo).map(key => {
                    const {displayName,type,getIcon,...rest} = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type==='steppers' &&
                                <UdaciSteppers value={value} {...rest}
                                onIncrement={()=>this.increment(key)} onDecrement={()=>this.decrement(key)} />
                                
                            }
                            {type==='slider' &&
                                <UdaciSliders value={value} {...rest}
                                onChange={(value)=>this.slide(key,value)} />
                                
                            }
                           
                            
                        </View> 
                    )
                })}
                <TouchableOpacity onPress={this.submit} style={styles.submitBtn}>
                    <Text style={{color:white,textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}

const mapStateToProps = (state) => {
    const key = timeToString()
    return{
        alreadyLogged:state[key]&& typeof state[key].today==='undefined'
    }
}
export default connect(mapStateToProps)(AddEntry)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    column:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    submitBtn:{
        backgroundColor:blue,
        padding:10,
        borderRadius:3,
    },
    dateHdr:{
        padding:15
    },
    dateHdrTxt:{
        textAlign:'center',
        fontSize:18
    }
})