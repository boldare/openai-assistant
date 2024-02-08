# AI Assistant

Install the dependencies:

```bash
$ npm install
```

Project takes advantage of the `envfile` dependency to manage secrets. Assuming so, you need to copy `.env.dist` to `.env` file in the root directory of the project and fill it with the relevant secrets.

```bash
$ cp .env.dist .env
```

---

```bash
# Start the app (api and spa)
$ npm run start:dev

# Start the api
$ npm run start:api

# Start the spa
$ npm run start:spa
```

Open your browser and navigate to:

- http://localhost:4200/ - spa
- http://localhost:3000/api/ - api

Happy coding!

## Ready to deploy?

Just merge your code to the `main` branch.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
