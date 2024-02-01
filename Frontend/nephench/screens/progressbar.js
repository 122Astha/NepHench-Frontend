import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tailwind from 'tailwind-rn';

function TaskProgressBarButton({ label, onPress, progress }) {
  return (
    <TouchableOpacity
      style={tailwind(
        'bg-blue-500 rounded-md p-2 flex-row items-center justify-between'
      )}
      onPress={onPress}
    >
      <Text style={tailwind('text-white font-semibold')}>{label}</Text>
      <View
        style={tailwind(
          'bg-blue-200 h-2 rounded-md absolute bottom-0 left-0 right-0'
        )}
      >
        <View
          style={tailwind('bg-blue-500 h-2 rounded-md')}
          // style={{ width: `${progress}%` }}
        ></View>
      </View>
    </TouchableOpacity>
  );
}

function App() {
  const handleButtonClick = () => {
    // Handle button click action here
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      <TaskProgressBarButton
        label="Start Task"
        onPress={handleButtonClick}
        progress={50} // Set the progress value (percentage)
      />
    </View>
  );
}

export default App;
