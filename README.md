# JS Assignment :rocket:

![Applicaster_Logo](/assets/applicaster_logo.png =150x)

This Repo is an example of what we expect for the javascript assignment.
It was **not** bootstrapped with the `create-react-app` script to show that the author knows his way around the main javascript tooling, and we'd like to see more of that.
There are no service workers, but would you have created one on this project if it wasn't given to you by the create-react-app script ?

## Requirements

- node ^8.12.0
- npm ^6.5.0
- yarn ^1.13.0

## Set up

1. clone this repo
2. install dependencies by running `yarn`
3. Define your `UNSPLASH_ACCESS_KEY` and `UNSPLASH_SECRET_KEY` as environment variables
4. install flow definitions by running `flow-typed install`
5. That's it :tada: go to

## How to run it

for dev mode, run `yarn dev` to start the dev server. it has reloading with nodemon for the back end, and hot-reloading for the client side :dancer:

If you want to host it or run production environment, run `yarn build:web` to build the project, then `yarn start` to start it.

# other scripts

- tests: `yarn test (--coverage)`
- lint: `yarn lint`
