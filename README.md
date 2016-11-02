# DROPBOX AUTHENTICATION SYSTEM

Authentication System implemented in JavaScript inspired by [How Dropbox Securely Stores Your Passwords](https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/).


## 1º Step Cloning Repository
```
$ git clone https://github.com/dannluciano/dasjs && cd dasjs

```

## 2º Step Get Dependencies

### OS Dependencies

-  nodejs (7.0.0)
-  yarn
-  testcafe
-  postgres (9.6)


### Mac OS

```
$ brew install nodejs postgresql yarn
```
and

```
$ npm install -g testcafe
```

and

```
$ yarn install
```

## 3º Step Setup the Database

```
$ yarn setup
```

## 4º Step Run the Tests

```
$ yarn test
```

## 5º Step Run the Application

```
$ yarn build && yarn start
```
