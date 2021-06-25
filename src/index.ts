const time = (callback: () => void, delay: number) => {
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

const seconds = (triggerEvery: number) => (callback: () => void) => {
	const interval = 1000 * triggerEvery

	const date = new Date()
	const startDelay = interval - date.getMilliseconds()

	const timeout = setTimeout(() => {
		clear = time(callback, interval)
	}, startDelay)
	let clear = () => clearTimeout(timeout)
	return () => clear()
}

const minutes = (triggerEvery: number) => (callback: () => void) => {
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

const hours = (triggerEvery: number) => (callback: () => void) => {
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

const days = (triggerEvery: number) => (callback: () => void) => {
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

const AfterEvery = (tiggerEvery: number) => ({
	seconds: seconds(tiggerEvery),
	minutes: minutes(tiggerEvery),
	hours: hours(tiggerEvery),
	days: days(tiggerEvery)
})

export default AfterEvery

const timer = AfterEvery(1).seconds(() => console.log("A second passed!"))
setTimeout(() => {
	timer()
}, 3000)