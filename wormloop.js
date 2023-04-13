/** @param {NS} ns */
export async function main(ns) {
	const timetowait = 60
	var hackinglvl;
	var hackinglvlb = 0
	ns.tprint('TO KILL THE LOOP : kill '+ns.pid)
	while(true){
		hackinglvl = ns.getHackingLevel()
		if(hackinglvlb < hackinglvl){
			hackinglvlb = hackinglvl
			ns.run("worm.js")
		}
		await ns.sleep(timetowait * 1000)
	}
}