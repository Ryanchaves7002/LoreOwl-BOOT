# LoreOwl

## MongoDB

The API uses MongoDB Atlas or another MongoDB deployment. Set `MONGODB_URI` and, optionally, `MONGODB_DB` in the environment. Never commit the connection URI.

For local development, create a `.env` file from `.env.example`, fill in the connection values, then run:

```sh
npm install
npm start
```

The site runs at `http://localhost:3000`. The first request to `/api/livros` seeds the catalog in MongoDB. User accounts, sessions, carts, and repository records are stored in MongoDB; cart and session cookies are HTTP-only.

For Vercel, add `MONGODB_URI` and `MONGODB_DB` under the project's Environment Variables for each environment you deploy. Configure the MongoDB network access rules to allow connections from the deployment, and redeploy after setting the variables.

Existing data saved in browsers' `localStorage` is not imported automatically. New account and cart data is written to MongoDB.