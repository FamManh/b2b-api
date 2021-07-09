import { gateway as B2BSdk } from "../src";

const b2b = B2BSdk({
  host: "b2b.digicommerce.xyz:8444",
  protocol: "https",
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NzI3Y2I4Yy03NzhlLTRiMWQtYjY4ZC03ZDg3NTRhMjE4YjUiLCJjdXN0b21lclRva2VuIjoiZXlKaGJHY2lPaUFpU0ZNeU5UWWlMQ0FpZEhsd0lqb2dJa3BYVkNKOS5leUp6ZFdJaU9pSTROekkzWTJJNFl5MDNOemhsTFRSaU1XUXRZalk0WkMwM1pEZzNOVFJoTWpFNFlqVWlMQ0p1WVcxbElqb2lWSFZoYmlCQmJtZ2lMQ0psZUhBaU9qRTJNalF3TWpRNE1qSXNJbWxoZENJNk1UWXlNemt6T0RReU1pd2lhblJwSWpvaU1ERXdNelU0TVRNdE5tRmpaUzAwWkRreExUZ3hPVFl0T1RsbU1ETTBNR00zTmpreUluMD0uYmYzNTViNzhkNGY5NTE2MjViOGY2ZTU0ZTIzNTVhNTdhMDI4Yjg5NDNhOGY4YjA4ZGQxNzkyNmJhMGQyZjZhYSIsImN1c3RvbWVySWQiOiI4NzI3Y2I4Yy03NzhlLTRiMWQtYjY4ZC03ZDg3NTRhMjE4YjUiLCJleHAiOjE2MjQwMjQ4MjIsImlhdCI6MTYyMzkzODQyMn0.IN7aVtBUZgbmmQ4cXgnPru4UNs8Bux5TXNrbhshsHffFhReI5r3r6-F6jCaNrt0KA54L-1leT2-SgojodAHyow",
});

const load = async () => {
  const res = await b2b.Role.getRoles({payload: null});
  b2b.Role.Page()
  console.log(res);
};

load();
