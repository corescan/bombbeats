(this.webpackJsonpbombbeats=this.webpackJsonpbombbeats||[]).push([[0],{24:function(e,t,n){e.exports=n.p+"static/media/RT_Ian_Chang_Kick_1_Drums_Ian_Chang_one_shot.e1d4e232.wav"},25:function(e,t,n){e.exports=n.p+"static/media/RT_Ian_Chang_Tea_Towel_Snare_1_Medium_1_Drums_Ian_Chang_one_shot.bb5dc9f1.wav"},26:function(e,t,n){e.exports=n.p+"static/media/Hat_XL_13.faea9d0d.wav"},29:function(e,t,n){e.exports=n(56)},42:function(e,t,n){},43:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(13),c=n.n(s),r=n(11),o=n(14),u=n(23),l=n(10),h={TOGGLE_EFFECT:"TOGGLE_EFFECT"};var d=l.default.fromJS({compressor:{enabled:!1},distortion:{enabled:!1},highpass:{enabled:!0},lowpass:{enabled:!1}});var m=n(24),f=n.n(m),b=n(25),p=n.n(b),v=n(26),k=n.n(v),y=[{id:0,name:"kick",src:f.a,params:{gain:.4}},{id:1,name:"snare",src:p.a,params:{gain:.6}},{id:2,name:"hat",src:k.a,params:{gain:.2}}];var g=[{key:"NEW",name:"NEW",bpm:120,subdivision:16,sequence:{kick:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],snare:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],hat:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},{key:"FOUR_ON_THE_FLOOR",name:"4 On The Floor",bpm:112,subdivision:16,sequence:{kick:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hat:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]}},{bpm:"116",key:"HIP_HOP",name:"Hip Hop",sequence:{hat:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],kick:[1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]},subdivision:16},{bpm:"108",key:"WONKY_ROCK",name:"Wonky Rock",sequence:{hat:[1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0],kick:[1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0],snare:[0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0]},subdivision:16},{key:"THREE_AGAINST_FOUR",bpm:"140",name:"3 Against 4",sequence:{hat:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],kick:[1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]},subdivision:16},{bpm:"220",key:"THRASH",name:"Thrash",sequence:{hat:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],kick:[1,0,1,1,0,0,1,0,1,0,1,0,0,0,1,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]},subdivision:16},{key:"EXCUSE_ME",bpm:"300",name:"EXCUSE ME",sequence:{hat:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],kick:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],snare:[0,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1]},subdivision:16}];var C=Object(u.combineReducers)({effects:function(e,t){if("undefined"===typeof e)return d;switch(t.type){case h.TOGGLE_EFFECT:return function(e,t){var n=[t,"enabled"],a=e.getIn(n);return e.setIn(n,!a)}(e,t.effectName);default:return e}},sounds:function(e,t){return"undefined"===typeof e?y:e},beats:function(e,t){return"undefined"===typeof e?g:e}}),E=Object(o.b)(C),O=(n(42),n(3)),T=n(4),S=n(6),j=n(5),P=n(1),M=n(7),q=(n(43),n(2)),N=n.n(q),w=n(27),_=n(18),B=n.n(_);function L(e,t){this.context=e,this.fileList=t,this.bufferList=[],this.loadCount=0}L.prototype.loadBuffer=function(e,t){var n=this;return new B.a((function(a,i){var s=new XMLHttpRequest;s.open("GET",e.src,!0),s.responseType="arraybuffer";var c=n;s.onload=function(){c.context.decodeAudioData(s.response,(function(n){n||i("error decoding file data: "+e.src),c.loadCount++,c.bufferList[t]={name:e.name,buffer:n},a({name:e.name,buffer:n})}),(function(e){i(e)}))},s.onerror=function(e){i(e)},s.send()}))},L.prototype.load=function(){for(var e=[],t=0;t<this.fileList.length;++t)e.push(this.loadBuffer(this.fileList[t],t));return B.a.all(e)};var A=L;var x=750,I=500,F=function(e){for(var t="number"===typeof e?e:50,n=new Float32Array(44100),a=Math.PI/180,i=0;i<44100;i++){var s=2*i/44100-1;n[i]=(3+t)*s*20*a/(Math.PI+t*Math.abs(s))}return n}(33),K={SINE:"sine",TRIANGLE:"triangle",SAW:"sawtooth",SQUARE:"square"},R=["compressor","distortion","highpass","lowpass"];function D(e){var t=this;e.forEach((function(e){t.trackBuffers[e.name]=e.buffer}))}function G(e,t){var n=e.createBiquadFilter();return n.type=t.type,t.frequency&&n.frequency.setValueAtTime(t.frequency,e.currentTime),n}var W=new(function(){function e(){Object(O.a)(this,e),this.audioCtx=new AudioContext,this.trackBuffers=[],this.masterChannel=[],this.osc=this.audioCtx.createOscillator(),this.osc.type=K.SAW,this.oscGainNode=this.audioCtx.createGain(),this.oscGainNode.gain.setValueAtTime(.05,this.audioCtx.currentTime),this.oscFilter=this.audioCtx.createBiquadFilter(),this.oscFilter.type="lowshelf",this.oscFilter.gain.setValueAtTime(20,this.audioCtx.currentTime),this.scheduleAudio=this.scheduleAudio.bind(this),this.oscillateOn=this.oscillateOn.bind(this)}return Object(T.a)(e,[{key:"loadAudio",value:function(e){var t=this;new A(this.audioCtx,e).load().then((function(e){D.call(t,e)})).catch((function(e){console.error(e)}))}},{key:"scheduleAudio",value:function(e,t,n,a){var i=this.audioCtx,s=i.createBufferSource();s.buffer=this.trackBuffers[e],function(e,t,n,a){if(n&&n.gain){var i=t.createGain();i.gain.setValueAtTime(n.gain,t.currentTime),e.connect(i),e=i}if(a&&a.getIn(["compressor","enabled"])){var s=function(e){var t=e.createDynamicsCompressor();return t.threshold.setValueAtTime(-50,e.currentTime),t.knee.setValueAtTime(40,e.currentTime),t.ratio.setValueAtTime(12,e.currentTime),t.attack.setValueAtTime(.25,e.currentTime),t.release.setValueAtTime(.67,e.currentTime),t}(t);e.connect(s),e=s}if(a&&a.getIn(["distortion","enabled"])){var c=function(e){var t=e.createWaveShaper();return t.curve=F,t.oversample="4x",t}(t);e.connect(c),e=c}if(a&&a.getIn(["highpass","enabled"])){var r=G(t,{type:"highpass",frequency:x});e.connect(r),e=r}if(a&&a.getIn(["lowpass","enabled"])){var o=G(t,{type:"lowpass",frequency:I});e.connect(o),e=o}return e}(s,i,n,a).connect(i.destination),s.start(t)}},{key:"oscillateOn",value:function(e,t){this.osc.type=e,this.osc.frequency.setValueAtTime(t,this.audioCtx.currentTime),this.osc.connect(this.oscGainNode),this.oscGainNode.connect(this.oscFilter),this.oscFilter.connect(this.audioCtx.destination),this.osc.start()}},{key:"oscillateOff",value:function(){try{this.osc.stop()}catch(e){console.error(e)}finally{this.osc=this.audioCtx.createOscillator()}}},{key:"setOscPitch",value:function(e){this.osc.frequency.setValueAtTime(e,this.audioCtx.currentTime)}},{key:"setOscWaveform",value:function(e){this.osc.type=e}},{key:"getCurrentTime",value:function(){return this.audioCtx.currentTime}}]),e}());function U(e,t){return 6e4/e*(4/t)}var H=new(function(e){function t(){var e;return Object(O.a)(this,t),(e=Object(S.a)(this,Object(j.a)(t).call(this))).subdivision=void 0,e.bpm=void 0,e.startTime=0,e.expectedTime=0,e.actualTime=0,e.isRunning=!1,e.timeoutId=null,e.interval=U(e.bpm,e.subdivision),e.currentStep=0,e.start=e.start.bind(Object(P.a)(e)),e.stop=e.stop.bind(Object(P.a)(e)),e.step=e.step.bind(Object(P.a)(e)),e.setBPM=e.setBPM.bind(Object(P.a)(e)),e.setParams=e.setParams.bind(Object(P.a)(e)),e}return Object(M.a)(t,e),Object(T.a)(t,[{key:"start",value:function(){this.isRunning||(this.startTime=W.getCurrentTime(),this.expectedTime=0,this.actualTime=0,this.currentStep=0,this.isRunning=!0,this.emit("start"),this.step())}},{key:"stop",value:function(){this.isRunning=!1,clearTimeout(this.timeoutId),this.emit("stop")}},{key:"step",value:function(){this.actualTime=W.getCurrentTime()-this.startTime;var e=this.actualTime-this.expectedTime;this.timeoutId=setTimeout(this.step,this.interval-e),this.emit("step",this.currentStep),this.currentStep++,this.expectedTime+=this.interval/1e3}},{key:"setBPM",value:function(e){this.bpm=e,this.interval=U(e,this.subdivision)}},{key:"setParams",value:function(e){this.subdivision=e.subdivision,this.setBPM(e.bpm)}}]),t}(w.EventEmitter));n(46),n(47);var V=function(e){return i.a.createElement("li",{className:N()("TouchPad-container",{active:e.active,disabled:e.disabled}),onClick:e.onClick})};function X(e){return i.a.createElement("ul",{className:"Track-container"},function(e){for(var t=e.length,n=[],a=0;a<t;a++)n.push(i.a.createElement(V,{key:"touch-pad-".concat(a),active:e.sequence[a],disabled:!e.enabled,onClick:e.onClickTouchPad.bind(null,e.trackname,a)}));return n}(e))}n(48);function J(e){var t=e.bpm;return i.a.createElement("ul",{className:N()("Controls-container",{active:e.active}),onClick:e.onClick},i.a.createElement("li",{className:N()("play","playback")},i.a.createElement("button",{className:N()("play",{active:e.isPlaying}),onClick:H.start},"play_arrow"),i.a.createElement("button",{className:N()("stop",{active:e.isPlaying}),onClick:H.stop},"stop")),i.a.createElement("li",{className:"bpm-slider-container"},i.a.createElement("input",{className:"bpm-slider",type:"range",value:t,min:10,max:300,onChange:e.onChangeBPM})),i.a.createElement("li",{className:"bpm-readout"},i.a.createElement("div",null,t)))}n(49);function Y(e){return i.a.createElement("button",{className:N()("SquareBacklitButton--button",{enabled:e.enabled}),onClick:e.onClick},e.label)}n(50);function Q(e){return i.a.createElement("div",{className:"Effects-container"},(t=e.settings,R.map((function(n){return i.a.createElement(Y,{key:n,label:n,enabled:t.getIn([n,"enabled"]),onClick:function(){e.onClick(n)}})}))));var t}n(51);function z(e){var t=e.length;return i.a.createElement("ul",{className:"RunningLights-container"},function(e,t){for(var n=[],a=0;a<e;a++)n.push(i.a.createElement("div",{key:"running-light-".concat(a),className:N()("RunningLights-light",{active:t.active&&t.currentStep===a})}));return n}(t,e))}n(52);var Z=function(e){var t={};return e.forEach((function(e){t[e.name]=!0})),t},$=function(e){H.setParams({bpm:e.beat.bpm,subdivision:e.beat.subdivision})},ee=function(e){return{beatKey:e.beat.key,bpm:e.beat.bpm,enabledTracks:Z(e.sounds),sequence:e.beat.sequence}},te=function(e){function t(e){var n;Object(O.a)(this,t);return(n=Object(S.a)(this,Object(j.a)(t).call(this,e))).state=Object.assign({},{isPlaying:!1,currentStep:0},ee(e)),n.handleClickTouchPad=n.handleClickTouchPad.bind(Object(P.a)(n)),n.handleClickTrackname=n.handleClickTrackname.bind(Object(P.a)(n)),n.handleClickEffects=n.handleClickEffects.bind(Object(P.a)(n)),n.handleClockStep=n.handleClockStep.bind(Object(P.a)(n)),n.handleClockStart=n.handleClockStart.bind(Object(P.a)(n)),n.handleClockStop=n.handleClockStop.bind(Object(P.a)(n)),n.handleChangeBPM=n.handleChangeBPM.bind(Object(P.a)(n)),n.scheduleSequenceStep=n.scheduleSequenceStep.bind(Object(P.a)(n)),n.handleKeyDown=n.handleKeyDown.bind(Object(P.a)(n)),n.togglePlayback=n.togglePlayback.bind(Object(P.a)(n)),n}return Object(M.a)(t,e),Object(T.a)(t,[{key:"componentDidMount",value:function(){H.addListener("start",this.handleClockStart),H.addListener("stop",this.handleClockStop),H.addListener("step",this.handleClockStep),document.addEventListener("keydown",this.handleKeyDown),W.loadAudio(this.props.sounds),$(this.props)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){H.stop(),H.removeListener("start",this.handleClockStart),H.removeListener("stop",this.handleClockStop),H.removeListener("step",this.handleClockStep)}},{key:"handleKeyDown",value:function(e){e.preventDefault();var t=e.which||e.key;32!==t&&"Space"!==t||this.togglePlayback()}},{key:"togglePlayback",value:function(){this.state.isPlaying?H.stop():H.start()}},{key:"handleClockStart",value:function(){this.setState({isPlaying:!0}),console.log({key:this.state.beatKey,bpm:this.props.beat.bpm,subdivision:this.props.beat.subdivision,sequence:this.state.sequence})}},{key:"handleClockStop",value:function(){this.setState({isPlaying:!1,currentStep:0})}},{key:"handleClockStep",value:function(e){var t=e%16;this.scheduleSequenceStep(t,W.getCurrentTime()),this.setState({currentStep:t})}},{key:"handleChangeBPM",value:function(e){var t=e.target.value;this.setState({bpm:t}),H.setBPM(t)}},{key:"handleClickTrackname",value:function(e){var t=Object.assign({},this.state.enabledTracks);t[e]=!t[e],this.setState({enabledTracks:t})}},{key:"handleClickTouchPad",value:function(e,t){var n=Object.assign({},this.state.sequence);n[e][t]=!n[e][t],this.setState({sequence:n})}},{key:"handleClickEffects",value:function(e){this.props.dispatch(function(e){return{type:h.TOGGLE_EFFECT,effectName:e}}(e))}},{key:"scheduleSequenceStep",value:function(e,t){var n=this;this.props.sounds.forEach((function(a){if(n.state.enabledTracks[a.name]&&n.state.sequence[a.name][e]){var i=Object.assign({},a.params);W.scheduleAudio(a.name,t,i,n.props.effects)}}))}},{key:"renderTracknames",value:function(){var e=this;return this.props.sounds.map((function(t){return i.a.createElement("li",{key:t.id,className:"Sequencer-track-label",onClick:e.handleClickTrackname.bind(e,t.name)},i.a.createElement("button",{className:N()("Sequencer-track-indicator",{active:e.state.enabledTracks[t.name]})}),i.a.createElement("div",{className:"Sequencer-track-name"},t.name))}))}},{key:"renderTracks",value:function(e){var t=this;return this.props.sounds.map((function(n){return i.a.createElement(X,{key:n.id,enabled:t.state.enabledTracks[n.name],trackname:n.name,sequence:e[n.name],length:16,onClickTouchPad:t.handleClickTouchPad})}))}},{key:"render",value:function(){var e=this.state,t=e.isPlaying,n=e.currentStep,a=e.sequence,s=e.bpm,c=this.props.effects;return i.a.createElement("div",{className:"Sequencer"},i.a.createElement(J,{bpm:s,onChangeBPM:this.handleChangeBPM,isPlaying:t}),i.a.createElement(Q,{settings:c,onClick:this.handleClickEffects}),i.a.createElement(z,{active:t,length:16,currentStep:n}),i.a.createElement("div",{className:"Sequencer-sequencer"},i.a.createElement("ul",{className:"Sequencer-tracklist"},this.renderTracknames()),i.a.createElement("div",{className:"Sequencer-track-container"},this.renderTracks(a))))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.beat.key!==t.beatKey&&(t.isPlaying&&H.stop(),$(e),t=ee(e)),t}}]),t}(a.Component),ne=Object(r.b)((function(e){return{sounds:e.get("sounds"),effects:e.get("effects")}}))(te),ae=n(28),ie=(n(53),function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(S.a)(this,Object(j.a)(t).call(this,e))).state={keyOn:!1,mouseOn:!1},n.handleMouseEnter=n.handleMouseEnter.bind(Object(P.a)(n)),n.handleMouseLeave=n.handleMouseLeave.bind(Object(P.a)(n)),n.handleMouseMove=n.handleMouseMove.bind(Object(P.a)(n)),n.handleKeyDown=n.handleKeyDown.bind(Object(P.a)(n)),n.handleKeyUp=n.handleKeyUp.bind(Object(P.a)(n)),n.isEnabled=n.isEnabled.bind(Object(P.a)(n)),n.handleChangeState=n.handleChangeState.bind(Object(P.a)(n)),n}return Object(M.a)(t,e),Object(T.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}},{key:"handleChangeState",value:function(e,t){var n=this;this.setState(Object(ae.a)({},e,t),(function(){n.props.onChange(n.isEnabled())}))}},{key:"handleKeyDown",value:function(e){var t=e.which||e.key;16!==t&&"Shift"!==t||this.handleChangeState("keyOn",!0)}},{key:"handleKeyUp",value:function(e){var t=e.which||e.key;16!==t&&"Shift"!==t||this.handleChangeState("keyOn",!1)}},{key:"handleMouseEnter",value:function(){this.handleChangeState("mouseOn",!0)}},{key:"handleMouseLeave",value:function(){this.handleChangeState("mouseOn",!1)}},{key:"handleMouseMove",value:function(e){var t=e.pageX,n=e.pageY,a=e.target.getBoundingClientRect(),i=t-a.left,s=n-a.top;this.props.onMouseMove({x:i,y:s})}},{key:"isEnabled",value:function(){return this.state.keyOn&&this.state.mouseOn}},{key:"render",value:function(){var e=this.isEnabled();return i.a.createElement("div",{className:N()("TrackPad--container",{active:e}),onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseMove:this.handleMouseMove})}}]),t}(a.Component));n(54),n(55);function se(e){return i.a.createElement("div",{className:"WaveformSelector--container"},(t=e.selected,Object.keys(K).map((function(n){var a=K[n];return i.a.createElement(Y,{key:n,label:a,enabled:t===a,onClick:function(){e.onSelect(a)}})}))));var t}var ce=function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(S.a)(this,Object(j.a)(t).call(this,e))).state={trackPadEnabled:!1,osc:{type:K.TRIANGLE,pitch:440}},n.handleTrackPadMove=n.handleTrackPadMove.bind(Object(P.a)(n)),n.handleTrackPadChange=n.handleTrackPadChange.bind(Object(P.a)(n)),n.handleWaveformSelected=n.handleWaveformSelected.bind(Object(P.a)(n)),n}return Object(M.a)(t,e),Object(T.a)(t,[{key:"handleTrackPadMove",value:function(e){var t=1013.799*(e.x/592)+32.703;W.setOscPitch(t),this.setState((function(e){return{osc:{type:e.osc.type,pitch:t}}}))}},{key:"handleTrackPadChange",value:function(e){if(e){var t=this.state.osc,n=t.type,a=t.pitch;W.oscillateOn(n,a)}else this.state.trackPadEnabled&&W.oscillateOff();this.setState({trackPadEnabled:e})}},{key:"handleWaveformSelected",value:function(e){W.setOscWaveform(e),this.setState((function(t){return{osc:{type:e,pitch:t.osc.pitch}}}))}},{key:"render",value:function(){var e=this.state.osc.type;return i.a.createElement("div",{className:"Synth--container"},i.a.createElement("label",{className:"Synth--label"},"Hold Shift \u2193"),i.a.createElement(ie,{onMouseMove:this.handleTrackPadMove,onChange:this.handleTrackPadChange}),i.a.createElement(se,{onSelect:this.handleWaveformSelected,selected:e}))}}]),t}(a.Component),re=function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(S.a)(this,Object(j.a)(t).call(this,e))).state={selectedBeat:void 0},n.handleBeatSelected=n.handleBeatSelected.bind(Object(P.a)(n)),n}return Object(M.a)(t,e),Object(T.a)(t,[{key:"handleBeatSelected",value:function(e){this.setState({selectedBeat:e.target.value})}},{key:"componentDidMount",value:function(){var e=this.props.beats.map((function(e){return e.key}));this.setState({selectedBeat:e.length>0?e[0]:void 0})}},{key:"renderBeatSelect",value:function(){var e=this.props.beats.map((function(e){return i.a.createElement("option",{key:e.key,value:e.key},e.name)}));return i.a.createElement("select",{value:this.state.selectedBeat,onChange:this.handleBeatSelected,className:"App--beat-select"},e)}},{key:"render",value:function(){var e=this,t=this.props.beats.find((function(t){return t.key===e.state.selectedBeat}));return i.a.createElement("div",{className:"App"},this.renderBeatSelect(),t?i.a.createElement(ne,{beat:t}):null,i.a.createElement(ce,null))}}]),t}(a.Component);var oe=Object(r.b)((function(e){return{beats:e.get("beats")}}))(re);c.a.render(i.a.createElement(r.a,{store:E},i.a.createElement(oe,null)),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.ed81830a.chunk.js.map