<img src="./prints/screenshot_2.png" width="250" align="right"/> 

# TinDev

TinDev is a Tinder clone made by developers to developers. It's a way to find others developers to exchange knowledge and help each other.

[![GitHub issues](https://img.shields.io/github/issues/JKFher/TinDev?style=flat-square)](https://github.com/JKFher/TinDev/issues)
[![GitHub forks](https://img.shields.io/github/forks/JKFher/TinDev?style=flat-square)](https://github.com/JKFher/TinDev/network)
[![GitHub stars](https://img.shields.io/github/stars/JKFher/TinDev?style=flat-square)](https://github.com/JKFher/TinDev/stargazers)
[![GitHub license](https://img.shields.io/github/license/JKFher/TinDev?style=flat-square)](https://github.com/JKFher/TinDev/blob/master/LICENSE)

## Images

<img src="./prints/screenshot.png" width="900" align="center"/> 

## Installation

To use this repo you will need `nodejs@10.*` installed in yout machine.

First of all, clone the repository. 

```bash
git clone https://github.com/JKFher/TinDev.git
```

### Backend

1. Enter into the backend folder. `cd backend`.
2. Install all the dependencies. `yarn` or `npm i`.
3. Change the Mongoose connection URL into the `routes.js` file.
  ```javascript
  mongoose.connect(URL_CONNECTION, 
    {
      useNewUrlParser: true
    }
  );
  ```
4. Start the application. `yarn dev` or `npm run dev`.
5. Have fun!

### Frontend

1. Enter into the frontend folder. `cd frontend`.
2. Install all the dependencies. `yarn` or `npm i`.
3. Start the application. `yarn start` or `npm run start`.
4. Have fun!

### Mobile

1. Enter into the frontend folder. `cd frontend`.
2. Install all the dependencies. `yarn` or `npm i`.
3. Make sure that you have everything to run [React Native](https://facebook.github.io/react-native/docs/0.60/getting-started) Applications. 
4. Start the application. `react-native run-android`.
5. LINUX/OSX - Start the node server. `react-native start`
6. Have fun!


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
