"use strict"

class PlayerCard {
	constructor(context,name,footballer,standard_type,standard_quality,special_type,special_quality) {
		this.render=this.render.bind(this)
		this.context=context
		this.name=name
		this.footballer=footballer
		this.standard_type=standard_type
		this.standard_quality=standard_quality
		this.special_type=special_type
		this.special_quality=special_quality
	}
	render() {

	}
}
export default PlayerCard