export type SocialSignupState = {
  email: string;
  name: string;
};

export type SocialSignupAction =
  | { type: 'SET_FIELD'; field: keyof SocialSignupState; value: any }
  | { type: 'RESET' };

export const initialSocialSignupState: SocialSignupState = {
  email: '',
  name: '',
};

export function SocialSignupReducer(
  state: SocialSignupState,
  action: SocialSignupAction
): SocialSignupState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialSocialSignupState;
    default:
      return state;
  }
}
