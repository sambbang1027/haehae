export type LocalSignupState = {
  email: string;
  authCode: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type LocalSignupAction =
  | { type: 'SET_FIELD'; field: keyof LocalSignupState; value: any }
  | { type: 'RESET' };

export const initialLocalSignupState: LocalSignupState = {
  email: '',
  authCode: '',
  password: '',
  confirmPassword: '',
  name: '',
};

export function localSignupReducer(
  state: LocalSignupState,
  action: LocalSignupAction
): LocalSignupState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialLocalSignupState;
    default:
      return state;
  }
}
