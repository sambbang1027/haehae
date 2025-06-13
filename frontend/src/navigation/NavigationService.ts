// navigationUtils.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from './AppNavigator';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate<T extends keyof AppStackParamList>(
  screen: T,
  params: AppStackParamList[T]
): void;

export function navigate<T extends keyof AppStackParamList>(
  screen: T
): void;

export function navigate<T extends keyof AppStackParamList>(
  screen: T,
  params?: AppStackParamList[T]
): void {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as any)(screen, params);
  }
}
