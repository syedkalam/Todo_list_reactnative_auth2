import * as LocalAuthentication from 'expo-local-authentication';
import {Alert, Platform, Linking} from 'react-native';

/**
 * Opens device security settings
 */
const openSecuritySettings = () => {
  if (Platform.OS === 'android') {
    Linking.sendIntent('android.settings.SECURITY_SETTINGS');
  } else {
    Linking.openURL('App-Prefs:root=TOUCHID_PASSCODE');
  }
};

/**
 * Checks if device supports biometric authentication
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
};

/**
 * Prompt biometric / device authentication
 */
export const authenticateUser = async (): Promise<boolean> => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware) {
      Alert.alert('Error', 'No biometric hardware available');
      return false;
    }

    if (!isEnrolled) {
      return new Promise(resolve => {
        Alert.alert(
          'Biometrics Not Enrolled',
          Platform.OS === 'android'
            ? 'Please enroll fingerprint to continue'
            : 'Please enroll Face ID/Touch ID to continue',
          [
            {text: 'Cancel', style: 'cancel', onPress: () => resolve(false)},
            {
              text: 'Open Settings',
              onPress: () => {
                openSecuritySettings();
                resolve(false);
              },
            },
          ],
        );
      });
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to proceed',
      fallbackLabel: 'Use passcode',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    return result.success;
  } catch (error) {
    console.log('[Auth] Error:', error);
    return false;
  }
};
