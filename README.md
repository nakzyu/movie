# Movie

영화 정보를 확인할 수 있는 서비스
YTS YIFY API(https://yts.mx/api) 사용

## 실행 방법

```
npm install
npm start
```

## 소스폴더 구조

    .
    ├── src
    │   ├── components
    │       ├── Header              # 모든 페이지 위에 표시되는 헤더
    │       ├── HomeContent         # Home 페이지에 표시되는 내용
    │       ├── MovieList           # 영화정보를 fetch하고, sorting 및 filter 관리
    │       ├── MovieCard           # MovieList에서 받아온 개별 영화정보를 렌더
    │       ├── MovieDetails        # 자세한 Movie 정보를 렌더
    │   ├── pages
    │       ├── Home                # /
    │       ├── Movies              # /movies
    │       ├── Movie               # /movie/:id
    ├── App                         # 라우팅 처리
    └── README.md

## 기능

- ㅇㄴㅁㅇㄴㅁ

- ㅇㅁㄴㅇㄴ

## 사용한 외부 패키지

- "axios": "^0.19.2"
- "react-router-dom": "^5.2.0"
- "react-bottom-scroll-listener": "^4.0.0"
  스크롤이 페이지의 바닥에 도달했는지 확인하기 위해 사용
