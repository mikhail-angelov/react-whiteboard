import EventBus from './eventBus'

export const POINTER = 'Pointer'
export const PEN ='Pen'
export const LINE ='Line'
export const ELLIPSE = 'Elipse'
export const RECT = 'Rect'

class ToolStore{

	constructor(){
		this.id = 'toolStore';
		EventBus.on(EventBus.TOOL_CHANGE, this.toolChange.bind(this));
		EventBus.on(EventBus.COLOR_CHANGE, this.colorChange.bind(this));
		this.tool = LINE;
		this.color = 'black';
	}
	subscribe(cb){
		EventBus.on(this.id,cb);
	}
	emitChanges(){
		EventBus.emit(this.id);
	}
	toolChange(event, tool){
		this.tool = tool;
		this.emitChanges()
	}
	colorChange(event, color){
		this.color = color;
		this.emitChanges()
	}
}

export default new ToolStore();