# 독거노인을 위한 감성대화 및 알림 서비스
> 독거노인들을 위한 알림 서비스입니다. 맞춤형 알림추가와 사용자 알림추가 기능을 제공합니다. 영상에 나올 가족을 선택한 후에 영상의 대화내용을 text로 설정하면, 지정한 시간에 선택한 가족이 설정한 대화내용을 알려줍니다.(Deepbrain AI의 API를 제공받아 진행하였습니다.)


### :hourglass_flowing_sand: Get Started
> if you want to make Local Environment, you have to make `.env.development.local`. complete! play code!

```
// client
$ cd client
$ yarn install
$ yarn dev

//server
$ cd server
$ npm install
$ npm server.js
```

### SKILL
> MERN STACK

![MERN STACK](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)
- Nextjs(ReactJS) / ExpressJS / MongoDB

### MongoDB Schema
##### user document
```javascript
const alarmSchema = mongoose.Schema({
    content: {type: String, required: true},
    alerthour: {type: String, required: true},
    alertmin : {type: String, required: true},
    period: String,
    mp4Url: String
})
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    age: String,
    feature: [],
    phone: String,
    alarm: [alarmSchema]
}, {timestamps: true});
```

### 역할

| 이름     | 역할   |
| -------- | ------ |
| 이예림   | FULL STACK  |
| 강창현 | FULL STACK  |
