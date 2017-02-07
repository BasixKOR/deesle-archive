# deesle
**현재 개발중입니다.**
 
## 개요
현재 deesle는 Hapi와 MongoDB를 사용하는 위키 엔진으로, 새로운 파서(개발중)과 새로운 구조 등등을 차용하고 있는 위키 엔진입니다.

## 사용법
먼저 setting.json를 생성하고 필요한 정보를 담아주세요.

```json
{
    "mongoUrl": "MongoDB 주소 (mongodb://주소:포트/데이터베이스)",
    "needSetup": true
}
```

그 다음 커맨드를 아래와 같이 입력합니다.

```bash
yarn && yarn start
```

혹시 yarn을 사용하지 않는 경우는 `npm i && npm start`를 치시면 됩니다.
참고로, PORT 환경 변수를 통하여 포트를 지정할 수 있습니다. 기본값은 3000입니다.
이제 [로컬호스트](http://localhost:3000)로 들어가신 다음 설치를 완료하신 후 서버를 재시작하세요.

이렇게 하면 설치가 끝나고, 위키를 사용할 수 있게 됩니다.