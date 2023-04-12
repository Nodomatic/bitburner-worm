/** @param {NS} ns */
export async function main(ns) {
	let urls = ["https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/grow.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/hacking.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/launcher.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/proofhack.txt", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/ram.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/rungrow.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/runhack.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/worm.js", "https://raw.githubusercontent.com/Nodomatic/bitburner-worm/master/wormloop.js"]
	let names = ["grow.js", "hacking.js", "launcher.js", "proofhack.txt", "ram.js", "rungrow.js", "runhack.js", "worm.js", "wormloop.js"]

    for(let i = 0; i < urls.length; i++){
        ns.wget(urls[i], `${names[i]}`, "home")
    }
    ns.tprint('Done')
}