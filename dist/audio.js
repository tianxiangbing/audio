/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-03-16
 * Time: 20:27:54
 * Contact: 55342775@qq.com
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

;
(function (root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		//umd
		module.exports = factory();
	} else {
		root.Audio = factory(window.Zepto || window.jQuery || $);
	}
})(window, function ($) {
	$.fn.Audio = function (settings) {
		var list = [];
		$(this).each(function () {
			var audio = new Audio();
			var options = $.extend({
				target: $(this)
			}, settings);
			audio.init(options);
			list.push(audio);
		});
		return list;
	};

	var Audio = (function () {
		function Audio() {
			_classCallCheck(this, Audio);
		}

		_createClass(Audio, [{
			key: 'contructor',
			value: function contructor() {}
		}, {
			key: 'init',
			value: function init(options) {
				var rnd = Math.random().toString().replace('.', '');
				this.id = 'audio_' + rnd;
				this.settings = {};
				this.controller = null;
				var _this = this;
				this.settings = $.extend(this.settings, options);
				this.audio = $(this.settings.target).get(0);
				this.createDom();
				this.settings.target.on('canplay', function () {
					_this.duration = _this.audio.duration;
					_this.durationContent.html(Math.floor(_this.duration) + 's');
				});
				this.bindEvent();
			}
		}, {
			key: 'createDom',
			value: function createDom() {
				var html = '<div id="' + this.id + '" class="ui-audio"><i></i></div>';
				this.settings.target.hide().after(html);
				this.controller = $('#' + this.id);
				this.durationContent = $('<div class="ui-duration"></div>');
				this.controller.append(this.durationContent);
			}
		}, {
			key: 'bindEvent',
			value: function bindEvent() {
				var _this = this;
				this.controller.on('click', function () {
					_this.play();
				});
				$(this.audio).on('ended', function () {
					return _this.stop();
				});
			}
		}, {
			key: 'play',
			value: function play() {
				if (this.audio.paused) {
					this.audio.play();
					this.controller.addClass('play');
				} else {
					this.audio.pause();
					this.controller.removeClass('play');
				}
				this.settings.playCallback && this.settings.playCallback.call(this, this.audio, this.audio.paused, this.durationContent);
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.controller.removeClass('play');
				this.settings.stopCallback && this.settings.stopCallback.call(this, this.audio, this.audio.paused, this.durationContent);
			}
		}]);

		return Audio;
	})();

	return Audio;
});