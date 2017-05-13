import Koa from 'koa'
import Cors from 'kcors'
import Json from 'koa-json'
import Logger from 'koa-logger'
import BodyParser from 'koa-bodyparser'

const koa = new Koa()
koa.use(Logger())
koa.use(Cors())
koa.use(BodyParser())
koa.use(Json({ pretty: false, param: 'pretty', spaces: 2 }))

import api from './api'

koa.use(api.middleware())
console.log('Listening on port 3000')
koa.listen(3000);
