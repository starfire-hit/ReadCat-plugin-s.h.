plugin.exports=class a{static ID="P3poRHb6o-p63oM8c-eNT";static TYPE=plugin.type.BOOK_SOURCE;static GROUP="自用";static NAME="哩哔轻小说";static VERSION="1.0.0";static VERSION_CODE=0;static PLUGIN_FILE_URL="";static BASE_URL="https://www.wenkuchina.com";static REQUIRE={};request;store;cheerio;nanoid;constructor(t){var{request:t,store:e,cheerio:i,nanoid:a}=t;this.request=t,this.store=e,this.cheerio=i,this.nanoid=a}async search(t){var e=await this.request.post(a.BASE_URL+"/modules/article/search.php",{params:{searchkey:t}}),i="",r=(302==e.code&&(i=e.headers.location,e=await this.request.post(i,{params:{searchkey:t}})),t=e.body,this.cheerio(t)),s=[];if(-1<r("head > title").text().indexOf("搜索关键词"))for(const d of r("div.search-tab > div.search-result-list")){var l=r(r(r(d).find("div").get(1)).find("h2").get(0)).find("a"),o=r(l.get(0)).text(),h=r(l.get(0)).attr("href"),n="",c=r(r(r(r(d).find("div").get(1)).find("div").get(0)).find("a").get(0)).text();s.push({bookname:o,author:c,detailPageUrl:h,latestChapterTitle:n})}else{c=r("div.au-name > a").text(),o=r("div.book-info > h1").text(),h=r("a.btn.read-btn").attr("href"),n=r(r("div.tit.fl > a:nth-child(1)").get(0)).text();s.push({bookname:o,author:c,detailPageUrl:i,latestChapterTitle:n})}return s}async getDetail(t){t=(await this.request.get(t)).body;let e=this.cheerio(t);var t=e("div.book-img.fl > img").attr("src"),i=e("div.book-info > h1").text(),a=e("div.au-name > a").text(),r=e("div.book-dec.Jbook-dec.hide > p").text(),s=e(e("div.book-new-chapter > div.tit.fl > a").get(0)).text(),l=e("div.btn-group > a:nth-child(1)").attr("href"),l=(await this.request.get(l)).body,o=[],h=(e=this.cheerio(l))("div.volume-list > div > ul").children();for(let t=0;t<h.length;t++){var n,c=e(h.get(t));c.hasClass("col-4")?(n=(c=c.find("a")).text(),c=c.attr("href"),""==o[o.length-1].url&&(o[o.length-1].url=c),o.push({title:n,url:c})):c.hasClass("volume")&&(n=c.text(),o.push({title:"--<<"+n+">>--",url:""}))}return{bookname:i,author:a,coverImageUrl:t,latestChapterTitle:s,intro:r,chapterList:o}}async getAllTextContent(t){var t=(await this.request.get(t.url)).body,t=this.cheerio(t),e=t("div.read-content"),e=Array(e.html());return"下一页"==t("p.mlfy_page > a:nth-last-child(1)").text()&&(t=await this.getAllTextContent({url:t("p.mlfy_page > a:nth-last-child(1)").attr("href"),title:""}),e=Array.isArray(t)?e.concat(t):e.concat(Array(t))),e}async getTextContent(t){var t=await this.getAllTextContent(t),e="<div id='content'>"+t.join(" ")+"</div>",e=this.cheerio(e)("#content"),e=(e.children("div").remove(),e.children("script").remove(),e.html());const i=/【哩哔轻小.*?免费阅读！/i,a=/佰度搜索.*?免费下载！/i,r=/\/p$/i,s=/哩哔轻小说网.*?\..*?\..*?/i;return t=e.split("<br>").filter(t=>""!==t.trim()).map(t=>(t=t.replaceAll("&nbsp;","").replaceAll("&emsp;","").replaceAll(/\n/g,"").trim(),i.exec(t)||a.exec(t)||(r.exec(t)&&(t=t.replaceAll("/p","")),s.exec(t))?"":t.replaceAll("．ＣＯＭ更新最快",""))).filter(t=>""!==t.trim())}};//by starfire-hit