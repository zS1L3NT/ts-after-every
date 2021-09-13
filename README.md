# after-every
This package allows you to run a function after a time interval of seconds, minutes, hours or days. The function is created to run after the time in millisecond becomes 0. For example, the `seconds` will run after the time in milliseconds becomes 0. The `minute` function will run after the time in seconds becomes 0, and so on.

This is useful for projects that need to run a function as the second or minute changes.

## Installation & Importing
> npm install after-every

or

> yarn add after-every

then import the module like either of the two ways below depending on your project
```ts
// Import statements
import AfterEvery from "after-every"

// Require statements
const AfterEvery = require("after-every").default
```

## Usage
To create a timer that runs every 5 minutes, all I have to do is this
```ts
AfterEvery(5).minutes(date => {
	console.log("I run every 5 minutes")
}) 
```

It works the same way for all other time durations
```ts
AfterEvery(1).seconds(date => {})
AfterEvery(5).minutes(date => {})
AfterEvery(10).hours(date => {})
AfterEvery(7).days(date => {})
```

To clear the timeout, just call the function again
```ts
const timer = AfterEvery(1).seconds(date => console.log(`A second passed!, now it's ${date.getSeconds()} seconds`))
setTimeout(() => {
	timer()
}, 3000)

// > Output
// A second passed! now it's 1 seconds
// A second passed! now it's 2 seconds
// A second passed! now it's 3 seconds
```

### Fixing `AfterEvery().days()` with `set_timezone()`
`AfterEvery().days()` runs every time UTC hours strikes 0.
Since the timezone your run your code in might be different from that of UTC,
there is a function for your to set your custom timezone so that `AfterEvery().days()`
runs when your timezone days starts
```ts
import { set_timezone } from "after-every"

set_timezone(8)  // For UTC+08:00
set_timezone(-3) // For UTC-03:00
```