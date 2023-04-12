/** @param {NS} ns */
export async function main(ns) {
	ns.spawn("hacking.js", ns.args[0])
}