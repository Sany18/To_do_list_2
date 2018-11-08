(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{113:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(19),r=a.n(l),o=a(8),i=a(9),c=a(12),u=a(10),m=a(11),d={API:"",ENV:"test"},h={root:d.API,tasksGet:d.API+"/tasks",taskCreatePost:d.API+"/tasks/",taskShowGet:d.API+"/tasks/",taskUpdatePut:d.API+"/tasks/",taskUpdatePatch:d.API+"/tasks/",taskDelete:d.API+"/tasks/",deleteSelected:d.API+"/task/delete_selected/",statusSwitchGet:d.API+"/task/status_switch/",oauthTokenPOST:d.API+"/oauth/token/",userCreatePOST:d.API+"/user/create/"},g=a(18),p=a(14),k=a(13),f=a(115),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).emptyTaskKey=function(){return!isNaN(parseFloat(a.props.taskKey))&&isFinite(a.props.taskKey)},a.getDateNow=function(){var e=new Date;return t(e.getFullYear())+"-"+t(e.getMonth())+"-"+t(e.getDate());function t(e){return null===e?"x":e<10?"0"+e:e}},a.state={isLoading:!1,error:null,tasks:[],taskKey:a.props.taskKey,value:{id:"",title:"",theme:"",priority:0,due_date:""}},a.handleChange=a.handleChange.bind(Object(k.a)(Object(k.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(this.setState({value:Object(p.a)({},this.state.value,{due_date:this.getDateNow()})}),this.emptyTaskKey()){var t="access_token="+localStorage.getItem("access_token");fetch(h.tasksGet+"?"+t).then(function(e){return e.json()}).then(function(t){return e.setState({tasks:t,isLoading:!0})}).then(function(t){var a=e.state.tasks[e.state.taskKey];e.setState({value:Object(p.a)({},e.state.value,{title:a.title})}),e.setState({value:Object(p.a)({},e.state.value,{theme:a.theme})}),e.setState({value:Object(p.a)({},e.state.value,{due_date:a.due_date})}),e.setState({value:Object(p.a)({},e.state.value,{id:a.id})})}).catch(function(t){return e.setState({error:t})})}}},{key:"handleChange",value:function(e){var t=e.target.value;this.setState({value:Object(p.a)({},this.state.value,Object(g.a)({},e.target.name,t))})}},{key:"render",value:function(){var e=this.state.tasks[this.state.taskKey]||this.state.value;return this.state.isLoading||!this.emptyTaskKey()?s.a.createElement("div",null,s.a.createElement("label",null,"Theme"),s.a.createElement("input",{defaultValue:e.title,name:"title",onChange:this.handleChange}),s.a.createElement("label",null,"Task"),s.a.createElement("textarea",{defaultValue:e.theme,name:"theme",onChange:this.handleChange}),s.a.createElement("label",null,"Due date"),s.a.createElement("input",{type:"date",defaultValue:e.due_date||this.getDateNow(),min:this.getDateNow(),name:"due_date",onChange:this.handleChange}),s.a.createElement(f.a,null,e.id?s.a.createElement(T,{type:"deleteTask",params:e.id}):"",s.a.createElement(T,{type:"closeTask"}),+this.state.value.id?s.a.createElement(T,{type:"updateTask",params:this.state.value}):s.a.createElement(T,{type:"saveTask",params:this.state.value}))):this.state.error?(document.getElementById("notice").innerHTML=this.state.error.toString(),null):null}}]),t}(n.Component),v=a(114),y=a(16),T=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={isLoading:!1,error:null,resp:[],type:null},a.ajaxTo=function(e,t,n){var s={method:n,headers:{"Content-Type":"application/json"},body:a.getTokensBody(t)};"test"===d.ENV&&console.log("request: ",s),"test"===d.ENV&&console.log("to: ",e),fetch(e,s).then(function(e){return e.json()}).then(function(e){e.access_token&&localStorage.setItem("access_token",e.access_token),e.error&&y.NotificationManager.info(e.error,"",3e3),"test"===d.ENV&&console.log("response: ",e),a.refreshTasks()}).catch(function(e){return a.setState({error:e})})},a.getTokensBody=function(e){return"password"===e.grant_type?JSON.stringify(e):localStorage.getItem("access_token")?(e.access_token=localStorage.getItem("access_token"),JSON.stringify(e)):JSON.stringify({access_token:localStorage.getItem("access_token")})},a.openNewTaskModal=function(){a.openTaskInModal(!1)},a.openTaskInModal=function(e){a.hideModal(),document.getElementById("modal").hidden=!1;var t=document.createElement("div");document.getElementById("modal").appendChild(t),r.a.render(s.a.createElement(E,{taskKey:e}),t)},a.hideModal=function(){if(!document.getElementById("modal").hidden){var e=document.getElementById("modal");e.firstChild&&r.a.unmountComponentAtNode(e.firstChild),e.innerHTML="",e.hidden=!0}},a.saveTask=function(e){a.ajaxTo(h.taskCreatePost,{task:e},"POST"),a.hideModal()},a.updateTask=function(e){a.ajaxTo(h.taskUpdatePut+e.id,{task:e},"PUT"),a.hideModal()},a.login=function(e){e.grant_type="password",a.ajaxTo(h.oauthTokenPOST,e,"POST")},a.refreshTasks=function(){localStorage.setItem("taps",+localStorage.getItem("taps")+1)},a.deleteTask=function(e){window.confirm("Delete this task?")&&(a.ajaxTo(h.taskDelete+e,{},"DELETE"),a.hideModal())},a.signUp=function(e){e.grant_type="password",a.ajaxTo(h.userCreatePOST,e,"POST")},a.logOut=function(){y.NotificationManager.success("Log out sucesfuly","",3e3),localStorage.removeItem("access_token")},a.deleteTasks=function(e){y.NotificationManager.success(e,"Coming soon",3e3)},a.getButton=function(e,t){switch(e){case"deleteTask":return s.a.createElement(v.a,{onClick:function(){return a.deleteTask(t)}},"Delete task");case"deleteTask2":return s.a.createElement(v.a,{onClick:function(){return a.deleteTask(t)}},"\xd7");case"deleteTasks":return s.a.createElement(v.a,{onClick:function(){return a.deleteTasks(h.deleteSelected+t)}},"Delete selected");case"editTask":return s.a.createElement(v.a,{onClick:function(){return a.openTaskInModal(t)}},"Edit");case"createTask":case"newTask":return s.a.createElement(v.a,{id:"newTask",bsStyle:"default",onClick:function(){return a.openNewTaskModal()}},"New task");case"closeTask":return s.a.createElement(v.a,{id:"closeTask",onClick:function(){return a.hideModal()}},"Close");case"saveTask":return s.a.createElement(v.a,{onClick:function(){return a.saveTask(t)}},"Save");case"updateTask":return s.a.createElement(v.a,{onClick:function(){return a.updateTask(t)}},"Update");case"signUp":return s.a.createElement(v.a,{onClick:function(){return a.signUp(t)}},"Sign up");case"signIn":return s.a.createElement(v.a,{onClick:function(){return a.login(t)}},"Sign in");case"logOut":return s.a.createElement(v.a,{onClick:function(){return a.logOut()}},"Log out");default:return y.NotificationManager.warning("Button is undefined","",3e3),null}},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement(f.a,{bsSize:"small"},this.getButton(this.props.type,this.props.params))}}]),t}(n.Component),b=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={isLoading:!1,error:null,isOpen:!1,tasks:[],taps:0},a.getTasks=function(){var e="access_token="+localStorage.getItem("access_token");fetch(h.tasksGet+"?"+e).then(function(e){return e.json()}).then(function(e){return a.setState({tasks:e,isLoading:!0,error:e.error})}).catch(function(e){return a.setState({error:e})})},a.handleClick=function(){a.setState({isOpen:!a.state.isOpen})},a.cutDate=function(e){return null===e?"free":e.substr(0,10)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(){this.state.taps!==+localStorage.getItem("taps")&&(this.getTasks(),"test"===d.ENV&&console.log("update!"),this.setState({taps:+localStorage.getItem("taps")}))}},{key:"componentDidMount",value:function(){this.getTasks(),this.setState({taps:+localStorage.getItem("taps")})}},{key:"render",value:function(){var e=this;return this.state.isLoading&&!this.state.error&&this.state.tasks.length?s.a.createElement("div",{id:"tasks"},this.state.tasks.map(function(t,a){return s.a.createElement("ul",{className:"list-group task",key:a},s.a.createElement("li",{className:"list-group-item list-group-item-success mr-2"},s.a.createElement("div",{className:"float-left"},s.a.createElement("b",null,t.title),s.a.createElement("br",null),t.theme),s.a.createElement("div",{className:"text-right float-right"},s.a.createElement("div",{className:"d-inline"},"Due date: ",e.cutDate(t.due_date)," "),s.a.createElement(f.a,null,s.a.createElement(T,{type:"editTask",params:a}),s.a.createElement(T,{type:"deleteTask2",params:t.id})))))})):!this.state.isLoading||this.state.tasks.length||this.state.error?this.state.isLoading&&this.state.error?(y.NotificationManager.info(this.state.error.toString(),"",3e3),null):s.a.createElement("div",null,s.a.createElement("p",null,"Wait")):s.a.createElement("div",null,s.a.createElement("p",null,"Creare you first task"))}}]),t}(n.Component),O=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={timer:"",currentTime:""},a.getTime=function(){var e=(new Date).toLocaleTimeString()+" "+(new Date).toLocaleDateString();a.setState({currentTime:e})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=setInterval(this.getTime,1e3);this.setState({timer:e})}},{key:"render",value:function(){return s.a.createElement("h2",{className:"mr-2",id:"clock"},"Now is ",this.state.currentTime)}}]),t}(n.Component),S=a(116),C=a(119),j=a(117),I=a(118),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isLoading:!0,error:null,tasks:[],value:{email:"",password:""}},a.handleChange=a.handleChange.bind(Object(k.a)(Object(k.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){var t=e.target.value;this.setState({value:Object(p.a)({},this.state.value,Object(g.a)({},e.target.name,t))})}},{key:"render",value:function(){return this.state.isLoading?s.a.createElement("div",null,s.a.createElement(S.a,null,s.a.createElement(C.a,{controlId:"formInlineMail2"},s.a.createElement(j.a,null,"Email"),s.a.createElement(I.a,{bsSize:"small",type:"text",name:"email",placeholder:"email",onChange:this.handleChange})),s.a.createElement(C.a,{controlId:"formInlinePass2"},s.a.createElement(j.a,null,"Password"),s.a.createElement(I.a,{bsSize:"small",name:"password",type:"password",placeholder:"password",onChange:this.handleChange})),s.a.createElement(T,{type:"signIn",params:this.state.value}))):this.state.error?(document.getElementById("notice").innerHTML=this.state.error.toString(),null):void 0}}]),t}(n.Component),N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isLoading:!0,error:null,tasks:[],value:{email:"",password:"",confirm_password:"",last_name:"",first_name:""}},a.handleChange=a.handleChange.bind(Object(k.a)(Object(k.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){var t=e.target.value;this.setState({value:Object(p.a)({},this.state.value,Object(g.a)({},e.target.name,t))})}},{key:"render",value:function(){return this.state.isLoading?s.a.createElement("div",null,s.a.createElement(S.a,null,s.a.createElement(C.a,{controlId:"formInlineEmail"},s.a.createElement(j.a,null,"Email"),s.a.createElement(I.a,{bsSize:"small",name:"email",type:"email",placeholder:"email",onChange:this.handleChange})),s.a.createElement(C.a,{controlId:"formInlinePass"},s.a.createElement(j.a,null,"Password"),s.a.createElement(I.a,{bsSize:"small",name:"password",type:"password",placeholder:"password",onChange:this.handleChange})),s.a.createElement(C.a,{controlId:"formInlineConfirmPass"},s.a.createElement(j.a,null,"Confirm password"),s.a.createElement(I.a,{bsSize:"small",name:"confirm_password",type:"password",placeholder:"confirm password",onChange:this.handleChange})),s.a.createElement(C.a,{controlId:"formInlineName"},s.a.createElement(j.a,null,"Your name"),s.a.createElement(I.a,{bsSize:"small",name:"first_name",type:"text",placeholder:"name",onChange:this.handleChange})),s.a.createElement(C.a,{controlId:"formInline2Name"},s.a.createElement(j.a,null,"Last name"),s.a.createElement(I.a,{bsSize:"small",name:"last_name",type:"text",placeholder:"last name",onChange:this.handleChange})),s.a.createElement(T,{type:"signUp",params:this.state.value}))):this.state.error?(document.getElementById("notice").innerHTML=this.state.error.toString(),null):void 0}}]),t}(n.Component),_=(a(49),a(109),a(111),function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={token:localStorage.access_token,timer:""},a.setToken=function(){a.setState({token:localStorage.access_token})},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){document.getElementById("modal")&&(document.getElementById("modal").hidden=!0);var e=setInterval(this.setToken,500);this.setState({timer:e}),"test"===d.ENV&&console.log("You are in a test environment")}},{key:"render",value:function(){return this.state.token?s.a.createElement("div",{className:"mb-2 ml-2"},s.a.createElement(y.NotificationContainer,null),s.a.createElement("h1",{id:"site_name"},"Task list")," ",s.a.createElement(O,null),s.a.createElement("div",{className:"mb-2"},s.a.createElement(f.a,null,s.a.createElement(T,{type:"createTask"}),s.a.createElement(T,{type:"deleteTasks"}),s.a.createElement(T,{type:"logOut"}))),s.a.createElement(b,null)):s.a.createElement("div",null,s.a.createElement(y.NotificationContainer,null),s.a.createElement("h1",{id:"site_name"},"Task list")," ",s.a.createElement(O,null),s.a.createElement("div",{className:"row p-2"},s.a.createElement("div",{className:"col-5"},s.a.createElement("h3",null,"Sing in"),s.a.createElement(w,null)),s.a.createElement("div",{className:"col-2 my-auto display-4 text-center"},"OR"),s.a.createElement("div",{className:"col-5"},s.a.createElement("h3",null,"Registration"),s.a.createElement(N,null))))}}]),t}(n.Component));r.a.render(s.a.createElement(_,null),document.getElementById("root")||document.createElement("div"))},49:function(e,t,a){},56:function(e,t,a){e.exports=a(113)}},[[56,2,1]]]);
//# sourceMappingURL=main.71650b7b.chunk.js.map