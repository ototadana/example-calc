Polymer('example-calc', {
  temp: 0,
  operator: '',
  overwrite: true,
  url: '',
  ready: function() {
    this.clear();
  },
  inputNumber: function(event, detail, sender) {
    if(this.output === '0' || this.overwrite) {
      this.output = '';
    }
    this.output = this.output + sender.innerHTML;
    this.overwrite = false;
  },
  inputOperator: function(event, detail, sender) {
    this.temp = this.output;
    this.operator = sender.innerHTML;
    this.overwrite = true;
  },
  clear: function() {
    this.output = '0';
  },
  calculate: function(event, detail, sender) {
    if(!this.temp || !this.operator) {
      return;
    }

    var operation;
    if(this.operator === '+') {
      operation = 'add';
    } else if(this.operator === '/') {
      operation = 'divide';
    } else if(this.operator === '*') {
      operation = 'multiply';
    } else {
      operation = 'subtract';
    }

    this.url = './calc/' + operation + '/' + this.temp + '/' + this.output;
  },
  handleResponse: function(event, response) {
    this.output = response.response.result;
    this.overwrite = true;
    this.operator = '';
    this.temp = 0;
  }
});
