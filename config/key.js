if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
/*module.exports = {
  mongoURI: "mongodb://brad:brad@ds231725.mlab.com:31725/devconnector",
  secretOrKey: "secret"
};*/
