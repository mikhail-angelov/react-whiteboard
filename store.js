import Immutable from 'immutable';
import EventBus from './eventBus'
import ToolStore from './toolStore';
import Line from './components/shapes/line';
import Rect from './components/shapes/rect';
import Ellipse from './components/shapes/ellipse';

class Store{

	constructor(){
		this.id = 'whiteBoardStore';
		EventBus.on(EventBus.START_PATH, this.startPath.bind(this))
		EventBus.on(EventBus.MOVE_PATH, this.movePath.bind(this))
		EventBus.on(EventBus.END_PATH, this.endPath.bind(this))
		EventBus.on(EventBus.UNDO, this.undo.bind(this))
		EventBus.on(EventBus.REDO, this.redo.bind(this))
		EventBus.on(EventBus.PICK_VERSION, this.pickVersion.bind(this))

		this.data = {
			shapes: Immutable.List.of(),
			selected: [],
			currentLine: null
		};
		this.history = [this.data.shapes];
		this.historyIndex = -1;
		this.tool = Line;
		this.color = 'black';

		ToolStore.subscribe(()=>{
			let tool = ToolStore.tool;
			let map = {
				line: Line,
				rect: Rect,
				ellipse: Ellipse
			}
			this.tool = map[tool] || Line;
			this.color = ToolStore.color;
		})
	}
	subscribe(cb){
		EventBus.on(this.id,cb);
	}
	emitChanges(){
		EventBus.emit(this.id);
	}
	startPath(event,position){
		this.data.currentLine = {
			type: this.tool,
			path: [position],
			color: this.color
		};
		this.emitChanges()
	}
	movePath(event,position){
		//console.log('position',position)
		this.data.currentLine.path.push(position);
		this.emitChanges()
	}
	endPath(event,position){
		if(this.data.currentLine){
			this.data.currentLine.path.push(position);
			this.data.shapes = this.data.shapes.push(this.data.currentLine);
			this.data.currentLine = null;

			this._catHistory();
			this.history.push(this.data.shapes);
			this.historyIndex = -1;
			this.emitChanges()
		}
	}
	undo(){
		if(this.history.length > 0){
			if(this.historyIndex == -1) this.historyIndex = this.history.length -1;
			this.pickVersion(null, this.historyIndex - 1);
		}
	}
	_catHistory(){
		if(this.historyIndex >=0){
			this.history.splice(this.historyIndex+1,this.history.length - this.historyIndex -1);
		}
	}
	pickVersion(event, index){
		console.log(index)
		if(this.history && this.history[index]){
			this.historyIndex = index;
			let shapes = this.history[index];
			this.data.shapes=shapes;
			this.emitChanges();
		}
	}
	redo(){}
}

export default new Store();