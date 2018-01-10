# Masterclass Challenge

## Running the App
You need to have `Node 8.9.3` installed. Get it here. If you don't have [nvm](https://github.com/creationix/nvm), consider using that so you can switch versions of node easily.

In your terminal, run `nvm use` to switch to the correct Node version.

Ensure you have [`Yarn`](https://yarnpkg.com/en/) installed. You can also use `npm` but just note this app was developed using `Yarn`.

To install the app, run:
```
yarn install
```

That should install the files locally.

To run the app, run:
```
yarn start
```

A browser should open with the app displaying.

## Running Tests
`cd src/client` so that you're in the client application. 

### Unit Tests
Run `yarn test`

### ESLint
Run `yarn eslint`

### StyleLint
Run `yarn stylelint`

### Verify Everything
Run `yarn verify` to run all linting and tests.

## Development Notes
I have a dev journal of sorts in a [GitHub issue](https://github.com/skawaguchi/full-stack-masterclass-challenge/issues/3).

## Testing Scenarios

### Invalid Postal Codes
- If you input `m9x` as the postal code, you should be able to trigger the "stores not found" message.

### Non-Canadian Geo Location
- If you're in the US and you hit the app, it allows the call to go through right now. I noticed this when I was on VPN for a client. I left it because it still works fine, it's just an oversight where I don't validate against being a valid postal code before allowing the call to go through.

