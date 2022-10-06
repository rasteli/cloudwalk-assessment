# CloudWalk Assessment

This project was created for a position at [CloudWalk, Inc](https://www.cloudwalk.io/).

## Techs

This project was built using [TypeScript](https://www.typescriptlang.org/) and [Node.js](https://nodejs.org/en/) as a runtime. It also uses [vitest](https://vitest.dev/) as a test framework.

## Running the project

Clone this repository:

```
git clone https://github.com/rasteli/cloudwalk-assessment.git
```

> [or download the zip file](https://github.com/rasteli/cloudwalk-assessment/archive/refs/heads/master.zip)

Go to the project root folder and download its dependencies:

**Yarn**

```
yarn
```

**NPM**

```
npm install
```

Once that is done, start the project:

**Yarn**

```
yarn dev
```

**NPM**

```
npm run dev
```

When either of the above commands is run, an object containing all game instances will be printed to the console.
A file called [games.json](https://github.com/rasteli/cloudwalk-assessment/blob/master/games.json) at the project root folder will also be overwritten (if it exists, or else it will be created) with a [JSON.stringified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) version of this object.

## Testing

To start testing with vitest, simply run:

**Yarn**

```
yarn test
```

**NPM**

```
npm run test
```
