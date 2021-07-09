import b2b from './b2b'
const load = async () => {
  // const res = await b2b.Role.getRoles({payload: null});
  const res = await b2b.Role.Limit(20).Page(1).getAllRoles()
  const res1 = await b2b.Role.Limit(10).Page(1).getRoles()
  console.log(res);
  console.log(res1);
};

load();
