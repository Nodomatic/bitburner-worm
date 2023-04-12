/** @param {NS} ns */
export async function main(ns) {
	ns.spawn("grow.js", ns.args[0])
}