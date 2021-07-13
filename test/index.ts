import b2b from './b2b'
const load = async () => {
  // const res = await b2b.Role.getRoles({payload: null});
  const res = await b2b.role.setLimit(20).setPage(1).getAllRoles()
  const res1 = await b2b.role.setLimit(10).setPage(1).getRoles()
  // console.log(res);
  // console.log(res1);

  
};

load();
