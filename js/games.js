const dive = document.createElement("div")
var elems = new Array
const idit = document.getElementById("anchor")
function pushCrapToDOM() {
for (let m=0;  elems.length > m; m++) {
dive.appendChild(elems[m]);
}
document.body.insertBefore(dive, idit);
};
//im gonna put all this json on one line and no one can stop me
const dumbassShart = '{"comment": "game entries in game name-icon location format, icon location relative to ../images/appicons/", "games": [["Eaglercraft", "minecraft"], ["BTD5", "btd5"], ["Dino Game", "dinogame"], ["Geometry Dash", "geodash"], ["House of Hazards", "houseofhazards"], ["Janissary Battles", "janissarybattles"], ["Janissary Towers", "janissarytower"], ["Mingiants.io", "mingiants"], ["Motox3m", "motox3m"], ["The Password Game", "thepasswordgame"], ["Slope Game", "slopegame"]]}';
var shittyObjectShit = JSON.parse(dumbassShart)
//fuck for loops im a rebel 
var iteratorBullshit = 0
while(!iteratorBullshit==shittyObjectShit["games"].length){
    elems.push(document.createElement("a"))
    //i think this is how innerhtml works right???
    elems[iteratorBullshit].innerHtml = "<img src=" +'"'+"../images/appicons"+shittyObjectShit["games"][iteratorBullshit][1]+'" >'
    elems[iteratorBullshit].margin = "5px"
    iteratorBullshit += 1
}
pushCrapToDOM()