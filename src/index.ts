type TimeoutClearer = () => void
type InputFunction = () => void

const time = (callback: InputFunction, delay: number) => {
	let nextTick = new Date().getTime()
	let canContinue = true

	const loop = () => {
		if (!canContinue) return
		nextTick += delay
		callback()
		setTimeout(loop, nextTick - new Date().getTime())
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
				date.getHours() * 60 * 60 * 1000)

		const timeout = setTimeout(() => {
			clear = time(callback, interval)
		}, startDelay)
		let clear = () => clearTimeout(timeout)
		return () => clear()
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

export default AfterEvery