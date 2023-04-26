/** @param {NS} ns */

//to loop : remove alreadyscanned and check everything except alreadyscanned (hacked, etc...)
const debug = false
export async function main(ns) {
	let scanned = ns.scan()
	let hacked = []
	let nnr = ["home", "tor", "n00dles"]
	let alreadyscanned = []
	var porthackingTotal = checkcrackport()
	var i = 0
	while(i < scanned.length){
		let server = scanned[i]
		if(alreadyscanned.includes(server)){
			if(debug == true) ns.tprint('already scanned '+server)
		}else if(hacked.includes(server) || nnr.includes(server)){
			if(debug == true) ns.tprint('Already hacked / not enough ram : '+server)
			alreadyscanned.push(server)
		}else if(ns.getServerMaxRam(server) <= 5){
			if(!nnr.includes(server)){
				if(debug == true) ns.tprint('Not enough ram : '+server)
				addscanned(server)
				nnr.push(server)
				alreadyscanned.push(server)
			}
		}else if(ns.hasRootAccess(server)){
			if(ns.fileExists("proofhack.txt", server)){
				addscanned(server)
				hacked.push(server)
				alreadyscanned.push(server)
			}else{
				ns.scp("hacking.js", server, "home")
				ns.scp("grow.js", server, "home")
				ns.scp("ram.js", server, "home")
				hackserver(server)
				alreadyscanned.push(server)
			}
		}else if(ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()){
			if(porthackingTotal >= ns.getServerNumPortsRequired(server)){
				if (ns.fileExists("BruteSSH.exe", "home")) {
					ns.brutessh(server);
				}
				if (ns.fileExists("FTPCrack.exe", "home")) {
					ns.ftpcrack(server);
				}
				if (ns.fileExists("relaySMTP.exe", "home")) {
					ns.relaysmtp(server);
				}
				if (ns.fileExists("HTTPWorm.exe", "home")) {
					ns.httpworm(server);
				}
				if (ns.fileExists("SQLInject.exe", "home")) {
					ns.sqlinject(server);
				}
				ns.nuke(server)
				ns.scp("hacking.js", server, "home")
				ns.scp("grow.js", server, "home")
				ns.scp("ram.js", server, "home")
				hackserver(server)
				alreadyscanned.push(server)
			}else{
				addscanned(server)
				alreadyscanned.push(server)
				if(debug == true) ns.tprint('CANNOT HACK '+server)
			}
		}else{
			addscanned(server)
			alreadyscanned.push(server)
			if(debug == true) ns.tprint('CANNOT HACK '+server)
		}
		await ns.sleep(10)
		i++
	}
	if(debug == true) ns.tprint(`\n\n\n------------------------------------------------\n\n`)
	hacked.forEach(hackedserv => {
		if(debug == true) ns.tprint("Hacked : "+hackedserv)
	})
	if (debug == false) ns.tprint("Hacked : "+hacked)

	function hackserver(server){
		// hacking, ram and grow already on the server
		// We only need to launch them through the launcher which grabs threads for both scripts

		// GET THE PROOF OF HACK
		ns.scp("proofhack.txt", server, "home")

		// GET THE RAM
		let maxram = ns.getServerMaxRam(server)
		const hcost = 1.75
		const gcost = 2.35
		var hthread = (maxram/2)/hcost
		hthread = Math.ceil(hthread)
		maxram = maxram - (hcost * hthread)
		var gthread = maxram/gcost
		gthread = Math.ceil(gthread)
		gthread = gthread - 1 

		// INITIATE THE LAUNCHER
		ns.scp("launcher.js", server, "home")
		ns.exec("launcher.js", server, 1, hthread, gthread)

		// ADD THE SCANNED SERVERS TO THE LIST
		let scannedhack = ns.scan(server)
		scannedhack.forEach(c => {
			scanned.push(c)
		})

		// ADD THE SERVER TO THE HACKED LIST
		hacked.push(server)
	}

	function addscanned(server){
		// ADD THE SCANNED SERVERS TO THE LIST
		let scannedhack = ns.scan(server)
		scannedhack.forEach(c => {
			scanned.push(c)
		})
	}

	function checkcrackport(){
		let x = 0
		if (ns.fileExists("BruteSSH.exe", "home")) {
			x++
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			x++
		}
		if (ns.fileExists("relaySMTP.exe", "home")) {
			x++
		}
		if (ns.fileExists("HTTPWorm.exe", "home")) {
			x++
		}
		if (ns.fileExists("SQLInject.exe", "home")) {
			x++
		}
		return x
	}
}