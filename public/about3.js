var numMembersEntered = 0;

docIdMap = function() {
	this.names = [
		"simon",
		"amber",
		"arvin",
		"yash",
		"jason",
		"mahmood",
		"wyatt"];
	this.userNames = [
		"simonkliewer",
		"amberklepser",
		"arvinbhatti",
		"ybora",
		"jasonstephen15",
		"mahmood-alam",
		"Wyatt72"];
	this.toName = function(userName) {
		var ind = this.userNames.indexOf(userName);
		if (ind != -1) {
			return this.names[ind];
		}
		else return null;
	}
}

members = function() {
	this.names = [
		"Simon Kliewer",
		"Amber Klepser",
		"Arvin Bhatti",
		"Yash Bora",
		"Jason Stephen",
		"Mahmood Alam",
		"Wyatt Daumas"];

	this.userNames = [
		"simonkliewer",
		"amberklepser",
		"arvinbhatti",
		"ybora",
		"jasonstephen15",
		"mahmood-alam",
		"Wyatt72"];

	this.memberInfList = [];

	this.getInf = function(key) {
		//console.log(key);
		var nameInd = this.names.indexOf(key);
		var usernameInd = this.userNames.indexOf(key);
		var ind;
		if (nameInd == -1 && usernameInd == -1)
			ind = -1;
		if (nameInd != -1)
			ind = nameInd;
		if (usernameInd != -1)
			ind = usernameInd;
		if (this.memberInfList.length > ind && ind != -1) {
			//console.log(this.memberInfList[ind]);
			return this.memberInfList[ind];
		}
		else {
			console.log("member does not exist");
			return null;
		}
	}

	this.usrToName = function(userName) {
		var ind = this.userNames.indexOf(userName);
		if (ind != -1)
			return this.names[ind];
		else return null;
	}

	this.nameToUsr = function(name) {
		var ind = this.names.indexOf(name);
		if(ind != -1)
			return this.userNames[ind];
		else return null;
	}
}

memberInfo = function() {
	this.commits = 0;
	this.issues = 0;
	this.userName = "";
	this.name = "";	
	this.img = "";

	this.getCommits = function() {
		return this.commits;
	}

	this.getIssues = function() {
		return this.issues;
	}

	this.getUserName = function() {
		return this.userName;
	}

	this.getName = function() {
		return this.name;
	}

	this.getImg = function() {
		return this.img;
	}
}

function userInfo(team, member, userName) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);	
			member.userName = userName;
			//console.log(data.name);
			if(data.name != null)
				member.name = data.name;
			else
				member.name = team.usrToName(userName);
			member.img = data.avatar_url;
			getCommits(team, member, userName);
			getCommits2(team, member, userName);
			getCommits3(team, member, userName);
		}
	};
	xmlhttp.open("GET", "https://api.github.com/users/" + userName);
	xmlhttp.send();
}

function getCommits(team, member, userName) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = (JSON.parse(xmlhttp.responseText));
			var name = team.usrToName(userName);
			//console.log(data);
			for(var i = 0; i < data.length; i++) {
				var author = data[i].commit.author.name;
				if (author != null && (author == userName || author == name))
					member.commits++;
			}
			getIssues(team, member, userName);
		}
	};
	xmlhttp.open("GET", "https://api.github.com/repos/simonkliewer/ee461l_coral/commits");
	xmlhttp.send();
}

function getCommits2(team, member, userName) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = (JSON.parse(xmlhttp.responseText));
			var name = team.usrToName(userName);
			//console.log(data);
			for(var i = 0; i < data.length; i++) {
				var author = data[i].commit.author.name;
				if (author != null && (author == userName || author == name))
					member.commits++;
			}
			//getIssues(team, member, userName);
		}
	};
	xmlhttp.open("GET", "https://api.github.com/repos/simonkliewer/ee461l_coral/commits?page=2");
	xmlhttp.send();
}
function getCommits3(team, member, userName) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = (JSON.parse(xmlhttp.responseText));
			var name = team.usrToName(userName);
			//console.log(data);
			for(var i = 0; i < data.length; i++) {
				var author = data[i].commit.author.name;
				if (author != null && (author == userName || author == name))
					member.commits++;
			}
			//getIssues(team, member, userName);
		}
	};
	xmlhttp.open("GET", "https://api.github.com/repos/simonkliewer/ee461l_coral/commits?page=3");
	xmlhttp.send();
}


function getIssues(team, member, userName) {
	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                        var data = (JSON.parse(xmlhttp.responseText));
                        for(var i = 0; i < data.length; i++) {
								//console.log(data[i]);
                                var userData = data[i].user;
                                if (userData != null) {
                                        if(userData.login != null) {
                                        		if(userData.login == userName)
                                        			member.issues++;
                                        }
                                }
                        }
                        writeMemberToDoc(team, member, userName);
                }
        };
        xmlhttp.open("GET", "https://api.github.com/repos/simonkliewer/ee461l_coral/issues");
        xmlhttp.send();	
}

function commitsTotal(team) {
	console.log("calculating total # commits...");
	var commitsTot = 0;
	for(var i = 0; i < team.memberInfList.length; i++) {
		commitsTot += team.memberInfList[i].commits;
	}
	return commitsTot;
}

function issuesTotal(team) {
	console.log("calculating total # issues");
	var issuesTot = 0;
	for(var i = 0; i < team.memberInfList.length; i++) {
		//console.log(team.memberInfList[i].name + ": " + team.memberInfList[i].issues + " issues");
		issuesTot += team.memberInfList[i].issues;
	}

	return issuesTot;
}

function populateMember(name, userName, team) {
	var member = new memberInfo();
	team.memberInfList.push(member);
	// get user info
	userInfo(team, member, userName);

	// getCommits (called in userInfo)

	// getIssues (called in getCommits)
}

// only called after all API requests for this member have finished
function writeMemberToDoc(team, member, userName) {
	console.log("setting " + team.usrToName(userName) + "...");
	var map = new docIdMap();
	var prefix = map.toName(userName) + "_";
	var img = prefix + "img";
	var name = prefix + "name";
	var commits = prefix + "commits";
	var issues = prefix + "issues";

	document.getElementById(img).src = member.img;
	document.getElementById(name).innerHTML = member.name;
	document.getElementById(commits).innerHTML += " " + member.commits;
	document.getElementById(issues).innerHTML += " " + member.issues;

	numMembersEntered++;

	if(numMembersEntered >= 7) {
		console.log("calculating totals...");
		//console.log("number members entered: " + numMembersEntered);
		document.getElementById("tot_commits").innerHTML = " " + commitsTotal(team);
		document.getElementById("tot_issues").innerHTML = " " + issuesTotal(team);

		console.log(team.memberInfList);
	}
}

function populateAbout() {
	var team = new members();
	// console.log(team);
	for(var i = 0; i < team.names.length; i++) {
		populateMember(team.names[i], team.userNames[i], team);
	}
	// console.log(team.memberInfList);
}

populateAbout();

