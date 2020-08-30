"use strict"

class Footballer {
	constructor(context,name,quality,position) {
		this.context=context
		this.name=name
		this.quality=quality
		this.position=position
		this.yellow=false
		this.red=false
		this.small_injury=false
		this.big_injury=false
	}
}
export default Footballer