const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const hpp = require('hpp')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')
const hashtagRouter = require('./routes/hashtag')
const db = require('./models')
const passportConfig = require('./passport')
const app = express();


dotenv.config()

db.sequelize.sync()
    .then(()=>{
        console.log('db연결 성공')
    })
    .catch(console.error)
passportConfig()



if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'))
    app.use(hpp())
    app.use(helmet())
}else{
    app.use(morgan('dev'))
}
app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:3060', 'nodebird.com', 'http://13.209.97.15'],
    credentials:true
}))
app.use('/',express.static(path.join(__dirname,'uploads'))) // 현재 폴더/uploads/ 운영체제의 차이로 이렇게 적음
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}
));
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{
    res.send('hello express')
})



app.use('/post',postRouter)
app.use('/posts',postsRouter)
app.use('/user',userRouter)
app.use('/hashtag', hashtagRouter)

// app.use((err, req, res, next)=>{

// })에러 처리 미들웨어, 에러 처리 방법을 바꿔주고 싶을 때, 쓴다.


app.listen(80,()=>{
    console.log('서버 실행 중!!')
})
