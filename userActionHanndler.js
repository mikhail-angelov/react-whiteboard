import EventBus from './eventBus';

class UserActionHanndler{

	constructor(){
		this.pressed = false;
	}

	mousePos(e) {
	  	return {
		  	x: 10 * Math.round(e.clientX / 10),
		    y: 10 * Math.round(e.clientY / 10)
		};
	}
	
	mouseDown(e) {
		this.pressed = true;
		EventBus.emit(EventBus.START_PATH,this.mousePos(e))
		
	  // if (world_ref.value.get("click_pos") === undefined)
	  //   reset(world_ref, world_ref.value.set("click_pos", mouse_pos(e)));
	}

	mouseMove(e) {
		if(this.pressed){
			EventBus.emit(EventBus.MOVE_PATH,this.mousePos(e))
		  // var click_pos = world_ref.value.get("click_pos"),
		  //     drag_pos  = world_ref.value.get("drag_pos"),
		  //     pos       = mouse_pos(e);
		  // if (click_pos !== undefined && 
		  //     (drag_pos !== undefined || !eq(click_pos, pos))) {
		  //   reset(world_ref, world_ref.value.set("drag_pos", pos));

		  //   // if we’re in the process of the dragging, we render not a model stored in history,
		  //   // but the one tool_on_drag() call return. This model is auxiliary and ephemeral, it is
		  //   // not stored anywhere. It’s used to show intermediate states of figures move or creation. 
		  //   // No other code knows anything about that. Everybody expects a model, and they get a model

		  //   var model = current_model(),
		  //       new_model = tool_on_drag(model.get("tool"), model, click_pos, pos, e);
		  //   if (new_model !== undefined)
		  //       render_ui(world_ref.value.setIn(["history", world_ref.value.get("at")], new_model));
		  // }
		}
	}

	mouseUp(e) {
		this.pressed = false;
		EventBus.emit(EventBus.END_PATH,this.mousePos(e))
	  // var model = current_model(),
	  //     tool  = model.get("tool"),
	  //     click_pos = world_ref.value.get("click_pos"),
	  //     drag_pos  = world_ref.value.get("drag_pos"),
	  //     pos       = mouse_pos(e);

	  // // On mouse up we’re reusing tool_on_drag() and tool_on_click()
	  // // to commit new model to the history
	  // if (click_pos !== undefined) {
	  //   if (drag_pos !== undefined) {
	  //     var new_model = tool_on_drag(tool, model, click_pos, drag_pos, e);
	  //     if (new_model !== undefined)
	  //       edit_model(new_model);
	  //   } else {
	  //     var new_model = tool_on_click(tool, model, click_pos, e);
	  //     if (new_model !== undefined)
	  //       edit_model(new_model);
	  //   }
	  // }
	  // reset(world_ref, world_ref.value.delete("click_pos").delete("drag_pos"));
	}

	keyDown(e) {
	  // if (!e.ctrlKey && !e.shiftKey && !e.metaKey) {
	  //   var tool = tool_keys.find(function(t) { return t[1].charCodeAt(0) === e.keyCode });
	  //   if (tool !== undefined)
	  //     edit_model(current_model().set("tool", tool[0]));
	  // }
	  switch (e.keyCode) {
	    case 27: // escape
	      //reset(world_ref, world_ref.value.delete("click_pos").delete("drag_pos"));
	      EventBus.emit(EventBus.MOVE_UNDO)
	      break;
	    case 8:  // backspace
	    case 46: // delete
	      // var model = current_model(),
	      //     scene = model.get("figures"),
	      //     selection = model.get("selection"),
	      //     selected  = function(fig) { return selection.contains(fig); };
	      // edit_model(model.set("figures", scene.filterNot(selected)));
	      // e.preventDefault();
	      break;
	    case 90: // Z
	    	EventBus.emit(EventBus.MOVE_REDO)
	      // if (e.metaKey || e.ctrlKey) {
	      //   if (e.shiftKey) redo(); else undo();
	      // }
	      // e.preventDefault();
	      break;
	  }
	}
}

export default new UserActionHanndler();