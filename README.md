Hello! ☺️

This is a MERN + Redux project. It was developed using as reference the [MERN Stack Front To Back: Full Stack React, Redux & Node.js course](https://www.udemy.com/share/101WIoBEYYdFlXQXo=/), by [Brad Traversy](https://twitter.com/traversymedia).

It is a social network with the goal of connecting developers across the world by enabling them to:

- create their own profile
- visit other developer profiles
- add posts
- comment and like other developer posts

Some endpoints are private. That means that an authentication is required. JWT was used to accomplish this.

## To run the project

- run `npm i` in the following 3 directories:

  - /
  - /client
  - /server

- add a `default.json` file in `server/config` with the following content:

```json
{
  "mongoURI": "<mongoURI>",
  "jwtSecret": "<someJWTsecret>"
}
```

- run `npm run dev` in the root directory

Have fun! 👍
