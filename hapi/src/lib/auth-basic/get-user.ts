export type UserModel = {
  usr: string
  pwd: string // MD5 hashed
  name: string
}

export const getUser = (u: string): Promise<UserModel | undefined> => Promise.resolve(
  dbUsers
    .map(({usr, pwd, name}) => ({usr, pwd, name}))
    .find(el => el.usr === u),
)


// fake users "database"
// exported, for reusing the fake values on tests
// pwd <= MD5(unsafePwd)
export const dbUsers = Object.freeze([
  {usr: 'ada', pwd: 'Reo3qLA07OTQhjnRjZE60A==', name: 'Ada', unsafePwd: 'airplane'},
  {usr: 'bia', pwd: '3Y/EXYf5HG+an0Oj81WpSg==', name: 'Bia', unsafePwd: 'boat'},
  {usr: 'cid', pwd: '5tllAlltfniHt2ZGxfYV2Q==', name: 'Cid', unsafePwd: 'car'},
])
