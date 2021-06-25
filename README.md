# after-every
This package allows you to run a function after a time interval of seconds, minutes, hours or days. The function is created to run after the time in millisecond becomes 0. For example, the `seconds` will run after the time in milliseconds becomes 0. The `minute` function will run after the time in seconds becomes 0, and so on.

This is useful for projects that need to run a function as the second or minute changes.

## Installation & Importing
> npm install after-every

or

> yarn add after-every

then import the module like either of the two ways below depending on your project
```js
// Import statements
import AfterEvery from "after-every"

// Require statements
const AfterEvery = require("after-every")
```

## Usage
To create a timer that runs every 5 minutes, all I have to do is this
```js
AfterEvery(5).minutes(() => {
	console.log("I run every 5 minutes")
}) 
```

It works the same way for all other time durations
```js
AfterEvery(1).seconds(() => {})
AfterEvery(5).minutes(() => {})
AfterEvery(10).hours(() => {})
AfterEvery(7).days(() => {})
```

To clear the timeout, just call the function again
```js
const timer = AfterEvery(1).seconds(() => console.log("A second passed!"))
setTimeout(() => {
	timer()
}, 3000)

// > Output
// A second passed!
// A second passed!
// A second passed!
```