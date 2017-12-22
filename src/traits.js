export default (editor, config = {}) => {

  // Select trait that maps a class list to the select options.
  // The default select option is set if the input has a class, and class list is modified when select value changes.
  editor.TraitManager.addType('class_select', {
    events:{
      'change': 'onChange',  // trigger parent onChange method on input change
    },
    getInputEl: function() {
      if (!this.inputEl) {
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
          if(target_view_el.classList.contains(value)) {
            option.setAttribute('selected', 'selected');
          }
          input.append(option);
        }
        this.inputEl = input;
      }
      return this.inputEl;
    },

    onValueChange: function () {
      var classes = this.model.get('options').map(opt => opt.value);
      for(let i = 0; i < classes.length; i++) {
        if(classes[i].length > 0) {
          this.target.removeClass(classes[i]);
        }
      }
      const value = this.model.get('value');
      if(value.length > 0 && value != 'GJS_NO_CLASS') {
        this.target.addClass(value);
      }
      this.target.em.trigger('change:selectedComponent');
    }
  });

}
