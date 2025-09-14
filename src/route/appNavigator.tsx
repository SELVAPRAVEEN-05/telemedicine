import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import React from 'react';
import Login from '../screen/login';
import AiChecker from '../screen/pacients/aiChecker';
import ConsultDoctor from '../screen/pacients/consultDoctor';
import HealthRecords from '../screen/pacients/healthRecords';
import Landing from '../screen/pacients/landing';
import PatientDashboard from '../screen/pacients/patientDashboard';
import PatientProfile from '../screen/pacients/profile';
import Register from '../screen/pacients/register';
import UpcommingEvents from '../screen/pacients/upcommingEvents';
import ViewMedicines from '../screen/pacients/viewMedicines';
import BookSlot from '../screen/pacients/bookSlot';
import PatientRecordDetails from '../screen/pacients/patientRecordDetails';
import FullRecordDetailsScreen from '../screen/pacients/patientFullDeatils'

interface Doctor {
  id: string;
 
}
export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  UserProfile: undefined;
  PatientDashboard: undefined;
  PatientProfile: undefined;
  ConsultDoctor: undefined;
  ViewMedicines: undefined;
  HealthRecords: undefined;
  AiChecker: undefined;
  UpcommingEvents: undefined;
    bookSlot: { doctors: Doctor };
  PatientRecordDetails: {record : any} ;
  FullRecordDetailsScreen : { recordData: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="ConsultDoctor" component={ConsultDoctor} />
      <Stack.Screen name="ViewMedicines" component={ViewMedicines} />
      <Stack.Screen name="HealthRecords" component={HealthRecords} />
      <Stack.Screen name="AiChecker" component={AiChecker} />
      <Stack.Screen name="UpcommingEvents" component={UpcommingEvents} />
      <Stack.Screen name="bookSlot" component={BookSlot} /> 
      <Stack.Screen name="PatientRecordDetails" component={PatientRecordDetails} />
      <Stack.Screen name="FullRecordDetailsScreen" component={FullRecordDetailsScreen} />
    </Stack.Navigator>
  );
}