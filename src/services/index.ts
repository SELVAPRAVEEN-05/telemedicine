import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as Keychain from 'react-native-keychain';

export const loadToken = async () => {
  try {
    const creds = await Keychain.getGenericPassword();
    if (creds) {
      console.log('Loaded token:', creds.password);
      return creds.password;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Failed to load token:', err);
    return null;
  }
};
