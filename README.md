# Talk: Github Actions + DangerJS

This is the source code for a talk I gave in November 2019 for PEI Devs.

## Step 1: Create a new Repository

```bash
npx tsdx create talk-gh-danger
cd talk-gh-danger
git init
git add .
git commit -am "init"
```

This new Typescript repo has 4 commands:

- `start`
- `build`
- `test`
- `lint`

## Step 2: Add a workflow

**.github/workflows/main.yaml**

```yaml
name: Build, Test, Lint

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - name: Install
        run: yarn install

      - name: Build
        run: yarn build

      - name: Test
        run: yarn test

      - name: Lint
        run: yarn lint
```

Commit this file and push it to Github and then open the `Actions` tab. Shortly after an action will show up.
