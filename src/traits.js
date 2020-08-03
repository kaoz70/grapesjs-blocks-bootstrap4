import _ from 'underscore';
//import _s from 'underscore.string';
export default (editor, config = {}) => {

  const tm = editor.TraitManager;

  // Select trait that maps a class list to the select options.
  // The default select option is set if the input has a class, and class list is modified when select value changes.
  tm.addType('class_select', {
    events:{
      'change':      'onChange'  // trigger parent onChange method on input change
    },
    createInput({ trait }) {
        var md = this.model;
        var opts = md.get('options') || [];
        var input = document.createElement('select');
        var target = this.target;
        var target_view_el = this.target.view.el;
        for(let i = 0; i < opts.length; i++) {
          let name = opts[i].name;
          let value = opts[i].value;
          if(value=='') { value = 'GJS_NO_CLASS'; } // 'GJS_NO_CLASS' represents no class--empty string does not trigger value change
          let option = document.createElement('option');
          option.text = name;
          option.value = value;
          const value_a = value.split(' ');
          //if(target_view_el.classList.contains(value)) {
          if(_.intersection(target_view_el.classList, value_a).length == value_a.length) {
            option.setAttribute('selected', 'selected');
          }
          input.append(option);
        }
        return input;
    },
    onUpdate({ elInput, component }) {
      const classes = component.getClasses() ;
      var opts = this.model.get('options') || [];
      for(let i = 0; i < opts.length; i++) {
        let name = opts[i].name;
        let value = opts[i].value;
        if(value && classes.includes(value)){
          elInput.value = value;
          return;
        }
      }
      elInput.value = "GJS_NO_CLASS";
    },

    onEvent({ elInput, component, event }) {
      var classes = this.model.get('options').map(opt => opt.value);
      for(let i = 0; i < classes.length; i++) {
        if(classes[i].length > 0) {
          var classes_i_a = classes[i].split(' ');
          for(let j = 0; j < classes_i_a.length; j++) {
            if(classes_i_a[j].length > 0) {
              component.removeClass(classes_i_a[j]);
            }
          }
        }
      }
      const value = this.model.get('value');

      // This piece of code removes the empty attribute name from attributes list
      const elAttributes = component.attributes.attributes;
      delete elAttributes[""];
      
      if(value.length > 0 && value != 'GJS_NO_CLASS') {
        const value_a = value.split(' ');
        for(let i = 0; i < value_a.length; i++) {
          component.addClass(value_a[i]);
        }
      }
      component.em.trigger('component:toggled');
    },
  });

  const textTrait = tm.getType('text');

  tm.addType('content', {
    events:{
      'keyup': 'onChange',
    },

    onValueChange: function () {
      var md = this.model;
      var target = md.target;
      target.set('content', md.get('value'));
    },

    getInputEl: function() {
      if(!this.inputEl) {
        this.inputEl = textTrait.prototype.getInputEl.bind(this)();
        this.inputEl.value = this.target.get('content');
      }
      return this.inputEl;
    }
  });

  tm.addType('content', {
    events:{
      'keyup': 'onChange',
    },

    onValueChange: function () {
      var md = this.model;
      var target = md.target;
      target.set('content', md.get('value'));
    },

    getInputEl: function() {
      if(!this.inputEl) {
        this.inputEl = textTrait.prototype.getInputEl.bind(this)();
        this.inputEl.value = this.target.get('content');
      }
      return this.inputEl;
    }
  });

}
