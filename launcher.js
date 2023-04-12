/** @param {NS} ns */
export async function main(ns) {
	ns.scp("runhack.js", ns.getHostname(), "home")
	ns.scp("rungrow.js", ns.getHostname(), "home")
	ns.run("runhack.js", 1, ns.args[0])
	await ns.sleep(10)
	ns.run("rungrow.js", 1, ns.args[1])
}