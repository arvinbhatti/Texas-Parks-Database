member = function(userName) {
	this.name = "placeholder";
	this.userName = userName;
	this.imgUrl = "placeholder";
	this.bio = "placeholder";
	this.commits = 0;

	this.inc = function() {
		this.commits++;
	}
}

var simon = new member("simonkliewer");
var amber = new member("amberklepser");
var arvin = new member("arvinbhatti");
var yash = new member("ybora");
var jason = new member("jasonstephen15");
var mahmood = new member("mahmood-alam");
var wyatt = new member("Wyatt72");

class memberList {
	constructor() {
		this.list = [simon, amber, arvin, yash, jason, mahmood, wyatt];
		this.len = 7;
	}

	getMember(userName) {
		for (var i = 0; i < this.len; i++) {
			if(this.list[i].userName == userName)
				return this.list[i];
		}
	}
}	

var team = new memberList();

function handler(data, user) {
	
	if(data.name != null)
	user.name = data.name;
if(data.avatar_url != null)
	user.imgUrl = data.avatar_url;
if(data.bio != null)
	user.bio = data.bio;
	//console.log(user);
}

function getUserInfo(userName, callback) {
	//console.log(team.list);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);	
			//console.log(data);
			callback(data, team.getMember(data.login));
		}
	};
	xmlhttp.open("GET", "https://api.github.com/users/" + team.list[i].userName);
	xmlhttp.send();
}

function getCommits() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = (JSON.parse(xmlhttp.responseText));
			for(var i = 0; i < data.length; i++) {
				var userData = data[i].author;
				if (userData != null) {
					if(userData.login != null) {
						team.getMember(userData.login).inc();
					}
				}
			}
		}
	};
	xmlhttp.open("GET", "https://api.github.com/repos/simonkliewer/ee461l_coral/commits");
	xmlhttp.send();
}

/*
function getIssues(user) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = (JSON.parse(xmlhttp.responseText));
			//console.log(data.length);
		}
	};
	xmlhttp.open("GET", "https://api.github.com/users/Wyatt72/issues");
	xmlhttp.send();
}	
*/
// populate number of commits for each team member getCommits();
getCommits();

// populate rest of team info
for(var i = 0; i < 7; i++) {
	getUserInfo(team.list[i], handler);
}

// wait for request to complete
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
	console.log('Taking a break...');
	await sleep(1000);
	console.log('Two seconds later');
	
	for (var i = 0; i < 7; i++) {
		console.log(team.list[i].name);
		console.log(team.list[i].userName);
		console.log(team.list[i].imgUrl);
		console.log(team.list[i].bio);
		console.log(team.list[i].commits);
	}
   			

////////////////////////////////// SET DOCUMENT ELEMENTS HERE ///////////////////////////////////////////////
	/*
	Now set relevant document elements using team.getMember("username").[attribute]

	"username" -- team member's github user name
	
	Attributes: all pulled from gitHub -- UPDATE GITHUB PROFILE INFO
	name: team member's real name
	userName: team member's user name
	imgUrl: url of team member's github profile picture
	bio: team member's github bio
	commits: team member's number of commits to this repo
	
	Examples:
	document.getElementById("memberName").innerHTML = team.getMember("simonkliewer").name;
	document.getElementById("gitUserName").innerHTML = team.getMember("amberklepser").userName;
	document.getElementById("imageId").src = team.getMember("arvinbhatti").imgUrl;
	document.getElementById("bioId").innerHTML = team.getMember("ybora").bio;
	document.getElementById("commitId").innerHTML = team.getMember("jasonstephen15").commits;
	*/	

	// v v v your code here v v v	
	
	document.getElementById("simon_img").src = team.getMember("simonkliewer").imgUrl;
	document.getElementById("simon_name").innerHTML = team.getMember("simonkliewer").name;
	document.getElementById("simon_commits").innerHTML += " " + team.getMember("simonkliewer").commits;

	document.getElementById("amber_img").src = team.getMember("amberklepser").imgUrl;
	document.getElementById("amber_name").innerHTML = team.getMember("amberklepser").name;
	document.getElementById("amber_commits").innerHTML += " " + team.getMember("amberklepser").commits;

	document.getElementById("arvin_img").src = team.getMember("arvinbhatti").imgUrl;
	document.getElementById("arvin_name").innerHTML = team.getMember("arvinbhatti").name;
	document.getElementById("arvin_commits").innerHTML += " " + team.getMember("arvinbhatti").commits;

	document.getElementById("yash_img").src = team.getMember("ybora").imgUrl;
	document.getElementById("yash_name").innerHTML = team.getMember("ybora").name;
	document.getElementById("yash_commits").innerHTML += " " + team.getMember("ybora").commits;

	document.getElementById("jason_img").src = team.getMember("jasonstephen15").imgUrl;
	document.getElementById("jason_name").innerHTML = team.getMember("jasonstephen15").name;
	document.getElementById("jason_commits").innerHTML += " " + team.getMember("jasonstephen15").commits;

	document.getElementById("mahmood_img").src = team.getMember("mahmood-alam").imgUrl;
	document.getElementById("mahmood_name").innerHTML = team.getMember("mahmood-alam").name;
	document.getElementById("mahmood_commits").innerHTML += " " + team.getMember("mahmood-alam").commits;

	document.getElementById("wyatt_img").src = team.getMember("Wyatt72").imgUrl;
	document.getElementById("wyatt_name").innerHTML = team.getMember("Wyatt72").name;
	document.getElementById("wyatt_commits").innerHTML += " " + team.getMember("Wyatt72").commits;
			
////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
			
demo();	

