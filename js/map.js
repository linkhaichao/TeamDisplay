/**
 * Created by Hello on 2016/11/1.
 */
// 百度地图API功能
var mp = new BMap.Map("allmap");
mp.centerAndZoom(new BMap.Point(113.88325,22.916648), 16);
//mp.enableScrollWheelZoom();

var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
/*缩放控件type有四种类型:
 BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

//添加控件和比例尺
function add_control(){
    mp.addControl(top_left_control);
    mp.addControl(top_left_navigation);
    mp.addControl(top_right_navigation);
}
//移除控件和比例尺
function delete_control(){
    map.removeControl(top_left_control);
    map.removeControl(top_left_navigation);
    map.removeControl(top_right_navigation);
}

add_control();

//创建定位图标
var pt = new BMap.Point(113.88765,22.903848);
var myIcon = new BMap.Icon("./img/icon.png", new BMap.Size(300,157));
var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
mp.addOverlay(marker2);

// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, text, mouseoverText){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "transparent";
    div.style.color = "white";
    div.style.height = "18px";
    div.style.padding = "2px";
    div.style.lineHeight = "18px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "12px";
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;
    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "358px";
    arrow.style.height = "420px";
    arrow.style.top = "-300px";
    arrow.style.left = "-20px";
    arrow.style.overflow = "visible";
    arrow.style.background="#fff";
    arrow.style.color="#000";
    arrow.style.textAlign="left";
    arrow.style.padding="10px 22px 55px 20px";
    arrow.style.boxShadow="  2px 2px 10px #000";
    /*地图的联系方式*/
    for(var i=0;i<4;i++){
        var pBiaoQian=document.createElement('p');
        pBiaoQian.style.width="300px";
        pBiaoQian.style.fontSize="18px";
        pBiaoQian.style.whiteSpace='wrap';
        pBiaoQian.style.marginTop="20px";
        if(i==0){
            var spanBiao="<span class='icon iconfont icon-dianhua' style='font-size:25px;color: #0096db;margin-right:17px;'></span> 0769-12345678";
            pBiaoQian.innerHTML=spanBiao;
            arrow.appendChild(pBiaoQian);
        }else if(i==1){
            var spanBiao="<span class='icon iconfont icon-youxiang' style='font-size:25px;color: #0096db;margin-right:17px;'></span> 1302675834@qq.com";
            pBiaoQian.innerHTML=spanBiao;
            arrow.appendChild(pBiaoQian);
        }else if(i==2){
            var spanBiao="<span class='icon iconfont icon-lianxiren' style='font-size:25px;color: #0096db;margin-right:17px;'></span> 付老师";
            pBiaoQian.innerHTML=spanBiao;
            arrow.appendChild(pBiaoQian);
        }else if(i==3){
            var spanBiao="<span class='icon iconfont icon-location_fill' style='font-size:25px;color: #0096db;margin-right:17px;'></span> 广东省东莞市松山湖科技产业园区";
            var span=document.createElement('span');
            span.innerHTML='大学路1号';
            span.style.fontSize="18px";
            span.style.marginLeft="46px";
            pBiaoQian.innerHTML=spanBiao;
            arrow.appendChild(pBiaoQian);
            arrow.appendChild(span);
        }

    }
    var hrTag=document.createElement('hr');
    hrTag.style.height="1px";
    hrTag.style.border='none';
    hrTag.style.borderTop="1px solid #dbdbdb";

    arrow.appendChild(hrTag);
    var pBottom1=document.createElement('p');
    pBottom1.style.textIndent="28px";
    pBottom1.innerHTML="我们位于松山湖科技产业园区，可乘";
    pBottom1.style.fontSize="18px";
    pBottom1.style.marginTop="22px";
    var pBottom2=document.createElement('p');
    pBottom2.innerHTML="22路、328路、825路、805a路、827路";
    pBottom2.style.fontSize="18px";
    var pBottom3=document.createElement('p');
    pBottom3.innerHTML="833路k2路、大岭山2路、松山湖2路、松";
    pBottom3.style.fontSize="18px";
    var pBottom4=document.createElement('p');
    pBottom4.innerHTML="山湖2路、松山湖5路抵达理工体育中心站";
    pBottom4.style.fontSize="18px";
    var pBottom5=document.createElement('p');
    pBottom5.innerHTML="。若有任何疑问，请与我们联系。";
    pBottom5.style.fontSize="18px";
    arrow.appendChild(pBottom1);
    arrow.appendChild(pBottom2);
    arrow.appendChild(pBottom3);
    arrow.appendChild(pBottom4);
    arrow.appendChild(pBottom5);
    div.appendChild(arrow);

    /*div.onmouseover = function(){
     this.style.backgroundColor = "#6BADCA";
     this.style.borderColor = "#0000ff";
     this.getElementsByTagName("span")[0].innerHTML = that._overText;
     arrow.style.backgroundPosition = "0px -20px";
     }

     div.onmouseout = function(){
     this.style.backgroundColor = "#EE5D5B";
     this.style.borderColor = "#BC3B3A";
     this.getElementsByTagName("span")[0].innerHTML = that._text;
     arrow.style.backgroundPosition = "0px 0px";
     }
     */
    mp.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCustomOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 30 + "px";
}
/*var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;*/

var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(113.88805,22.903848), "");

mp.addOverlay(myCompOverlay);
