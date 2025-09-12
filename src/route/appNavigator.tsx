import React from "react";
import Landing from "../screen/landing";
import Login from "../screen/login";
import Register from "../screen/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
