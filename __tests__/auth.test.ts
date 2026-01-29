import * as LocalAuthentication from 'expo-local-authentication';
import {authenticateUser, isBiometricAvailable} from '../src/utils/auth';

jest.mock('expo-local-authentication');
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn((_title, _message, buttons) => {
      // Simulate user pressing "Cancel" (first button) for enrollment prompt
      if (buttons && buttons[0]?.onPress) {
        buttons[0].onPress();
      }
    }),
  },
  Platform: {OS: 'android'},
  Linking: {sendIntent: jest.fn()},
}));

const mockLocalAuth = LocalAuthentication as jest.Mocked<
  typeof LocalAuthentication
>;

describe('auth utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isBiometricAvailable', () => {
    it('returns true when hardware and enrollment exist', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(true);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(true);

      const result = await isBiometricAvailable();
      expect(result).toBe(true);
    });

    it('returns false when no hardware', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(false);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(true);

      const result = await isBiometricAvailable();
      expect(result).toBe(false);
    });

    it('returns false when not enrolled', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(true);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(false);

      const result = await isBiometricAvailable();
      expect(result).toBe(false);
    });
  });

  describe('authenticateUser', () => {
    it('returns true on successful auth', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(true);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(true);
      mockLocalAuth.supportedAuthenticationTypesAsync.mockResolvedValue([1]);
      mockLocalAuth.authenticateAsync.mockResolvedValue({success: true});

      const result = await authenticateUser();
      expect(result).toBe(true);
      expect(mockLocalAuth.authenticateAsync).toHaveBeenCalledWith({
        promptMessage: 'Authenticate to proceed',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });
    });

    it('returns false when no hardware', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(false);

      const result = await authenticateUser();
      expect(result).toBe(false);
    });

    it('returns false when not enrolled', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(true);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(false);
      mockLocalAuth.supportedAuthenticationTypesAsync.mockResolvedValue([]);

      const result = await authenticateUser();
      expect(result).toBe(false);
    });

    it('returns false on cancelled auth', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(true);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(true);
      mockLocalAuth.supportedAuthenticationTypesAsync.mockResolvedValue([1]);
      mockLocalAuth.authenticateAsync.mockResolvedValue({
        success: false,
        error: 'user_cancel',
      });

      const result = await authenticateUser();
      expect(result).toBe(false);
    });

    it('returns false on error', async () => {
      mockLocalAuth.hasHardwareAsync.mockResolvedValue(true);
      mockLocalAuth.isEnrolledAsync.mockResolvedValue(true);
      mockLocalAuth.supportedAuthenticationTypesAsync.mockResolvedValue([1]);
      mockLocalAuth.authenticateAsync.mockRejectedValue(new Error('test'));

      const result = await authenticateUser();
      expect(result).toBe(false);
    });
  });
});
