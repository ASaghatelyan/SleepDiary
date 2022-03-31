import React, { Fragment } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View } from 'react-native';

import StackNavigation from './app/navigation/StackNavigation';


const App = (props) => {
  return (
    <Fragment>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={{ flex: 1, backgroundColor: "#000" }}
        contentContainerStyle={{ flex: 1, backgroundColor: "#000" }}
        enabled={Platform.OS === "ios" ? true : false}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#EFEFEF' }} />
        <View style={{ flex: 1, backgroundColor: "#2B91BF" }}>
          <StackNavigation />
        </View>
      </KeyboardAvoidingView>
    </Fragment>

  );
};


export default App;
