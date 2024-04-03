# HomePredictor
![image](https://github.com/KingGyeongHoo/homepredictor/assets/117385050/ee01d7bb-9988-4e55-87e9-a542d5010d9e)


## 📃프로젝트 소개

HomePredictor는 혼란한 부동산 시장 속, 3개월 후의 집값을 예측해 현명한 소비 및 투자를 도와주는 AI 부동산 예측 서비스입니다.

### 📆개발 기간
**2024.03~**

### 🤼‍♂️팀원
 - FE: 송경후, 전서연
 - BE: 장성수, 황규철, 정혜민
 - AI: 이명진, 엄효범

## ✏목차
1. **기술 스택**
2. **주요 기능**
3. **링크**
4. **폴더 구조**

## 🛠기술 스택
- **Frontend**: <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"><img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/Styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
- **Backend**: <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
- **AI**: <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"><img src="https://img.shields.io/badge/jupyternotebook-F37626?style=for-the-badge&logo=jupyter&logoColor=white"><img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"><img src="https://img.shields.io/badge/keras-D00000?style=for-the-badge&logo=keras&logoColor=white">
- **Deployment**: <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"><img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
- **Other Tools**: <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><img src="https://img.shields.io/badge/photoshop-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white"><img src="https://img.shields.io/badge/slcak-4A154B?style=for-the-badge&logo=slack&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## 💻주요 기능

### 메인 페이지
 - **부동산 검색 및 검색 결과**
   - 타이핑 이벤트 발생시 서버에 건물 데이터를 요청하고, 받아온 데이터를 바탕으로 검색 결과를 나타냈습니다.
   - 검색 단어와 검색 결과가 일치하는 부분은 강조처리 하고, 결과 클릭시 해당 건물의 정보 페이지로 Navigate 합니다.
 - **Keyframe과 애니메이션을 이용한 이미지 시각화**
   - 서비스 소개 컴포넌트가 화면에 보일 시 애니메이션을 이용해 아래에서부터 나타나게 하였습니다.
 - **TOP 버튼 클릭시 화면 맨 위로 이동**
   - JavaScript의 스크롤링 기능을 사용하여 버튼 클릭시 페이지 맨 위(검색창)으로 이동하게 하였습니다.
   - 검색창에서는 보이지 않고, 스크롤시 컴포넌트를 가리지 않게 투명도가 조절됩니다.
###  결과 페이지
 - **지도 어플리케이션**
   - KakaoMap API를 이용하여 지도 어플리케이션을 렌더링 하였습니다.
   - 서버로부터 위/경도 데이터를 받아 건물 위치를 지도 위에 마커로 표시합니다.
   - 우측 슬라이드바 및 버튼을 통해 화면의 줌을 조절합니다.
 - **클릭시 해당 박스가 가리키는 페이지로 이동**
   - 네비게이션 바의 각 항목을 클릭하면 해당 항목이 가리키는 페이지로 자동으로 스크롤되도록 구현했습니다.
   - section 태그를 사용해 이동 위치를 지정하고, querySelector를 이용해 해당 섹션으로 이동하도록 하였습니다.
### 결과 페이지 사이드바
 - **AI 모델을 이용한 부동산 가격 예측**
   - 서버로부터 현재 건물의 부동산 가격을 받아옵니다.
   - Recharts 라이브러리로 예측 가격을 그래프로 시각화하고, slidebar를 이용해 표시 기간을 조절합니다.
 - **교통 정보 및 주변 시설 안내**
   - 근처 버스 정류장과 지하철역, 주변 시설의 이름과 거리를 표기합니다.
 - **관련 뉴스**
   - 네이버 검색 API를 이용해 지역 및 부동산 관련 뉴스를 크롤링 해옵니다.
   - 정확도순/최신순 선택에 따라 뉴스 데이터가 정렬되고, 페이지 이동이 가능합니다.

## 📎링크
### [배포](https://homepredictor.netlify.app/)
### [Figma](https://www.figma.com/file/vgTUmYcOKal4pA5FaBq7CR/HomePredictor?type=design&node-id=0%3A1&mode=design&t=R5B9gbVyLHXXaLZv-1)

## 📁폴더 구조
```
📦src
 ┣ 📂apis
 ┃ ┗ 📜api.ts
 ┣ 📂components
 ┃ ┣ 📂Describes
 ┃ ┃ ┗ 📜Describe.tsx
 ┃ ┣ 📂Header
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂ResultBar
 ┃ ┃ ┣ 📂Facilities
 ┃ ┃ ┃ ┗ 📜Facilities.tsx
 ┃ ┃ ┣ 📂PredictedPrice
 ┃ ┃ ┃ ┣ 📜MaxMinPrice.tsx
 ┃ ┃ ┃ ┣ 📜MaxMinPriceItem.tsx
 ┃ ┃ ┃ ┣ 📜PredictedGraph.tsx
 ┃ ┃ ┃ ┣ 📜PredictedHead.tsx
 ┃ ┃ ┃ ┗ 📜PredictedPrice.tsx
 ┃ ┃ ┣ 📂RelatedNews
 ┃ ┃ ┃ ┗ 📜RelatedNews.tsx
 ┃ ┃ ┣ 📂Traffic
 ┃ ┃ ┃ ┣ 📜Traffic.tsx
 ┃ ┃ ┃ ┣ 📜TrafficItem.tsx
 ┃ ┃ ┃ ┣ 📜TraficBus.tsx
 ┃ ┃ ┃ ┗ 📜TraficSubway.tsx
 ┃ ┃ ┣ 📜ResultBar.tsx
 ┃ ┃ ┣ 📜ResultBarBodyTemplate.tsx
 ┃ ┃ ┣ 📜ResultBarHead.tsx
 ┃ ┃ ┣ 📜ResultBarMenu.tsx
 ┃ ┃ ┗ 📜ResultBarSearch.tsx
 ┃ ┗ 📂ResultMap
 ┃ ┃ ┗ 📜ResultMap.tsx
 ┣ 📂consts
 ┃ ┗ 📜tempData.ts
 ┣ 📂hooks
 ┃ ┗ 📜useSearch.ts
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂Components
 ┃ ┃ ┃ ┣ 📜FirstSection.tsx
 ┃ ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┃ ┣ 📜SecondSection.tsx
 ┃ ┃ ┃ ┣ 📜ThirdSection.tsx
 ┃ ┃ ┃ ┗ 📜TopButton.tsx
 ┃ ┃ ┣ 📂DummyData
 ┃ ┃ ┃ ┗ 📜DummyData.tsx
 ┃ ┃ ┣ 📂State
 ┃ ┃ ┃ ┗ 📜AddressState.ts
 ┃ ┃ ┗ 📜Home.tsx
 ┃ ┗ 📂Result
 ┃ ┃ ┗ 📜Result.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyles.ts
 ┃ ┣ 📜styled.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂utils
 ┃ ┣ 📜calPriceUnit.ts
 ┃ ┗ 📜convertDate.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
  ```
