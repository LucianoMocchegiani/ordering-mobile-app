import React from "react";
import {ActivityIndicator,View,Dimensions,StyleSheet} from "react-native";

const {width, height} = Dimensions.get('window');

const Loading =()=>{
    return (
      <View style={[styles.Loading]}>
        <ActivityIndicator size="large" />
      </View>
    )
}
export default Loading

const styles = StyleSheet.create({
  Loading: {
    padding:50,
    justifyContent: "center"
  },
})