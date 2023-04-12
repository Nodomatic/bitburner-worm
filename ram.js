/** @param {NS} ns */
export async function main(ns) {
	var maxram = ns.getServerMaxRam(ns.getHostname());
	const hcost = 1.75
	const gcost = 2.35
	var hthread = (maxram/2)/hcost
	hthread = Math.ceil(hthread)
	maxram = maxram - (hcost * hthread)
	var gthread = maxram/gcost
	gthread = Math.ceil(gthread) - 1 
	ns.tprint("Hacking thread : "+hthread+`\nGrow thread : `+gthread)
}