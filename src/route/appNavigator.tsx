import React from "react";
import Landing from "../screen/landing";
import Login from "../screen/login";
import Register from "../screen/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordsScreen from "../screen/patientrecord"
import RecordDetailsScreen from "../screen/recorddeatils";
import FullRecordDetailsScreen from "../screen/fulldeatils";

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  RecordsScreen: undefined;
  RecordDetails: { record: any };
  FullRecordDetailsScreen: { recordData: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="RecordsScreen"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Landing" component={Landing} /> */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Register" component={Register} /> */}
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
      <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} />
      <Stack.Screen name="FullRecordDetailsScreen" component={FullRecordDetailsScreen} />
    </Stack.Navigator>
  );
}