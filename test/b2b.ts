import { gateway as B2BSdk } from "../src";

const b2b = B2BSdk({
  host: "b2b.digicommerce.xyz:8444/ep",
  protocol: "https",
  nodeEnv: "development",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI1NjM3Mjc0LCJleHAiOjE2MjgyMjkyNzR9.eV81WtApI3XR2HDjjh3DRfBTYV5YKGWwH1xCHsEWsrA",
});

export default b2b
