webpackJsonp([4],{llnD:function(t,a){},uQS0:function(t,a){},vwUI:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s,i=e("4YfN"),n=e.n(i),o=e("aozt"),l=e.n(o),r=(e("llnD"),e("R4Sj")),c=e("CPkp"),d={data:function(){return{hasRequest:!1,rentList:[],page:1,lastGameId:"",allData:{data:{}},infiniteId:+new Date}},computed:n()({},Object(r.c)(["gameId"])),name:"index",methods:{infiniteHandler:function(t){var a=this;setTimeout(function(){l.a.get("/api/rent.json",{params:{page:a.page,type:a.gameId}}).then(function(e){e=e.data,a.hasRequest||(a.dataTransform(e.data.all),a.hasRequest=!0);var s=a.allData.data;if(e.flag&&s[a.gameId]&&s[a.gameId][a.page-1]){var i=s[a.gameId][a.page-1];a.rentList=a.rentList.concat(i),a.page+=1,t.loaded()}else t.complete()})},200)},dataTransform:function(t){var a={all:t};for(var e in t.forEach(function(t){a[t.gameId]||(a[t.gameId]=[]),a[t.gameId].push(t)}),a){var s=[];a[e].forEach(function(t,a){var e=Math.floor(a/10);s[e]||(s[e]=[]),s[e].push(t)}),a[e]=s}this.allData.data=a},changeType:function(){this.page=1,this.rentList=[],this.infiniteId+=1}},watch:{gameId:function(){this.changeType(),this.lastGameId=this.gameId}},activated:function(){s&&(this.$refs.content.scrollTop=sessionStorage.pos)},components:{myfooter:c.a},beforeRouteLeave:function(t,a,e){"rentDetail"==t.name&&(sessionStorage.pos=this.$refs.content.scrollTop),e()},beforeRouteEnter:function(t,a,e){s="rentDetail"==a.name,e()}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("svg",{staticStyle:{position:"absolute",width:"0px",height:"0px"},attrs:{id:"SVGicon",version:"1.1",xmlns:"http://www.w3.org/2000/svg"}},[e("symbol",{attrs:{viewBox:"0 0 1024 1024",id:"icon-publish"}},[e("title",[t._v("发布")]),t._v(" "),e("path",{attrs:{d:"M851.2 166.4c-12.8-6.4-25.6-6.4-32 0l-640 320c-12.8 0-19.2 12.8-19.2 25.6s6.4 25.6 12.8 25.6l153.6 96c12.8 6.4 25.6 6.4 38.4-6.4L704 320l12.8 6.4-307.2 326.4c-6.4 6.4-6.4 12.8-6.4 19.2v140.8c0 12.8 6.4 25.6 19.2 32 12.8 6.4 25.6 0 32-6.4l76.8-76.8L684.8 864c6.4 6.4 12.8 6.4 19.2 6.4h12.8c12.8-6.4 19.2-12.8 19.2-25.6l128-640c0-19.2 0-32-12.8-38.4z"}})])]),t._v(" "),e("ul",{staticClass:"chooseTab"},[e("router-link",{attrs:{to:"/Search?will=Rent",tag:"li",id:"gameChoose"}},[t._v("当前选择："+t._s(this.$store.state.curSelect))]),t._v(" "),e("router-link",{staticClass:"toPublish",attrs:{to:"/Publish",active:"false"}},[e("svg",{staticClass:"icon-send"},[e("use",{attrs:{"xlink:href":"#icon-publish"}})]),t._v("发布账号")])],1),t._v(" "),e("div",{ref:"content",staticClass:"content"},[e("ul",{staticClass:"list",attrs:{slot:"list"},slot:"list"},t._l(t.rentList,function(a,s){return e("li",{key:""+Math.random()},[e("router-link",{attrs:{tag:"a",to:"/Rent/detail?Rid="+a.id}},[e("div",{staticClass:"imgbox"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.imgUrl,expression:"item.imgUrl"}]})]),t._v(" "),e("div",{staticClass:"info"},[e("h4",{staticClass:"desc"},[e("i",{staticClass:"bluef"},[t._v(t._s(a.lease)+"小时")]),t._v("起租")]),t._v(" "),e("p",{staticClass:"title"},[e("span",{staticClass:"bluef"},[t._v("["+t._s(a.gameName)+"]")]),t._v(t._s(a.title))]),t._v(" "),e("p",{staticClass:"count_data"},[e("em",[e("span",{staticClass:"bluef"},[t._v("￥"+t._s(a.price)+"小时")]),t._v("押金"+t._s(a.foreMoney))]),t._v(" "),e("em",[t._v("累计出租"+t._s(a.rentTimes)+"次")])])])])],1)}),0),t._v(" "),e("infinite-loading",{attrs:{identifier:t.infiniteId},on:{infinite:t.infiniteHandler}},[e("div",{staticClass:"onloading",attrs:{slot:"spinner"},slot:"spinner"},[e("b"),t._v("正在加载数据...")]),t._v(" "),e("div",{staticClass:"tc",attrs:{slot:"no-more"},slot:"no-more"},[t._v("我是有底线的")]),t._v(" "),e("div",{staticClass:"noDataTips",attrs:{slot:"no-results"},slot:"no-results"},[t._v("暂无数据")])])],1),t._v(" "),e("myfooter")],1)},staticRenderFns:[]};var u=e("C7Lr")(d,v,!1,function(t){e("uQS0")},"data-v-64f7b58c",null);a.default=u.exports}});
//# sourceMappingURL=4.ce5f55df80da4d051403.js.map