type TimeoutClearer = () => void
type InputFunction = (date: Date) => void

let timezone = 0

const time = (callback: InputFunction, delay: number) => {
	let nextTick = Date.now()
	let canContinue = true

	const loop = () => {
		if (!canContinue) return
		const date = Date.now()
		nextTick += delay
		callback(new Date(date))
		setTimeout(loop, nextTick - date)
	}

	loop()
	return () => {
		canContinue = false
	}
}

const seconds = (triggerEvery: number) => {
	/**
	 * Timeout that gets called every few specified seconds
	 * @param callback Function to run every period of time
	 * @returns Function the clears this current interval
	 */
	const func = (callback: InputFunction): TimeoutClearer => {
		const interval = 1000 * triggerEvery

		const date = new Date()
		const startDelay = interval - date.getMilliseconds()

		const timeout = setTimeout(() => {
			clear = time(callback, interval)
		}, startDelay)
		let clear = () => clearTimeout(timeout)
		return () => clear()
	}
	return func
}

const minutes = (triggerEvery: number) => {
	/**
	 * Timeout that gets called every few specified minutes
	 * @param callback Function to run every period of time
	 * @returns Function the clears this current interval
	 */
	const func = (callback: InputFunction): TimeoutClearer => {
		const interval = 60 * 1000 * triggerEvery

		const date = new Date()
		const startDelay =
			interval - (date.getMilliseconds() + date.getSeconds() * 1000)

		const timeout = setTimeout(() => {
			clear = time(callback, interval)
		}, startDelay)
		let clear = () => clearTimeout(timeout)
		return () => clear()
	}
	return func
}

const hours = (triggerEvery: number) => {
	/**
	 * Timeout that gets called every few specified hours
	 * @param callback Function to run every period of time
	 * @returns Function the clears this current interval
	 */
	const func = (callback: InputFunction): TimeoutClearer => {
		const interval = 60 * 60 * 1000 * triggerEvery

		const date = new Date()
		const startDelay =
			interval -
			(date.getMilliseconds() +
				date.getSeconds() * 1000 +
				date.getMinutes() * 60 * 1000)

		const timeout = setTimeout(() => {
			clear = time(callback, interval)
		}, startDelay)
		let clear = () => clearTimeout(timeout)
		return () => clear()
	}
	return func
}

const days = (triggerEvery: number) => {
	/**
	 * Timeout that gets called every few specified days
	 * @param callback Function to run every period of time
	 * @returns Function the clears this current interval
	 */
	const func = (callback: InputFunction): TimeoutClearer => {
		const interval = 24 * 60 * 60 * 1000 * triggerEvery

		const date = new Date()
		const startDelay =
			interval -
			(date.getMilliseconds() +
				date.getSeconds() * 1000 +
				date.getMinutes() * 60 * 1000 +
				addUTC(date.getHours()) * 60 * 60 * 1000)

		const timeout = setTimeout(() => {
			clear = time(callback, interval)
		}, startDelay)
		let clear = () => clearTimeout(timeout)
		return () => clear()
	}
	const addUTC = (hours: number) => {
		hours += timezone
		if (hours > 23) hours -= 24
		if (hours < 0) hours += 24
		return hours
	}
	return func
}

/**
 * Function that gives access to all timers
 * @param tiggerEvery Trigger the function every few intervals
 * @returns The possible functions you can call for the intervals
 */
const AfterEvery = (tiggerEvery: number) => ({
	seconds: seconds(tiggerEvery),
	minutes: minutes(tiggerEvery),
	hours: hours(tiggerEvery),
	days: days(tiggerEvery)
})

/**
 * Change the timezone by placing the UTC value of your timezone.
 * This function is to help the day function know what time the day starts
 * for your specific timezone. If not set, defaults to UTC 0
 *
 * @param hours UTC value from -12 to 14
 * @throws Error if UTC is outside range of -12 and 14
 */
const set_timezone = (hours: number) => {
	if (hours >= -12 && hours <= 14) {
		timezone = hours
	} else {
		throw new Error("UTC must be between -12 and 14")
	}
}

export default AfterEvery
export {
	set_timezone
}
