# @o-rango/update-notify


Inspired in update-notifier but using the default `npm` api that way is working behind `proxy` or any other config reflected in `.npmrc`.

It only has programmatic api and can be easily attached to your workflow.

## Install 

```
npm i --save @o-rango/updatet-notify
```


## Usage

```js
const { updateNotify } = require('@o-rango/update-notify');

const notifier = updateNotify({
      pkg: {
        version: '0.0.1',
        name: 'react'
      },
      updateCheckInterval: 0
    });


console.log(notifier);
// Output =>  
```


## API

### notify = updateNotify(options)

Checks if there is an available update. Accepts options defined below. Returns `{ updateAvailable: true , name: 'react' , latest: '16.11.0', 'current': '0.0.1' }` if there is any update.

### options

Type: `object`

#### pkg

Type: `object`

##### name

*Required*<br>
Type: `string`

##### version

*Required*<br>
Type: `string`

#### updateCheckInterval

Type: `number`<br>
Default: `1000 * 60 * 60 * 24` *(1 day)*

How often to check for updates.

#### distTag

Type: `string`<br>
Default: `latest`

Which [dist-tag](https://docs.npmjs.com/adding-dist-tags-to-packages) to use to find the latest version.


## Extra 

### ping = pingRegistry()

Easter egg method that pings registry defined in your `.npmrc`;


```js
const { pingRegistry } = require('@o-rango/update-notify');


const online = await pingRegistry();
// Output online => :{ isOnline : true }

```
