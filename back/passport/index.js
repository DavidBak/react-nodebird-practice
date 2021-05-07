const passport = require('passport')
const local = require('./local')
const {User} = require('../models')

module.exports = () => {
    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    passport.deserializeUser(async(id, done)=>{
        try{
            const user = await User.findOne({ where: {id}})
            done(null, user) // 라우터 접근하기 전에 사용자 정보 데이터 베이스에서 복구해서 req.user에 넣어준다
        }
        catch(error){
            console.error(error)
            done(error)
        }
    })

    local();
}