var constraints = {
    username: {
      presence: true,
      exclusion: {
        within: ["admin"],
        message: "'%{value}' is not allowed"
      }
    },
    password: {
      presence: true
    }
  };

  module.exports = {constraints};