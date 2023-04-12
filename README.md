# bitburner-worm

TODO : 
  - [x] Add a port checker
  - [ ] Add a loop (check if you have a new port bruteforce / check for new level)
  
This script let you hack every server possible that you can hack. How does it works? It's pretty simple :
  - The script scan each servers and check its ram and its hacking level
  - If you can't hack it, the script will still scan for other servers but will not hack the server because of the too high level
  - If you can hack it, the script will put multiple scripts on the server to automaticly grow / weaken and hack the server. There is also a script that gives both hacking and growing script maximum amount of threads
  - The script will also paste a file "proofhack.txt" to know that the script already passed there, and there is no need to check it again.
  - When the script is all done, it will stop.


Easy loop to make (`wormloop.js`):
```js
/** @param {NS} ns */
export async function main(ns) {
	const timetowait = 60 // CHANGE THE TIME IN SECONDS, put around 60, you don't need to check too often
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
```
  
Common errors :
  - The script uses `ns.spawn`, which means that it will take FEW SECONDS before the hacking and the grow/weak script launches.
  - ~~The script does not check the ports of the server it hacks. If you have to hack ports but you don't have enoughs port breaking script, the script will crash.~~
  - **YOU NEED TO HAVE ALL THE SCRIPTS IN THE GITHUB IN YOUR HOME !!!** (except for wormloop which is unecessary)
  - This script was coded in an hour, bugs may happen. If so, please report them in issues :)