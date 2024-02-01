import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

const TimePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  // console.log(selectedTime, "selected time from time picker")

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (time) => {
    const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    setSelectedTime(formattedTime);
    hideDatePicker();
    try {
      await AsyncStorage.setItem('time', JSON.stringify(formattedTime));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style="flex-1 items-center justify-center">
      <TouchableOpacity onPress={showDatePicker}>
        <Text style="text-2xl font-bold">{selectedTime || 'Select Time'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* <Button title="Save" onPress={() => console.log(selectedTime)} /> */}
    </View>
  );
};

export default TimePicker;
