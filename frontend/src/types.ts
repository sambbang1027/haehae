// 타입 정의 파일.
export type RootStackParamList = {
  SettingPage:  {screen: string; params: object} ; 
  TestMenu: undefined;
  RecycleCalendar: undefined;
  BulkWasteApply: undefined;
  WasteApplyWebViewScreen: undefined;
  WasteRestrictionGuide : undefined;
  CollectionBoxLocation : undefined;
  PloggingPlace : undefined;
  // 해당 스크린이 타입을 받는다면 WasteRestrictionGuide: { guideType: string }; 이런식으로 정의
};