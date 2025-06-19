export type CommonState = {
  nickname: string;
  phoneNumber: string;
  birth: Date;
  address: string;
  bcode: string;
  residenceType: string;
};

export type Action =
  | { type: 'SET_FIELD'; field: keyof CommonState; value: any }
  | { type: 'RESET' };

export const initialCommonState: CommonState = {
  nickname: '',
  phoneNumber: '',
  birth: new Date(),
  address: '',
  bcode: '',
  residenceType: '',
};

export function commonReducer(state: CommonState, action: Action): CommonState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialCommonState;
    default:
      return state;
  }
}