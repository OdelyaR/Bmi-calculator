const app = require("./app");

const { connectDatabase } = require("./Config/database");

connectDatabase();
// if (process.env.NODE_ENV !== "production") {
//   app.listen(4000, () => {
//     console.log(`server is running on port ${4000}`);
//   });
// }
