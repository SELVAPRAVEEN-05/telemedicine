import React from "react";
import Landing from "../screen/landing";
import Login from "../screen/login";
import Register from "../screen/register";
import PatientDashboard from "../screen/patientDashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  PatientDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="PatientDashboard">
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
    </Stack.Navigator>
  );
}
