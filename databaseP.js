import lowdb from 'lowdb'
import fileAsyncStorage from 'lowdb/lib/storages/file-async'

const postsDB = lowdb('postsDB.json', {
  storage: fileAsyncStorage,
  format: { serialize: o => JSON.stringify(o, null, 2) }
})

export default postsDB
