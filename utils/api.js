import {AsyncStorage} from 'react-native'
import {CALENDAR_STORAGE_KEY,formatCalendarResults} from './_calendar'

export const fetchCalendarResults = () => {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults)
}

export const submitEntry = async ({entry,key}) => {
    try{
        const promise =  await AsyncStorage.mergeItem(key,JSON.stringify({
            [key]:entry
        }))
        return promise
    }catch(e){
        console.error(e)
    }
}

export const removeEntry = async (key) => {
    try{
        const obj = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        const data = JSON.parse(obj)
        delete data[key]
        return AsyncStorage.setItem(key,JSON.stringify(data))
    }catch(e){
        console.error(e)
    }
}
