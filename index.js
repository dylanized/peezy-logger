// setup

	var _ = require("lodash"),
		chalk = require('chalk');
	
	var peezyLogger = {};
	
	// default levels
	peezyLogger.levels = require("./levels.json");

	// show this level and under
	peezyLogger.visible = 5;	

// methods
	
	// override defaults
	peezyLogger.init = function(levels) {
		peezyLogger.levels = levels;
	}

	// set level
	peezyLogger.set = function(level) {
		if (_.isNumber(level)) this.visible = Number(level);
		else this.visible = this.getNum(level);
	}
	
	// get level num
	peezyLogger.getNum = function(level) {
		return _.where(this.levels, { "label": level })[0].num;
	}

	// get level label
	peezyLogger.getLabel = function(level) {
		return _.where(this.levels, { "num": level })[0].label;
	}

	// get level color
	peezyLogger.getColor = function(level) {
		return _.where(this.levels, { "num": level })[0].color;
	}
			
	// generic log method
	peezyLogger.log = function(level, msg, detail, newline) {
	
		// if only 3 args
		if (detail === true) {
			detail = false;
			newline = true;
		}
		
		if (!msg) msg = "hello world";
		
		if (this.isLevel(level)) {
		
			var label = this.getLabel(level);
			
			console.log(chalk[this.getColor(level)](msg));
		
			if (detail) peezyLogger.log(7, detail);
		
			if (newline) console.log("");
			
		}
	
	}
	
	// named methods
	peezyLogger.fatal = function(msg, detail, newline) {
		this.log(1, msg, detail, newline);
	}

	peezyLogger.error = function(msg, detail, newline) {
		this.log(2, msg, detail, newline);
	}

	peezyLogger.warn = function(msg, detail, newline) {
		this.log(3, msg, detail, newline);
	}

	peezyLogger.notice = function(msg, detail, newline) {
		this.log(4, msg, detail, newline);
	}

	peezyLogger.status = function(msg, detail, newline) {
		this.log(5, msg, detail, newline);
	}
	
	peezyLogger.info = function(msg, detail, newline) {
		this.log(6, msg, detail, newline);
	}
	
	peezyLogger.detail = function(msg, detail, newline) {
		this.log(7, msg, detail, newline);
	}

	peezyLogger.debug = function(msg, detail, newline) {
		this.log(8, msg, detail, newline);
	}							
	
	peezyLogger.trace = function(msg, detail, newline) {
		this.log(9, msg, detail, newline);
	}
	
	// inspect array
	peezyLogger.inspect = function(arr, msg) {
	
		peezyLogger.info(_.size(arr) + " " + msg, _.keys(arr), true);
		peezyLogger.debug(arr, true);
			
	}

// helpers

	peezyLogger.isLevel = function (level) {
		// if msg numeric level is less than or equal to the visibility level
		if (_.isNumber(level) && level <= peezyLogger.visible) return true;
		else {
			// else if string
			if (typeof level == "string") {
				var arr = _.where(peezyLogger.levels, { "label": level });
				if (arr[0] && arr[0].num && arr[0].num <= peezyLogger.visible) return true; 
			}
		}
		// else false
		return false;	
	}

// exports

	module.exports = peezyLogger;