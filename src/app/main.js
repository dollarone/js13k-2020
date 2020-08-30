"use strict"

import EventCard from './EventCard.js'
import Map from './Map.js'
import Tile from './Tile.js'
import Footballer from './Footballer.js'
import Skill from './Skill.js'
import PlayerCard from './PlayerCard.js'

class Main {
	constructor(test) {
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
		this.startGame = this.startGame.bind(this)
		this.click = this.click.bind(this)
		this.randomInt = this.randomInt.bind(this)
		this.mulberry32 = this.mulberry32.bind(this)
		this.createTile=this.createTile.bind(this)
		this.createTileDesigns=this.createTileDesigns.bind(this)
		this.generateName=this.generateName.bind(this)
		this.addToBattlelog=this.addToBattlelog.bind(this)
		this.randomGenerator=this.mulberry32(2)
		this.designs=["plains","forest","mountains","dungeon","forest-top","mountains-top","plains-top","dungeon-top","sword","warrior","chicken","coin","heart","deadheart","dagger"]
		this.tileDesigns=["vv~vvvvvvvvvvvwvvwvvvvvvvvvwvvvvvvvvvv~vvvvvvvvv~vvvwvvvvvvvvvvvvvvvvvwvvvvwvvv~wvvvvvvvvvwvvvvvvvvvv~vvvvvvvvvvvwvv~vvwvvvvvvvv",
			"[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[I[[[[[[I[I[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[",
			"dg|",
			"",
			"@H@@@@@@@IA@@H@@@IA@@HA@HII@@IA@HII@@IA@IIIA@IA@IIIA@II@IIIAHII@IIIAHII@IIIAHII@III@IIIAHII@IIIA@R@@IIIA@R@@HII@@@@@@PB@@@@@@PB@",
			"@@@D@@@@@@`g@@@@@@|gD@@@@@|gd@@@@`gd@@@@`|gdD@@@|gdd@@`ggdd@@`ggdd@@|g|ddD@`||gdD@@`||gdd@@@`|gdd@@@@`ddd@@@@@`dD@@@@@@@@@",
			"@@@@@@@x@@@@@@Gp@@@@@@Fp@@@@@@Fp@@@@@@F@@@@@@@@@G@@@@@@@F@@@@@@@FGG@@@@@FFFG@@@@FFFFG@@@@FFFF@@G@FFFFx@F@@FFFp@F@@@@Fp@F@@@@@p@@",
			"`dd@`dd@dgddgdgggggddgdddgddgd`g@`g@`dd@`dd@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
			"@@@@@@`d@@@@@@|g@@@@@`g@@@@@|D@@@@`g@@@@@|D@PB@`g@@PR@|D@@@Rbg@@@@PRD@@@@@Rb@@@@@PRR@@@@@RBRB@@@PR@PR@@@RB@@R@@@R@@@@@@@", //sword
			"@`@@@D@@@`dddD@@@@Tdb@@@@@tdf@@@@@tvf@@@@@`dD@@@@d||dd@x`ggggg@x`g||dg@`ggggg@G`d||ddxG@vbbBV@@vRRBvB@@@RPBB@@@@RPB@@@@PRPR@@@",
			"@@@@`R@@@@@@TRB@@@@`RRB@@@@`RRB@@@@TRR@@@@@TRR@@@@`RRB@@@@`RR@@@@@`RB@@@@@|G@@@@@@|@@@@@@d@@@@@`G@@@@@@@G@@@@@@@@@@@@@@@@@@@@@",
			"@@@dd@@@@@dd@@@`D@@||g@@|g|g@`|dD`|gD`|gD`|dD@|gdg@@|g@@`D@@@dd@@@@@dd@@@@@@@@@@@@@@@@@@@",
			"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@hE@m@@@@mmhmE@@@mmmmE@@@hmmm@@@@@mmE@@@@@hm@@@@@@@E@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
			"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`D@d@@@@dd`dD@@@ddddD@@@`ddd@@@@@ddD@@@@@`d@@@@@@@D@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
			"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@x@@@@x@@@@@@@@@@xG@@@@@b@@@@@PRD@@@@@RR@@@@@PRB@@@@@@R@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"] 

		// TODO: instead have references to this from the monster roster
		this.bosses=[["Orc Chieftain","Land Shark"],["black bear","Goblin Warlord"],["Stone Golem","Giant"],["Sir Despair"]]
		this.levelNames=["wild plains", "forest of Rackwood", "Longcrag mountains", "Dungeon of Despair"]
		this.exits=["Eftiell Tower","the town of Leafhill","Rackwood Inn","Longcraig Tower","Crypt of Despair"]
		this.caves=["cave","cavern","hideout","mine"]
		this.canvas = document.getElementById('gameCanvas')
		this.context = this.canvas.getContext('2d')
		this.grid=[]
		this.gridTest=[]
		this.gridSpines=[]
		this.gridWidth=10
		this.gridHeight=10
		this.state=10
		this.level=0
		this.mapPos=0
		this.colours=[]
		this.colours[0] = "#000000"
		this.colours[1] = "#666666"
		this.colours[2] = "#00aa00"
		this.colours[3] = "#0000aa"
		this.colours[4] = "#aaaa00"
		this.colours[5] = "#00aaaa"
		this.colours[6] = "#aaaaaa"
		this.px=this.createTileDesigns(this.tileDesigns)

		let footballer=new Footballer(this.context,"Frank Rosenfelt","Bronze","Defender")
		this.cards=[]
		this.cards.push(new PlayerCard(this.context,"Tackle",footballer,"Defence",2,null,0))
		this.cards.push(new PlayerCard(this.context,"Header",footballer,"Defence",2,null,0))
		this.cards.push(new PlayerCard(this.context,"Sliding tackle",footballer,"Defence",2,null,0))
		this.cards.push(new PlayerCard(this.context,"Powerful challenge",footballer,"Defence",2,"Defence",4))
		this.cards.push(new PlayerCard(this.context,"Last ditch tackle",footballer,"Defence",2,"Defence",4))
		this.context.font = "12px Arial"
		//this.context.font = "16px Arial"
		this.context.strokeStyle = this.colours[6]
		this.context.strokeText("Next", 80, 50)
		//this.context.translate(0.5, 0.5);
		this.context.imageSmoothingEnabled=false

		
		this.temporaryClickableFields=[]
//			this.temporaryClickableFields.push([20, 110 + i*40 + Math.floor(this.currentEncounter.text.length/60)*15-20, 23+this.currentEncounter.options[i].length*5,30])

		this.player = new Tile(this.context,24,500,9,this.px)

		this.sword= new Tile(this.context,80,500,8,this.px)
		this.blinkers=[]

		this.heroNames=["Valfar","Hrasvalg","Polby","Batrik","Bhorgal","Wilfa","Zander","Gundar","Soth","Arne"]
		this.heroes=[]

		this.reusableChicken=this.createTile("chicken",60,380)
		this.reusableCoin=this.createTile("coin",20,380)
		this.reusableHeart=this.createTile("heart",40,380)
		this.reusableDeadheart=this.createTile("deadheart",1,1)

		this.food=this.createTile("chicken",120,310)
		this.coin=this.createTile("coin",200,310)
		this.foodTotal=20
		this.coinTotal=20
		this.gameover=false
		this.win=false
		this.debug=true
  	}
  	generateName() {
  		let num=this.randomInt(0,this.heroNames.length)
		let name=this.heroNames[num]
		this.heroNames.splice(num,1)
		return name
  	}
  	getNodeIfExist(x,y,data) {
		for(let n=0;n<data.length;n++) {
			if(x==data[n]["x"] && y==data[n]["y"]) {
				return n
			}
		}
		return -1
  	}
  	generateMap(level,title) {
  		let data=[]
		let nextfreenodeid=0
		let col=0
		let placeBoss=true

		for(let z=0;z<this.randomInt(2,3+level); z++) {
			let prevnodeid=0
			col++
	  		let x=1
	  		let y=3
	  		let lastWasX=this.randomInt(0,2)==0
			let node=[]
			node["x"]=x
			node["y"]=y
			node["e"]=this.randomEncounter(1,"foo")	
			if(z==0) {
				node["e"]= this.specialEncounters(level,"start")
			}
			node["n"]=[]
			node["c"]=this.colours[col]
			node["s"]="none"
			node["id"]=nextfreenodeid
			let foundid=this.getNodeIfExist(x,y,data)
			if(foundid==-1) {
				console.log("adding " + data.length + ": " + x + "," + y)
				data.push(node)
				nextfreenodeid++
			}
			else {
				console.log("re-using " + foundid + ": " + x + "," + y)
				node=data[foundid]
				prevnodeid=foundid
			}

			while(x<6) {
				if(level==3) {
					let lastY=y
					if(!lastWasX) {
						x++
						lastWasX=true
					}
					else {
						y=Math.min(Math.max(y+this.randomInt(-1,2),1),5)
						lastWasX=false
					}
					if(y==lastY && !lastWasX) {
						x++
						lastWasX=true
					}
				}
				else {
					x++
					if(this.randomInt(1,10)==1) {
						x++
					}
					y=Math.min(Math.max(y+this.randomInt(-2,3),1),5)
				}

				if(x<6) {
					node=[]
					node["x"]=x
					node["y"]=y
					node["e"]=this.randomEncounter(1,"foo")
					node["c"]="#111"
					node["s"]="none"
					node["n"]=[prevnodeid]
					node["id"]=nextfreenodeid

					foundid=this.getNodeIfExist(x,y,data)
					if(foundid==-1) {
						console.log("adding " + data.length + ": " + x + "," + y)
						data.push(node)
						if(!data[prevnodeid]["n"].includes(nextfreenodeid)) {
							data[prevnodeid]["n"].push(nextfreenodeid)
						}
						prevnodeid=nextfreenodeid
						nextfreenodeid++
					}
					else {
						console.log("re-using " + foundid + ": " + x + "," + y)
						if(!data[foundid]["n"].includes(prevnodeid)) {
							data[foundid]["n"].push(prevnodeid)
						}
						if(!data[prevnodeid]["n"].includes(foundid)) {
							data[prevnodeid]["n"].push(foundid)
						}
						prevnodeid=foundid
					}			
				}
			}
			if(placeBoss && level==3) {
				//data[data.length-1]["c"]="#7f7" // mark this otherwise
				data[data.length-1]["s"]="boss"
				
				placeBoss=false
			}

		}
		if(level!=3) {
			//data[data.length-1]["c"]="#333" // mark this otherwise
			data[data.length-1]["s"]="exit"
		}
 		for(let i=0; i<data.length; i++) {
 			let buffer = i + " (" + data[i]["x"] + "," + data[i]["y"] + ") goes to "
 			if(data[i].hasOwnProperty("n")) {
	 			for(let a=0; a<data[i]["n"].length; a++) {
	 				buffer+=data[i]["n"][a] + ", "
	 			} 
	 		}
	 		console.log(buffer)
 		}
 /*
				  ------o------o---
				 /			  /		\
		o-------o------------o		 o-----o
				 \ 			/		/
				  ---o-----o-------o
*/		
  		return new Map(this.context, this.levelNames[level].toUpperCase(), data, level, this.px)
  	}

  	randomInt(min,max) {
  		return Math.floor(this.randomGenerator() * (+max - +min)) + +min 
  	}
  	addToBattlelog(text) {
  		this.battlelog.push(text)
  		if(this.battlelog.length>16) {
  			this.battlelog.shift()
  		}
  	}
	update() {
		if(this.gameover || this.win) {
			this.temporaryClickableFields=[]
		}
		else {
			if(this.state==50) {
				for(let i=0; i<this.currentEncounter.enemy.skills.length; i++) {
					this.currentEncounter.enemy.skills[i].update()
					if(this.randomInt(1,40)==1 && !this.currentEncounter.enemy.skills[i].cooldown) {
						this.currentEncounter.enemy.skills[i].activate()
						let target=this.randomInt(0,this.heroes.length)
						if(this.currentEncounter.enemy.skills[i].name=="Attack") {
							this.heroes[target].health-=this.currentEncounter.enemy.skills[i].effect
							this.addToBattlelog("The " + this.currentEncounter.enemy.name + " " + this.currentEncounter.enemy.skills[i].verb + " " + this.heroes[target].name + " for " + this.currentEncounter.enemy.skills[i].effect + " damage.")
						}
						if(this.heroes[target].health<1) {
							this.addToBattlelog(this.heroes[target].name + " collapses in a heap!")	
							if(target==0) {
								this.gameover=true
								this.addToBattlelog("You have died!")
								return
							}
							for(let z=target; z<this.heroes.length; z++) {
								this.heroes[z].y-=100
								this.heroes[z].render()
							}

							this.heroes.splice(target,1)
							this.temporaryClickableFields=[]

							for(let z=0; z<this.heroes.length; z++) {

								for(let a=0; a<this.heroes[z].skills.length; a++) {
									//this.heroes[i].skills[a].icon.y=this.heroes[i].y+30
									this.temporaryClickableFields.push([this.heroes[z].skills[a].icon.x-8, 
										this.heroes[z].skills[a].icon.y-8, 
										48,
										48,z,a])
										console.log("adding for combat: " + a + " " + 
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][0] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][1] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][2] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][3])
								}
							}					
						}
					}
				}
			}
		}
	}
    render() {
    	
		for(let i=0; i<this.cards.length; i++) {
			console.log(this.cards[i].name)
		    this.context.fillText(this.cards[i].name, 20+i*100, 320)
		}


		if(this.debug) {
			for(let i=0;i<this.temporaryClickableFields.length;i++) {
				this.context.fillStyle="rgba(255, 255, 255, 0.1)"
				this.context.fillRect(this.temporaryClickableFields[i][0], this.temporaryClickableFields[i][1],
					this.temporaryClickableFields[i][2],this.temporaryClickableFields[i][3], "rgba(255, 255, 255, 0.9)")
				//let pos = this.map[this.level].getPos(this.mapPos)
				//this.rectFill(-54+10+72*pos[0],-21+70+(56*pos[1]),
				//	20,20, "rgba(255, 255, 255, 0.5)")
			}
		}
	}
	click(e) {
		console.log("touched/clicked " + e.offsetX + "," + e.offsetY)
		for(let i=0;i<this.temporaryClickableFields.length;i++) {
			if(e.offsetX>=this.temporaryClickableFields[i][0] && e.offsetX<=this.temporaryClickableFields[i][0]+this.temporaryClickableFields[i][2] &&
				e.offsetY>=this.temporaryClickableFields[i][1] && e.offsetY<=this.temporaryClickableFields[i][1]+this.temporaryClickableFields[i][3]) {
				console.log("match:" + i)
				if(this.state==51) {
					this.battlelog=[]
					this.addToBattlelog("You find the following:")
					let loot=this.currentEncounter.enemy.loot.transact()
					//			return [this.coin_gained,this.food_gained,this.health_gained, this.item_gained]

					if(loot[0]>0) {
						this.addToBattlelog("    • " + loot[0] + " coin")
						this.coinTotal+=loot[0] 
					}
					if(loot[1]>0) {
						this.addToBattlelog("    • " + loot[1] + " food") 
						this.foodTotal+=loot[1]
					}
					//no health possible
					if(loot[3]!=null) {
						this.addToBattlelog("    • " + loot[3].name) 
						//todo
					}
					this.addToBattlelog("")
					this.addToBattlelog("")
					this.addToBattlelog("")
					this.state=52
					this.temporaryClickableFields=[]
					this.temporaryClickableFields.push([24, 20+this.battlelog.length*15,60,30])
				}
				else if(this.state==52) {
					if(this.currentEncounter.special==15) {
						this.win=true
						this.state=103
						return
					}
					this.currentEncounter.special=0
					this.temporaryClickableFields = []
					this.state=102	
					this.currentEncounter.state=100
					let neighbours = this.map[this.level].data[this.mapPos]["n"]
					this.blinkers=[]
					for(let i=0; i<neighbours.length; i++) {
						let pos=this.map[this.level].getPos(neighbours[i])
						this.temporaryClickableFields.push([-54+10+72*pos[0],-27+20+56*pos[1],20,20,neighbours[i]])
						this.blinkers.push(neighbours[i])
						console.log("Add neigh " + neighbours[i])
					}			
				}
				else if(this.state==50) {

					let hero=this.temporaryClickableFields[i][4]
					let skill=this.temporaryClickableFields[i][5]
					console.log("hero " + hero + " skill " + skill)
					if(!this.heroes[hero].skills[skill].cooldown) {
						console.log("activate")
						this.heroes[hero].skills[skill].activate()
						if(this.heroes[hero].skills[skill].name=="Attack") {
							this.currentEncounter.enemy.health-=this.heroes[hero].skills[skill].effect
							this.addToBattlelog(this.heroes[hero].name + " attacks the " + this.currentEncounter.enemy.name + " for " + this.heroes[hero].skills[skill].effect + " damage.")
						}
						if(this.currentEncounter.enemy.health<1) {
							this.addToBattlelog(this.currentEncounter.enemy.deathtext)
							this.addToBattlelog("")
							this.addToBattlelog("")
							this.addToBattlelog("")
							this.state=51
							this.temporaryClickableFields=[]
							this.temporaryClickableFields.push([24, 20+this.battlelog.length*15,60,30])
						}
					}
					return
				}
				else if(this.state==100 || this.state==102) {
					this.mapPos=this.temporaryClickableFields[i][4]
					this.temporaryClickableFields = []
					this.currentEncounter=this.map[this.level].data[this.mapPos]["e"]

					let disappearing=[]
				
					for(let i=0; i<this.heroes.length; i++) {
						if(this.heroes[i].coincost==0 || this.heroes[i].coincost<=this.coinTotal) {
							this.coinTotal-=this.heroes[i].coincost
						}
						else {
							disappearing.push(i)
						}
					}
					let newCrew=[]
					for(let i=0; i<this.heroes.length;i++) {
						if(!disappearing.includes(i)) {
							newCrew.push(this.heroes[i])
						}
					}
					this.heroes=newCrew
					let dead=[]
					for(let i=0; i<this.heroes.length; i++) {
						if(this.heroes[i].foodcost==0 || this.heroes[i].foodcost<=this.foodTotal) {
							this.foodTotal-=this.heroes[i].foodcost
						}
						else {
							this.heroes[i].damage(1)
							if(this.heroes[i].health<1) {
								dead.push(i)
								if(i==0) {
									this.gameover=true
								}
							}
						}
					}
					let newCrew2=[]
					for(let i=0; i<this.heroes.length;i++) {
						if(!dead.includes(i)) {
							newCrew2.push(this.heroes[i])
						}
					}
					this.heroes=newCrew2
					if(disappearing.length>0) {
						this.currentEncounter=this.specialEncounters(this.level,"cashflowproblem")
					}
					if(dead.length>0) {
						this.currentEncounter=this.specialEncounters(this.level,"famine")
					}

					if(this.currentEncounter.result!=null) {
						this.state=12
						this.temporaryClickableFields.push([20, 110 + Math.floor(8/60)*15-20, 60,30])
					}
					else {
						this.state=10
						for(let i=0;i<this.currentEncounter.options.length;i++) {
							let canAffordOption=true
							if(this.currentEncounter.special==4 || this.currentEncounter.special==10) {
								canAffordOption=this.currentEncounter.cost[i].affordable(this.coinTotal,this.foodTotal,this.heroes[0].health)
							}
							if(canAffordOption) {
								let textLength = this.context.measureText("1. " +this.currentEncounter.options[i])
								this.temporaryClickableFields.push([20, 110 + i*40 + Math.floor(this.currentEncounter.text.length/60)*15-20, 20+textLength.width,30])
							
								console.log("adding for encounter: " + i + " " + 
									this.temporaryClickableFields[this.temporaryClickableFields.length-1][0] + "," +
									this.temporaryClickableFields[this.temporaryClickableFields.length-1][1] + "," +
									this.temporaryClickableFields[this.temporaryClickableFields.length-1][2] + "," +
									this.temporaryClickableFields[this.temporaryClickableFields.length-1][3])
							}
							else {
								this.temporaryClickableFields.push([-1,-1,-1,-1,-1])
							
							}
						}
					}	
					console.log("clicked on mapPos " + this.mapPos)
					
					this.player.x=-16+20+-54+72*this.map[this.level].data[this.mapPos]["x"]
					this.player.y=-24+30+-22+56*this.map[this.level].data[this.mapPos]["y"]
					this.temporaryClickableFields.push(20,400,25,25,5)
					return
				}
				else if(this.state==10) {
					this.currentEncounter.result=i
					this.state=12
					this.temporaryClickableFields = []
					this.temporaryClickableFields.push([20, 110 + Math.floor(8/60)*15-20, 60,30])
					if(this.currentEncounter.special==4 || this.currentEncounter.special==10) {
						//this.currentEncounter.state=100
						let deal=this.currentEncounter.cost[i].transact()
						this.coinTotal+=deal[0]-this.currentEncounter.cost[i].coin_cost
						this.foodTotal+=deal[1]-this.currentEncounter.cost[i].food_cost
						this.heroes[0].health+=deal[2]-this.currentEncounter.cost[i].health_cost
					}						
					return
				}
				else if(this.state==12) { // result != null
					if(this.currentEncounter.special==1 && this.currentEncounter.result==0) {
						this.temporaryClickableFields = []
						this.mapPos=0
						this.state=100
						this.level++
						let pos=this.map[this.level].getPos(this.mapPos)
						this.temporaryClickableFields=[]
						this.temporaryClickableFields.push([-54+10+72*pos[0],-27+20+56*pos[1],20,20,this.mapPos])
						this.player.x=-16+20+-54+72*this.map[this.level].data[this.mapPos]["x"]
						this.player.y=-24+30+-22+56*this.map[this.level].data[this.mapPos]["y"]-15
						this.blinkers=[]
						this.blinkers.push(this.mapPos)
					}
					else {
						if((this.currentEncounter.special==10 || this.currentEncounter.special==15) && this.currentEncounter.result==0) {
							// enter combat
							console.log("entering combat")

							this.battlelog=[]
							this.addToBattlelog(this.currentEncounter.enemy.introtext)

							this.temporaryClickableFields=[]
							this.state=50
							for(let i=0; i<this.heroes.length; i++) {
								for(let a=0; a<this.heroes[i].skills.length; a++) {
									this.temporaryClickableFields.push([this.heroes[i].skills[a].icon.x-8, 
										this.heroes[i].skills[a].icon.y-8, 
										48,
										48,i,a])
										console.log("adding for combat: " + a + " " + 
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][0] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][1] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][2] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][3])
								}
							}
							return
						}
						if(this.currentEncounter.special==5) {
							this.currentEncounter=this.map[this.level].data[this.mapPos]["e"]
							this.temporaryClickableFields=[]
							if(this.currentEncounter.result!=null) {
								this.state=12
								this.temporaryClickableFields.push([20, 110 + Math.floor(8/60)*15-20, 60,30])
							}
							else {
								this.state=10
								for(let i=0;i<this.currentEncounter.options.length;i++) {
									let canAffordOption=true
									if(this.currentEncounter.special==4 || this.currentEncounter.special==10) {
										canAffordOption=this.currentEncounter.cost[i].affordable(this.coinTotal,this.foodTotal,this.heroes[0].health)
									}
									if(canAffordOption) {
										let textLength = this.context.measureText("1. " +this.currentEncounter.options[i])
										this.temporaryClickableFields.push([20, 110 + i*40 + Math.floor(this.currentEncounter.text.length/60)*15-20, 
											20+textLength,30])
									
										console.log("adding for encounter: " + i + " " + 
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][0] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][1] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][2] + "," +
											this.temporaryClickableFields[this.temporaryClickableFields.length-1][3])
									}
									else {
										this.temporaryClickableFields.push([-1,-1,-1,-1,-1])
									
									}
								}
							}
						}
						else {
							if(this.currentEncounter.special==1) {
								this.currentEncounter.result=null
							}
							this.temporaryClickableFields = []
							this.state=102	
							this.currentEncounter.state=100
							let neighbours = this.map[this.level].data[this.mapPos]["n"]
							this.blinkers=[]
							for(let i=0; i<neighbours.length; i++) {
								let pos=this.map[this.level].getPos(neighbours[i])
								this.temporaryClickableFields.push([-54+10+72*pos[0],-27+20+56*pos[1],20,20,neighbours[i]])
								this.blinkers.push(neighbours[i])
								console.log("Add neigh " + neighbours[i])
							}
						}
					}
				}
			}
		}
	}

	startGame() {

		this.gameStarted=true

	}
	mulberry32(a) {
	    return function() {
	      var t = a += 0x6D2B79F5;
	      t = Math.imul(t ^ t >>> 15, t | 1);
	      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    	}
	}

	createTile(design,x,y) {
		for(let i=0; i<this.designs.length;i++) {
			console.log("comparing " + design + " with " + this.designs[i])
			if(design==this.designs[i]) {
				return new Tile(this.context,x,y,i,this.px)
			}
		}
		return null
	}
	createTileDesigns(tileDesigns) {
		let designs=[tileDesigns.length]
		for(let i=0; i<tileDesigns.length; i++) {
			designs[i]=[]
			let P=tileDesigns[i].replace(/./g,a=>{
				let z=a.charCodeAt()
				designs[i].push(z&7)
				designs[i].push((z>>3)&7)
			})
		}
		return designs
	}
}
export default Main
