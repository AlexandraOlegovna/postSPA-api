import Router from 'koa-rest-router'
import postsDB from './databaseP'
import usersDB from './databaseU'
import _ from 'lodash'

const api = Router({ prefix: 'api' })

api.resource('users', {

  show: async ctx =>{
    let user = await usersDB.get('users').find({ id: ctx.params.user}).value()
    if (user)
      ctx.body = user
    else{
      await usersDB.get('users').push({ id: ctx.params.user, likes:[]}).write()
      ctx.body = await usersDB.get('users').find({ id: ctx.params.user}).value()
    }
  }
})

api.resource('posts', {
  index: async ctx => {
    ctx.body = await postsDB.get('posts').value()
  }
})

api.resource('likes', {
  create: async ctx => {
    let {id, num, type} = ctx.request.body
    console.log(id, num, type);
    if (!(type != "+" || type != "-")) return ctx.throw(401, 'wrong data type')

    let c =  (type == "+") ? 1 : -1;

    let cur_total = await postsDB.get('posts').find({id: num}).value().total
    await postsDB.get('posts').find({id: num}).assign({ total: cur_total + c}).write()

    let cur_likes = await usersDB.get('users').find({id: id}).value().likes
    if (type == "+")
      cur_likes.push(num)
    else
      cur_likes.splice(num, 1)
    await usersDB.get('users').find({id: id}).assign({ likes: cur_likes}).write()
  }
})

export default api
