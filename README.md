## Tips

When adding/installing new dependencies, clean the build and re-build

```bash
cd android && ./gradlew clean && cd .. && npm run android
```

## Step 0: Install Dependencies

```bash
# using npm
npm install
```

```bash
# using Yarn
yarn
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

First method:

In the metro terminal, just press "a", or try the instructions below:

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

