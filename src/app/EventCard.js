"use strict"

class EventCard {
	constructor(context,name,event) {
		this.render=this.render.bind(this)
		this.context=context
		this.name=name
		this.event=event
	}
	render(x,y) {

		this.context.fillStyle = 'Red'
		this.context.fillRect(x,y,200,300);
	}
}
export default EventCard
