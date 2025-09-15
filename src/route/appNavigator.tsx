// AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppointmentsQueueScreen from '../screen/doctor/appointmentDetails';
import AvailabilityScreen from '../screen/doctor/avalibilable';
import DoctorAppointments from '../screen/doctor/doctorAppointments';
import DoctorDashboard from '../screen/doctor/doctorDashboard';
import DoctorLayout from '../screen/doctor/doctorLayout';
import DoctorPatientQueue from '../screen/doctor/doctorPatientQueue';
import DoctorRegister from '../screen/doctor/doctorRegister';
import PatientDetailsShowDoctor from "../screen/doctor/PatientDetailsScreen";
import PatientRecordsScreen from '../screen/doctor/patientRecord';
import Login from '../screen/login';
import AiChecker from '../screen/pacients/aiChecker';
import BookSlot from '../screen/pacients/bookSlot';
import ConsultDoctor from '../screen/pacients/consultDoctor';
import HealthRecords from '../screen/pacients/healthRecords';
import Landing from '../screen/pacients/landing';
import PatientDashboard from '../screen/pacients/patientDashboard';
import FullRecordDetailsScreen from '../screen/pacients/patientFullDeatils';
import PatientRecordDetails from '../screen/pacients/patientRecordDetails';
import PatientProfile from '../screen/pacients/profile';
import Register from '../screen/pacients/register';
import PharmacyDetailsScreen from '../screen/pacients/searchMedicines';
import UpcommingEvents from '../screen/pacients/upcommingEvents';
import ViewMedicines from '../screen/pacients/viewMedicines';
import EditMedicineScreen from '../screen/pharmacy/EditPharmacyDeatils';
import PharmacyDashboard from '../screen/pharmacy/pharmacyDashboard';

import DoctorProfile from '../screen/doctor/doctorProfile';
import Videocall from '../screen/trial/VideoCall';

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
  PharmacyDashboard: undefined;
  UpcommingEvents: undefined;
  bookSlot: { doctors: Doctor };
  doctorLayout: undefined;

  DoctorLayout: undefined;
  DoctorDashboard: undefined;
  PatientRecordDetails: { record: any };
  FullRecordDetailsScreen: { recordData: any };
  PharmacyDetails: { pharmacy: any };
  AvailabilityScreen: undefined;
  EditMedicineScreen: { medicine: any; onSave: (medicine: any) => void };
  PatientRecordsScreen: undefined;
  PatientDetailsScreen: { record: any };
  DoctorAppointments: undefined;
  DoctorPatientQueue: undefined;
  AppointmentsQueueScreen: undefined,
  PatientQueueScreen: undefined
  Videocall: undefined;
  DoctorRegister: undefined;
  DoctorProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DoctorRegister"
      screenOptions={{ headerShown: false }}
    >
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
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Stack.Screen name="DoctorLayout" component={DoctorLayout} />
      <Stack.Screen name="PharmacyDetails" component={PharmacyDetailsScreen} />
      <Stack.Screen name="AvailabilityScreen" component={AvailabilityScreen} />
      <Stack.Screen name="Videocall" component={Videocall} />
      <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
      <Stack.Screen name="DoctorPatientQueue" component={DoctorPatientQueue} />
      <Stack.Screen name="PharmacyDashboard" component={PharmacyDashboard} />
      <Stack.Screen name="EditMedicineScreen" component={EditMedicineScreen} />
      <Stack.Screen name="PatientRecordsScreen" component={PatientRecordsScreen} />
      <Stack.Screen name="PatientDetailsScreen" component={PatientDetailsShowDoctor} />
      <Stack.Screen name="AppointmentsQueueScreen" component={AppointmentsQueueScreen} />
      <Stack.Screen name="PatientQueueScreen" component={PatientDetailsShowDoctor} />
      <Stack.Screen name="DoctorRegister" component={DoctorRegister} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
    </Stack.Navigator>
  );
}