// import React from 'react';

// const MainScreen = () => {
//   return (
//     <div className="flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 min-h-screen">
//       {/* 프로필 아이콘 */}
//       <div className="iconamoon-profile mb-4">
//         <img className="group" src="group0.svg" alt="Group Icon" />
//       </div>
      
//       {/* 메뉴 아이콘 */}
//       <img
//         className="material-symbols-menu-rounded mb-4"
//         src="material-symbols-menu-rounded0.svg"
//         alt="Menu Icon"
//       />
      
//       {/* 그룹 아이콘 */}
//       <img className="el-group mb-4" src="el-group0.svg" alt="Group Image" />

//       {/* 직사각형 배경 */}
//       <div className="rectangle-12 mb-4 w-full h-1 bg-gray-300"></div>
      
//       {/* 텍스트들 */}
//       <div className="div2 mb-4 text-lg sm:text-xl">마이</div>
//       <div className="div3 mb-4 text-lg sm:text-xl">카테고리</div>
//       <div className="div4 mb-4 text-lg sm:text-xl">분리수거</div>
      
//       {/* 리사이클 아이콘 */}
//       <img className="arcticons-recyclecoach mb-4" src="arcticons-recyclecoach0.svg" alt="Recycle Icon" />
      
//       <div className="div5 mb-4 text-lg sm:text-xl">커뮤니티</div>
//       <img className="image-7 mb-4" src="image-70.png" alt="Image 7" />
      
//       {/* 직사각형 배경 */}
//       <div className="rectangle-26 mb-4 w-full h-1 bg-gray-300"></div>
      
//       {/* 벡터 아이콘 */}
//       <img className="vector mb-4" src="vector0.svg" alt="Vector Image" />
      
//       <div className="xx mb-4 text-xs sm:text-sm">서울특별시 강남구 xx로</div>
      
//       {/* 또 다른 직사각형 배경 */}
//       <div className="rectangle-38 mb-4 w-full h-1 bg-gray-300"></div>
      
//       <div className="div6 mb-4 text-lg sm:text-xl">도훈님의 포인트</div>
//       <div className="div7 mb-4 text-sm sm:text-md">자세히 보러가기</div>
//       <div className="_1-080-p mb-4 text-xl sm:text-2xl">1,080 P</div>
      
//       {/* 또 다른 직사각형 배경 */}
//       <div className="rectangle-40 mb-4 w-full h-1 bg-gray-300"></div>
      
//       <div className="div8 mb-4 text-lg sm:text-xl">환경 미션</div>
//       <div className="div9 mb-4 text-sm sm:text-md">
//         일일/주간
//         <br />
//         미션하러 가기
//       </div>
      
//       {/* 벡터 아이콘 */}
//       <img className="vector2 mb-4" src="vector1.svg" alt="Vector Image" />
      
//       {/* 추가 이미지들 */}
//       <img className="image-11 mb-4" src="image-110.png" alt="Image 11" />
      
//       <div className="div10 mb-4 text-lg sm:text-xl">요일</div>
//       <div className="div11 mb-4 text-sm sm:text-md">“플라스틱” 입니다.</div>
      
//       {/* 여러 개의 벡터 아이콘들 */}
//       <img className="vector3 mb-4" src="vector2.svg" alt="Vector 3" />
//       <img className="vector4 mb-4" src="vector3.svg" alt="Vector 4" />
//       <img className="vector5 mb-4" src="vector4.svg" alt="Vector 5" />
//       <img className="vector6 mb-4" src="vector5.svg" alt="Vector 6" />
//       <img className="vector7 mb-4" src="vector6.svg" alt="Vector 7" />
//       <img className="vector8 mb-4" src="vector7.svg" alt="Vector 8" />
//       <img className="vector9 mb-4" src="vector8.svg" alt="Vector 9" />
//       <img className="vector10 mb-4" src="vector9.svg" alt="Vector 10" />
//       <img className="vector11 mb-4" src="vector10.svg" alt="Vector 11" />
//       <img className="vector12 mb-4" src="vector11.svg" alt="Vector 12" />
//       <img className="vector13 mb-4" src="vector12.svg" alt="Vector 13" />
//       <img className="vector14 mb-4" src="vector13.svg" alt="Vector 14" />
//       <img className="vector15 mb-4" src="vector14.svg" alt="Vector 15" />
      
//       <img className="image-12 mb-4" src="image-120.png" alt="Image 12" />
      
//       {/* 또 다른 직사각형 배경 */}
//       <div className="rectangle-41 mb-4 w-full h-1 bg-gray-300"></div>
      
//       <div className="div12 mb-4 text-lg sm:text-xl">
//         우리 동네
//         <br />
//         커뮤니티
//       </div>
      
//       <img className="image-13 mb-4" src="image-130.png" alt="Image 13" />
      
//       <div className="div13 mb-4 text-lg sm:text-xl">우리 동네</div>
//       <div className="rectangle-42 mb-4 w-full h-1 bg-gray-300"></div>
      
//       <div className="div14 mb-4 text-lg sm:text-xl">
//         분리수거
//         <br />
//         가이드
//       </div>
      
//       <div className="div15 mb-4 text-sm sm:text-md">사진 촬영/ 분리 배출</div>
//       <div className="rectangle-43 mb-4 w-full h-1 bg-gray-300"></div>
      
//       <div className="div16 mb-4 text-lg sm:text-xl">
//         우리 동네
//         <br />
//         의류, 건전지 등 위치
//       </div>
      
//       <div className="div17 mb-4 text-lg sm:text-xl">
//         수거함
//         <br />
//         위치
//       </div>
      
//       {/* 벡터 아이콘들 */}
//       <img className="vector16 mb-4" src="vector15.svg" alt="Vector 16" />
//       <img className="vector17 mb-4" src="vector16.svg" alt="Vector 17" />
//     </div>
//   );
// };

// export default MainScreen;
