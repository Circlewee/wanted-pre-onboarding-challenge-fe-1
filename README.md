## TODO with React Query

Todo를 CRUD할 수 있지만 거기에 React Query를 곁들인.

### Todo

1. Create
   오른쪽 form을 통해 title, content를 작성 후 제출하면 왼쪽 simple list에서 확인할 수 있습니다.  
   ![add](https://user-images.githubusercontent.com/65718183/183086045-56464562-f49e-425e-aabf-410fe0de6852.gif)
2. Read ('/:todoId')
   왼쪽 simple list를 통해 간단하게 확인할 수 있으며 todo를 클릭하면 해당 todo의 id로 라우팅되고 아래쪽에 상세보기가 추가됩니다.  
   ![read](https://user-images.githubusercontent.com/65718183/183086139-2c0c6170-b5db-4e35-8eac-3124c090e7e1.gif)
3. Update ('/:todoId')
   상세보기 화면에서 제목 오른쪽 아이콘을 클릭하면 수정모드로 들어갈 수 있습니다.  
   ![update](https://user-images.githubusercontent.com/65718183/183086168-3c0dd423-f94a-4579-8313-6b882ea32773.gif)
4. Delete
   투두 오른쪽의 ❌아이콘을 클릭하면 삭제할 수 있습니다.  
   ![delete](https://user-images.githubusercontent.com/65718183/183086200-7ca1e9b4-b8b0-4006-828a-8dd37d005e86.gif)

### User

1. login ('/auth')
   이메일, 비밀번호 조건에 맞지 않으면 로그인 불가능
   로그인 성공시 '/'로 이동  
   ![login](https://user-images.githubusercontent.com/65718183/183086338-bb8b05c2-9535-47b4-b5e7-ddd509a4acb7.gif)

2. register ('/register')
   이메일, 비밀번호 조건에 맞지 않으면 회원가입 불가능
   회원가입 성공시 '/auth'로 이동  
   ![register](https://user-images.githubusercontent.com/65718183/183086613-0bc10d0c-d2bb-4d9e-9c7a-09bb4f75b232.gif)

### 실행 방법

```shell
yarn install

yarn dev
```

### stack

1. react-router-dom
2. react-hook-form
3. react-toastify
4. styled-component
5. axios
6. react-query
7. TS
8. create vite --template react-ts

## 가벼운 소개

이번 기회로 react query를 처음 사용해 봤습니다. 처음엔 공식문서가 잘 읽히지 않아서 구글링을 통해 기초적인 방식을 공부한 후 공식 문서를 통해 API에 대해 공부했습니다.
react-query의 장점을 익힐 수 있었고 왜 현업에서 많이 고려하는 라이브러리인지 대략적으로 알 수 있었던 것습니다.

이번 강의로 새로 배우는 것도 기대하고 리팩토링으로 퀄리티를 올리는 것도 엄청 기대하고 있습니다.

### Refactor

1. 최대한 선언적으로 작성해보기
2. 관심사를 분리해보자
3. 라우팅 정리 (주소는 자원만 동작은 METHOD 로..!)
4. 타입스크립트를 써본 경우
   - strict 옵션 적용
   - 타입 가드 및 타입 추론을 사용해 any, 타입 단언을 모두 없애기
   - 반복되는 타입은 제네릭, 타입 상속 / 합성 등으로 추상화
   - 보다 좁은 타입으로 정의 (ex. string → as const or union)

#### 계획

1. ~~파일명, 변수명 수정~~
2. ts strict 사용
3. API 분리
4. Restful한 라우팅
5. useQuery를 커스텀 훅으로 분리
6. 로그인 회원가입 요청 통합
7. 스켈레톤 로딩 또는 로딩 컴포넌트 수정
8. Toast메시지 출력 시 기존에 출력되고 있는 것이 있다면 없애고 재 출력
