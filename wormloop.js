/** @param {NS} ns */
export async function main(ns) {
	const timetowait = 60
	var hackinglvl;
	var hackinglvlb = 0
	while(true){
		hackinglvl = ns.getHackingLevel()
		if(hackinglvlb < hackinglvl){
			hackinglvlb = hackinglvl
			ns.run("worm.js")
		}else{
			ns.tprint('TO KILL THE LOOP : kill '+ns.pid)
		}
		await ns.sleep(timetowait * 1000)
	}
}