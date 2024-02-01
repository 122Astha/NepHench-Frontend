import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Button,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ScheduleScreen = () => {
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [date, setDate] = useState(new Date(Date.now()))
  const [formattedDate, setFormattedDate] = useState('')

  const showPicker = () => {
    setIsPickerShow(true)
  }
  
  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
    setIsPickerShow(false)
    // Format the date
    const BeforeformattedDate = moment(currentDate).format('YYYY-MM-DD')
    setFormattedDate(BeforeformattedDate)
    try {
      await AsyncStorage.setItem('date', JSON.stringify(BeforeformattedDate))
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(formattedDate, 'formatted date outside the function')
  return (
    <>
      <View>
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
        <TouchableOpacity onPress={showPicker}>
          {!isPickerShow ? (
            <Button
              title={formattedDate ? formattedDate : 'Select Date'}
              color="grey"
              onPress={showPicker}
            />
          ) : (
            <Text>{formattedDate ? formattedDate : 'Select Date'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})

export default ScheduleScreen
