import{B as i,d as t,I as e,b as n,x as o,f as s,i as a,aL as c,aM as l,g as r,h,y as p,_ as u,e as d,c as g,a as f}from"./backend-ai-webui-661d9e43.js";let b=class extends i{constructor(){super(...arguments),this.webUIShell=Object(),this.clientConfig=Object(),this.client=Object(),this.notification=Object()}static get styles(){return[t,e,n,o,s,a`
      `]}firstUpdated(){this.notification=globalThis.lablupNotification}async launch(i){await this._initClient(i);await this._token_login()&&await this._createEduSession()}detectIE(){try{return!!!!document.documentMode||(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("WOW")>0||navigator.userAgent.indexOf(".NET")>0)}catch(i){const t=i.toString();return console.log(t),!1}}async _initClient(i){this.notification=globalThis.lablupNotification;const t=document.querySelector("#webui-shell");if(""===i){const t=localStorage.getItem("backendaiwebui.api_endpoint");null!=t&&(i=t.replace(/^"+|"+$/g,""))}i=i.trim(),this.clientConfig=new c("","",i,"SESSION"),globalThis.backendaiclient=new l(this.clientConfig,"Backend.AI Web UI.");await t._parseConfig("../../config.toml"),globalThis.backendaiclient._config._proxyURL=t.config.wsproxy.proxyURL,await globalThis.backendaiclient.get_manager_version(),globalThis.backendaiclient.ready=!0}async _token_login(){const i=window.location.search,t=new URLSearchParams(i).get("sToken")||null;null!==t&&(document.cookie=`sToken=${t}; expires=Session; path=/`);try{if(await globalThis.backendaiclient.check_login())console.log("already logged-in session");else{console.log("logging with (cookie) token...");if(!await globalThis.backendaiclient.token_login())return this.notification.text=r("eduapi.CannotAuthorizeSessionByToken"),this.notification.show(!0),!1}return!0}catch(i){return this.notification.text=r("eduapi.CannotAuthorizeSessionByToken"),this.notification.show(!0,i),!1}}generateSessionId(){let i="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let e=0;e<8;e++)i+=t.charAt(Math.floor(Math.random()*t.length));return i+"-session"}async _createEduSession(){this.appLauncher.indicator=await globalThis.lablupIndicator.start();const i=["session_id","name","access_key","status","status_info","service_ports","mounts"];let t;t=globalThis.backendaiclient.supports("avoid-hol-blocking")?["RUNNING","RESTARTING","TERMINATING","PENDING","SCHEDULED","PREPARING","PULLING"].join(","):["RUNNING","RESTARTING","TERMINATING","PENDING","PREPARING","PULLING"].join(",");const e=globalThis.backendaiclient._config.accessKey;let n;try{this.appLauncher.indicator.set(20,r("eduapi.QueryingExisitingComputeSession")),n=await globalThis.backendaiclient.computeSession.list(i,t,e,30,0)}catch(i){return console.error(i),void(i&&i.message?(i.description?this.notification.text=h.relieve(i.description):this.notification.text=h.relieve(i.message),this.notification.detail=i.message,this.notification.show(!0,i)):i&&i.title&&(this.notification.text=h.relieve(i.title),this.notification.show(!0,i)))}const o=window.location.search;let s,a=new URLSearchParams(o).get("app")||"jupyter",c=!0;if(n.compute_session_list.total_count>0){console.log("Reusing an existing session ...");const i=n.compute_session_list.items[0].status;if("RUNNING"!==i)return this.notification.text=r("eduapi.sessionStatusIs")+` ${i}. `+r("eduapi.PleaseReload"),void this.notification.show(!0);let t=null;for(let i=0;i<n.compute_session_list.items.length;i++){const e=n.compute_session_list.items[i];if(JSON.parse(e.service_ports||"{}").map((i=>i.name)).includes(a)){t=e;break}}t?(c=!1,s="session_id"in t?t.session_id:null,this.appLauncher.indicator.set(50,r("eduapi.FoundExistingComputeSession"))):c=!0,s=null!==t&&"session_id"in t?t.session_id:null}if(c){let i;console.log("Creating a new session ..."),this.appLauncher.indicator.set(40,r("eduapi.FindingSessionTemplate"));try{i=await globalThis.backendaiclient.sessionTemplate.list(!1)}catch(i){return console.error(i),void(i&&i.message?(i.description?this.notification.text=h.relieve(i.description):this.notification.text=h.relieve(i.message),this.notification.detail=i.message,this.notification.show(!0,i)):i&&i.title&&(this.notification.text=h.relieve(i.title),this.notification.show(!0,i)))}if(i=i.filter((i=>i.name===a)),i.length<1)return this.notification.text=r("eduapi.NoSessionTemplate"),void this.notification.show(!0);const t=i[0].id;try{const i=await globalThis.backendaiclient.eduApp.get_mount_folders(),e=i?{mounts:i}:{};let n;try{this.appLauncher.indicator.set(60,r("eduapi.CreatingComputeSession")),n=await globalThis.backendaiclient.createSessionFromTemplate(t,null,null,e,2e4)}catch(i){return console.error(i),void(i&&i.message?(i.description?this.notification.text=h.relieve(i.description):this.notification.text=h.relieve(i.message),this.notification.detail=i.message,this.notification.show(!0,i)):i&&i.title&&(this.notification.text=h.relieve(i.title),this.notification.show(!0,i)))}s=n.sessionId}catch(i){console.error(i),i&&i.message?("statusCode"in i&&408===i.statusCode?this.notification.text=r("eduapi.SessionStillPreparing"):i.description?this.notification.text=h.relieve(i.description):this.notification.text=h.relieve(i.message),this.notification.detail=i.message,this.notification.show(!0,i)):i&&i.title&&(this.notification.text=h.relieve(i.title),this.notification.show(!0,i))}}this.appLauncher.indicator.set(100,r("eduapi.ComputeSessionPrepared")),s&&(a.startsWith("jupyter")&&!this.detectIE()&&(a="jupyterlab"),this._openServiceApp(s,a))}async _openServiceApp(i,t){this.appLauncher.indicator=await globalThis.lablupIndicator.start(),console.log(`launching ${t} from session ${i} ...`),this.appLauncher._open_wsproxy(i,t,null,null).then((async i=>{i.url&&(await this.appLauncher._connectToProxyWorker(i.url,""),this.appLauncher.indicator.set(100,r("session.applauncher.Prepared")),setTimeout((()=>{globalThis.open(i.url,"_self")})))}))}render(){return p`
      <backend-ai-app-launcher id="app-launcher"></backend-ai-app-launcher>
    `}};u([d({type:Object})],b.prototype,"webUIShell",void 0),u([d({type:Object})],b.prototype,"clientConfig",void 0),u([d({type:Object})],b.prototype,"client",void 0),u([d({type:Object})],b.prototype,"notification",void 0),u([g("#app-launcher")],b.prototype,"appLauncher",void 0),b=u([f("backend-ai-edu-applauncher")],b);var m=b;export{m as default};
