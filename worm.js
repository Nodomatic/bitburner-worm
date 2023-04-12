/** @param {NS} ns */
export async function main(ns) {
	let scanned = ns.scan()
	let hacked = ["home"]
	let nnr = ["home", "tor", "n00dles"]
	var i = 0
	while(i < scanned.length){
		let server = scanned[i]
		if(hacked.includes(server)){
			ns.tprint('Already hacked : '+server)
		}else if(ns.getServerMaxRam(server) <= 5){
			if(!nnr.includes(server)){
				ns.tprint('Not enough ram : '+server)
				addscanned(server)
				nnr.push(server)
			}
		}else if(ns.hasRootAccess(server)){
			if(ns.fileExists("proofhack.txt", server)){
				addscanned(server)
				hacked.push(server)
			}else{
				ns.scp("hacking.js", server, "home")
				ns.scp("grow.js", server, "home")
				ns.scp("ram.js", server, "home")
				hackserver(server)
			}
		}else if(ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()){
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
		}else{
			ns.tprint('CANNOT HACK '+server)
		}
		await ns.sleep(100)
		i++
	}
	ns.tprint(`\n\n\n------------------------------------------------\n\n`)
	hacked.forEach(hackedserv => {
		ns.tprint("Hacked : "+hackedserv)
	})

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
}