import React from 'react';
import { Button, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ navigation, route }) => {
    const { paymentUrl } = route.params;
  
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: paymentUrl }} style={{ flex: 1 }} />
      </View>
    );
  };
  
 
  export default PaymentWebViewScreen;
