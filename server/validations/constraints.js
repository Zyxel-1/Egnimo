var constraints = {
    username: {
      presence: true,
      length: {minimum: 3},
      exclusion: {
        within: ["admin"],
        message: "'%{value}' is not allowed"
      }
    },
    password: {
      presence: true,
      length: {minimum: 8}
    }
  };

  module.exports = {constraints};