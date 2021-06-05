
// firebase読み込み設定
// firesbaseのサイトのコード---------------------------
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "dev20chat-c8419.firebaseapp.com",
    databaseURL: "https://dev20chat-c8419-default-rtdb.firebaseio.com/",  //仕様が変わった
    projectId: "dev20chat-c8419",
    storageBucket: "dev20chat-c8419.appspot.com",
    messagingSenderId: "179098484234",
    appId: "1:179098484234:web:d61a44c26659008fb1a9f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //------------------------------------------------
  //firebaseのデーターベース（保存させる場所）を使いますよ
// firebaseのデータベースとリアルタイムに繋がることができる
  const newPostRef = firebase.database().ref();
// チャット部分の処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // 現在時刻の表示
function getNow() {
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
  // 二桁表示
  var hour2 = "0"+hour;
  var min2 = "0"+min;
  var hour3 = hour2.slice(-2);
  var min3 = min2.slice(-2);
	//出力用
	var s =  hour3 + ":" + min3; 
	return s;
}
//現在時刻が取り出せているか確認
let genzaijikoku = getNow();
document.getElementById("view_time").value = genzaijikoku;
console.log(genzaijikoku);
  // ここから下にjqueryの処理を書いて練習します
  // 入力したデータをfirebaseに送るーーーーーーーーーーーーーーーーーーーーーーーーー
  let d= 0;
  const img = ["6.jpeg"]
 
  // 画像をランダムに一つ選ぶ
// let randomimgs = [
//   'imgs/10.jpeg',
//   'imgs/11.png',
//   'imgs/12.jpeg',
//   'imgs/13.jpeg',
//   'imgs/14.png',
//   'imgs/15.png',
//   'imgs/16.jpeg',
//   'imgs/17.png',
//   'imgs/18.jpeg',
//   'imgs/19.jpeg',
//   'imgs/20.png'
// ]
// let pickup = Math.floor( Math.random() * randomimgs.length);
// // ランダムの数字
// console.log(pickup);
// // ランダムの画像の表示
// console.log(randomimgs[pickup]);


$("#likeimg1").on("click", function () {
  // データをfirebaseに保存
  // document.getElementById("likeimg1").innerHTML = "<img src= 'randomimgs[pickup]' width='60px' height='60px'>";
  // like機能(ハートを表示)
  document.getElementById("itembox1").innerHTML = "<img src= 'imgs/2.png' width='60px' height='60px'>";
});
//ダブルクリックでlike取り消し
$("#likeimg1").on("dblclick", function () {
  document.getElementById("itembox1").innerHTML = "";
});
$("#likeimg2").on("click", function () {
  // データをfirebaseに保存
  // document.getElementById("likeimg1").innerHTML = "<img src= 'randomimgs[pickup]' width='60px' height='60px'>";
  // like機能(ハートを表示)
  document.getElementById("itembox2").innerHTML = "<img src= 'imgs/2.png' width='60px' height='60px'>";
});
//ダブルクリックでlike取り消し
$("#likeimg2").on("dblclick", function () {
  document.getElementById("itembox2").innerHTML = "";
});


  // 送信ボタンをクリックされたら次の処理をする------------
  $("#jibun").on("click", function () {
    // 記述1
    //エラーハンドリング
    let username = $("#usernam").val();
    if(username=== ""){
      alert("入力されていません")
      return
    }
    // データを登録で送る
      newPostRef.push({
        view_time: $("#view_time").val(),
        username:"",
        randomimgs:$("#likeimg1").val,
        usernam: $("#usernam").val() //テキスト入力
      })
      $("#usernam").val(""); //空にする
      
     // 受信処理
  });

  
  // エンターキーを押すと次の処理をする------------
  $("#jibun").on("keydown", function (e) { //eventのe //keydownはキーボードの何かが押された時
    if(e.keyCode === 13){
      //送信処理を実行する
      newPostRef.push({
      view_time: $("#view_time").val(),
      username:"",
      
      usernam: $("#usernam").val() //テキスト入力
    })
    $("#usernam").val(""); //空にする
    }
  });

  $("#aite").on("click", function () {
    // 記述1
    //エラーハンドリング
    let username = $("#username").val();
    if(username === ""){
      alert("入力されていません")
      return
    }
    // データを登録で送る
    newPostRef.push({
      view_time: $("#view_time").val(),
      icon:d,
      usernam:"",
      username: $("#username").val() //テキスト入力
    })
    $("#username").val(""); //空にする
     // 受信処理
  });
// エンターキーを押すと次の処理をする------------
  $("#aite").on("keydown", function (e) { //eventのe //keydownはキーボードの何かが押された時
    if(e.key === 'Enter'){
      //送信処理を実行する
      newPostRef.push({
        view_time: $("#view_time").val(),
        usernam:"",
        username: $("#username").val() //テキスト入力
      })
      $("#username").val(""); //空にする
       // 受信処理
    }
  });

//   クリックしたらランダムで画像が入れ替わる
// クリックしたら画像が保存される
// 保存された画像を右側に表示する



// ラ

// document.getElementById("#likeimg1").innerHTML = "<img src= 'randomimgs[pickup]' width='60px' height='60px'>";
//クリックで画像保存、画像切り替わる、like機能付与


// firebaseにあるデータを出力する
  newPostRef.on("child_added", function (data) { //dataはなんでもいい
    let v = data.val(); //ここに保存されたデータが全て入ってくる
    let k = data.key; //今回は使いません
    console.log(v);
    if(v.username===""){
      let str = `<br><br><p> ${v.usernam}</p><img src='imgs/${img[v.icon]}'>`;
    // ここでデータをhtmlに埋め込む
    $("#output2").prepend(str);
    }
    else if(v.usernam===""){
      let str2 = `<p>${v.username}</p><img src='imgs/${img[v.icon]}'>`;
    // ここでデータをhtmlに埋め込む
    $("#output1").prepend(str2);
    }
    else if(v.randomimg){
      let str3 = `<img src='imgs/${img[v.randomimg]}'>`;
    // ここでデータをhtmlに埋め込む
    $("#caram").prepend(str3);
    }
  })

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// var a = time();
// time();
//     function time(){
//         var now = new Date();
//         document.getElementById("time").innerHTML = now.toLocaleTimeString();
//     }
//     setInterval('time()',1000);

// デモンストレーションボタンを押したら発火ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// 地図上に表示<デモンストレーション部分>ーーーーーーーーーーーーーーーーーーーーーーーーーーー
var map;
var marker;
// 配列による、緯度経度のまとめ
var mapPosition = [
  {lat: 35.8620322 , lng: 139.9709241},//柏駅
  {lat: 35.8590751 , lng: 139.9641831},  //セブンイレブン柏旭町店
  {lat: 35.85577027981296 , lng: 139.971640724415},//俺の生きる道、ラーメン屋
  {lat: 35.8626297 , lng: 139.9756728} //デイリーヤマザキ柏6丁目店
]// 緯度経度;
var InfoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { // #mapに地図を埋め込む
        center: mapPosition[0], // 地図の中心を指定 
        zoom: 16 // 地図のズームを指定
    });
// 柏駅の設定ーーーーーーーーーーーーーーーーー
 const marker = new google.maps.Marker({
  position: mapPosition[0],
  map,
  icon: {
    url: 'imgs/7.jpeg',                      //アイコンのURL
    scaledSize: new google.maps.Size(40, 40) //サイズ
  }
});
  // 吹き出しに出す文
var infowindow = new google.maps.InfoWindow({
  content: 'スタート①'

});
infowindow.open(map, marker);
//ーーーーーーーーーーーーーーーーーーーーーーーー
// セブンイレブン柏旭町の設定ーーーーーーーーーーーーーーーーー
const marker2 = new google.maps.Marker({
position: mapPosition[1],
map,
icon: {
  url: 'imgs/9.jpeg',                      //アイコンのURL
  scaledSize: new google.maps.Size(60, 60) //サイズ
}
});
var infowindow2 = new google.maps.InfoWindow({
content: 'ゴール①'
});

infowindow2.open(map, marker2);
//ーーーーーーーーーーーーーーーーーーーーーーーー
// ラーメン屋の設定ーーーーーーーーーーーーーーーーー
const marker3 = new google.maps.Marker({
  position: mapPosition[2],
  map,
  icon: {
    url: 'imgs/8.png',                      //アイコンのURL
    scaledSize: new google.maps.Size(40, 40) //サイズ
  }
  });
  // 吹き出しに出す文
  var infowindow3 = new google.maps.InfoWindow({
  content: 'スタート②'
  });
  infowindow3.open(map, marker3);
  //ーーーーーーーーーーーーーーーーーーーーーーーー
  // デイリーヤマザキ柏6丁目店の設定ーーーーーーーーーーーーーーーーー   
  const marker4 = new google.maps.Marker({
    position: mapPosition[3],
    map,
    icon: {
      url: 'imgs/9.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(60, 60) //サイズ
    }
    });
    // 吹き出しに出す文
    var infowindow4 = new google.maps.InfoWindow({
    content: 'ゴール②'
    });
    infowindow4.open(map, marker4);
    //ーーーーーーーーーーーーーーーーーーーーーーーー
      // {lat: 35.8620322 , lng: 139.9709241},//柏駅
      // {lat: 35.8557443 , lng: 139.9630408},  //スシロー柏店
// ①柏駅とスシローの緯度経度の差を求め、10等分する
// 緯度の差
// (mapPosition[0].lat-mapPosition[1].lat)/10
// 経度の差
// (mapPosition[0].lng-mapPosition[1].lng)/10

// ②10秒毎に近づかせる(柏駅→スシロー)
// 緯度
// mapPosition[0].lat-(mapPosition[0].lat-mapPosition[1].lat)/10
// 経度
// mapPosition[0].lng-(mapPosition[0].lng-mapPosition[1].lng)/10
//   const marker = new google.maps.Marker({
//     position: mapPosition[0],
//     map
//   緯度
// mapPosition[0].lat-(mapPosition[0].lat-mapPosition[1].lat)/10
// 経度
// mapPosition[0].lng-(mapPosition[0].lng-mapPosition[1].lng)/10
// 柏駅とスシローの距離を緯度と経度から求めるーーーーーーーーーーーーーーーーーーーーーーーーーーー
function distance(lat1, lng1, lat2, lng2) {
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}
// distance関数は緯度と経度から距離を求める関数
let dis1 = distance( 
  mapPosition[0].lat,mapPosition[0].lng,mapPosition[1].lat,mapPosition[1].lng); 
console.log(dis1); //km
// 目的地までの距離[m]を求める
let dis1meter = Math.round(dis1*1000);
console.log(dis1meter);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 目的地までの歩数を求める
// 歩幅は72cmとする
let walk1 = Math.round(dis1*100000/72)
console.log(walk1);
// ラーメン屋とホワイト餃子の距離を緯度と経度から求めるーーーーーーーーーーーーーーーーーーーーーーーーーーー
function distance(lat3, lng3, lat4, lng4) {
  lat3 *= Math.PI / 180;
  lng3 *= Math.PI / 180;
  lat4 *= Math.PI / 180;
  lng4 *= Math.PI / 180;
  return 6371 * Math.acos(Math.cos(lat3) * Math.cos(lat4) * Math.cos(lng4 - lng3) + Math.sin(lat3) * Math.sin(lat4));
}
let dis2 = distance( 
  mapPosition[2].lat,mapPosition[2].lng,mapPosition[3].lat,mapPosition[3].lng); 
console.log(dis2); //km
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 目的地までの距離[m]を求める
let dis2meter = Math.round(dis2*1000);
console.log(dis2meter);
// 目的地までの歩数を求める、歩幅は72cmとする
let walk2 = Math.round(dis2*100000/72)
console.log(walk2);
// 消費カロリーの計算方法、10歩につき3kcalを消費する
// 柏駅からスシロー柏店までの道のりーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 3秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let a = mapPosition[0].lat-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let b = mapPosition[0].lng-(mapPosition[0].lng-mapPosition[1].lng)/10;
var near0 = function(){
  console.log("test");
  const marker10 = new google.maps.Marker({
    position: {lat: a , lng: b} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
   // 目標まであと何歩(目標を5000歩とする)
   walksubzan.innerHTML = Math.round(5000-(walk1+walk2)/10);
   // 歩いた歩数
   sportnumber1.innerHTML = Math.round((walk1+walk2)/10);
   //消費カロリー
   sportcal1.innerHTML = Math.round((walk1+walk2)/10*3/10);
   // 歩いた距離
  // //  (dis1+dis2)/10
  //  sportnumber1.innerHTML = (dis1+dis2)/10;
};
setTimeout(near0, 3000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 6秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let c = a-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let d = b-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near1 = function(){
  console.log("test");
  const marker11 = new google.maps.Marker({
    position: {lat: c , lng: d} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
   // 目標まであと何歩(目標を5000歩とする)
   walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*2/10);
   // 歩いた歩数
   sportnumber1.innerHTML = Math.round((walk1+walk2)*2/10);
   //消費カロリー
   sportcal1.innerHTML = Math.round((walk1+walk2)*2/10*3/10);
};
setTimeout(near1, 6000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 9秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let e = c-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let f = d-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near2 = function(){
  console.log("test");
  const marker12 = new google.maps.Marker({
    position: {lat: e , lng: f} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*3/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*3/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*3/10*3/10);
};
setTimeout(near2, 9000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 12秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let g = e-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let h = f-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near3 = function(){
  console.log("test");
  const marker13 = new google.maps.Marker({
    position: {lat: g , lng: h} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*4/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*4/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*4/10*3/10);
};
setTimeout(near3, 12000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 15秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let i = g-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let j = h-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near4 = function(){
  console.log("test");
  const marker14 = new google.maps.Marker({
    position: {lat: i , lng: j} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*5/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*5/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*5/10*3/10);
};
setTimeout(near4, 15000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 18秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let k = i-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let l = j-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near5 = function(){
  console.log("test");
  const marker15 = new google.maps.Marker({
    position: {lat: k , lng: l} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*6/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*6/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*6/10*3/10);
};
setTimeout(near5, 18000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 21秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let m = k-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let n = l-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near6 = function(){
  console.log("test");
  const marker16 = new google.maps.Marker({
    position: {lat: m , lng: n} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*7/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*7/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*7/10*3/10);
};
setTimeout(near6, 21000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 24秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let o = m-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let p = n-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near7 = function(){
  console.log("test");
  const marker17 = new google.maps.Marker({
    position: {lat: o , lng: p} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*8/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*8/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*8/10*3/10);
};
setTimeout(near7, 24000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 27秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let q = o-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let r = p-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near8 = function(){
  console.log("test");
  const marker18 = new google.maps.Marker({
    position: {lat: q , lng: r} ,
    map,
    icon: {
      url: 'imgs/7.jpeg',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*9/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*9/10);
  //消費カロリー
  sportcal1.innerHTML = Math.round((walk1+walk2)*9/10*3/10);
};
setTimeout(near8, 27000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 30秒後に移動します(目的地に到着!)ーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let s = q-(mapPosition[0].lat-mapPosition[1].lat)/10;
// 経度
let t = r-(mapPosition[0].lng-mapPosition[1].lng)/10;

var near9 = function(){
  console.log("test");
  const marker19 = new google.maps.Marker({
    position: {lat: s , lng: t} ,
    map
  });
  // 目標まであと何歩(目標を5000歩とする)
  walksubzan.innerHTML = Math.round(5000-(walk1+walk2)*10/10);
  // 歩いた歩数
  sportnumber1.innerHTML = Math.round((walk1+walk2)*10/10);
   //消費カロリー
   sportcal1.innerHTML = Math.round((walk1+walk2)*10/10*3/10);
};
setTimeout(near9, 30000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー




// ラーメン屋からホワイト餃子までの道のりーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 3秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let a1 = mapPosition[2].lat+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let b1 = mapPosition[2].lng+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near10 = function(){
  console.log("test");
  const marker110 = new google.maps.Marker({
    position: {lat: a1 , lng: b1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near10, 3000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 6秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let c1 = a1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let d1 = b1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near11 = function(){
  console.log("test");
  const marker111 = new google.maps.Marker({
    position: {lat: c1 , lng: d1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
    
  });
};
setTimeout(near11, 6000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 9秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let e1 = c1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let f1 = d1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near12 = function(){
  console.log("test");
  const marker112 = new google.maps.Marker({
    position: {lat: e1 , lng: f1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near12, 9000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 12秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let g1 = e1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let h1 = f1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near13 = function(){
  console.log("test");
  const marker113 = new google.maps.Marker({
    position: {lat: g1 , lng: h1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near13, 12000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 15秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let i1 = g1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let j1 = h1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near14 = function(){
  console.log("test");
  const marker114 = new google.maps.Marker({
    position: {lat: i1 , lng: j1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near14, 15000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 18秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let k1 = i1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let l1 = j1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near15 = function(){
  console.log("test");
  const marker115 = new google.maps.Marker({
    position: {lat: k1 , lng: l1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near15, 18000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 21秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let m1 = k1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let n1 = l1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near16 = function(){
  console.log("test");
  const marker116 = new google.maps.Marker({
    position: {lat: m1 , lng: n1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near16, 21000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 24秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let o1 = m1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let p1 = n1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near17 = function(){
  console.log("test");
  const marker117 = new google.maps.Marker({
    position: {lat: o1 , lng: p1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near17, 24000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 27秒後に移動しますーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let q1 = o1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let r1 = p1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near18 = function(){
  console.log("test");
  const marker118 = new google.maps.Marker({
    position: {lat: q1 , lng: r1} ,
    map,
    icon: {
      url: 'imgs/8.png',                      //アイコンのURL
      scaledSize: new google.maps.Size(40, 40) //サイズ
    }
  });
};
setTimeout(near18, 27000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 30秒後に移動します(目的地に到着!)ーーーーーーーーーーーーーーーーーーーーーーーー
// 緯度
let s1 = q1+(mapPosition[3].lat-mapPosition[2].lat)/10;
// 経度
let t1 = r1+(mapPosition[3].lng-mapPosition[2].lng)/10;

var near19 = function(){
  console.log("test");
  const marker119 = new google.maps.Marker({
    position: {lat: s1 , lng: t1} ,
    map
   
  });
};
setTimeout(near19, 30000);
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// var log = function(){
//   console.log("test");
// };
// setInterval(log, 3000);
// // 3秒ごとに"test"と表示されます
// 配列の書き方
// console.log(mapPosition[0].lat);
// console.log(mapPosition[0].lng);

// クリックしたところにピンをさせる機能、詳細は下記
//  google.maps.event.addListener(map, 'click', event => clickListener(event, map));
}
// お気に入りの画像のfirebase処理













// マップの処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // let map;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: 35.665498, lng: 139.75964 },
  //     zoom: 16,
  //   });
  // }
  // // 現在地取得処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // function initMap() {
  //   // Geolocation APIに対応している
  //   if (navigator.geolocation) {
  //     // 現在地を取得
  //     navigator.geolocation.getCurrentPosition(
  //       // 取得成功した場合
  //       function(position) {
  //         // 緯度・経度を変数に格納
  //         var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //         // マップオプションを変数に格納
  //         var mapOptions = {
  //           zoom : 15,          // 拡大倍率
  //           center : mapLatLng  // 緯度・経度
  //         };
  //         // マップオブジェクト作成
  //         var map = new google.maps.Map(
  //           document.getElementById("map"), // マップを表示する要素
  //           mapOptions         // マップオプション
//           );
//           //マップにマーカーを表示する
//           var marker = new google.maps.Marker({
//             map : map,             // 対象の地図オブジェクト
//             position : mapLatLng   // 緯度・経度
//           });
//         },
//         // 取得失敗した場合
//         function(error) {
//           // エラーメッセージを表示
//           switch(error.code) {
//             case 1: // PERMISSION_DENIED
//             alert("位置情報の利用が許可されていません");
//             break;
//           case 2: // POSITION_UNAVAILABLE
//             alert("現在位置が取得できませんでした");
//             break;
//           case 3: // TIMEOUT
//             alert("タイムアウトになりました");
//             break;
//           default:
//             alert("その他のエラー(エラーコード:"+error.code+")");
//             break;
//         }
//       }
//     );
//   // Geolocation APIに対応していない
//  } else {
//     alert("この端末では位置情報が取得できません");
//   }  }
// // function reloadHoge() {
// //   $.get(document.URL).done(function(data, textStatus, jqXHR) {
// //     const doc = new DOMParser().parseFromString(data, 'text/html');
// //     $('.hoge').html(doc.querySelector('#view_time').innerHTML);
// //   });
// // }
// setInterval(reloadHoge, 60000);

// function distance($lat1, $lon1, $lat2, $lon2)
// {
//     

// 吹き出しの中にHTMLを書く方法
// var box = '<div class="box">' + 
//               '<p>新橋駅</p>' +
//           '</div>'
// var infowindow = new google.maps.InfoWindow({
//     content: box
// });
// infowindow.open(map, marker);

// クリックしたところにピンをさせる、その場所
// function clickListener(event, map) {
//   const lat = event.latLng.lat();
//   const lng = event.latLng.lng();
//   const marker2 = new google.maps.Marker({
//     position: {lat, lng},
//     map
//   });
// }


  // var mapobj;
  // var mark = {lat:35.680929,lng:139.767020 }; // 東京駅(北緯度,東経度)
  // function initMap() {
  //   mapobj = new google.maps.Map(document.getElementById('gmap'), {
  //     center: mark,      // 地図の中心位置を指定
  //     zoom: 13           // ズームレベルを指定
  //   });
  //   var marker = new google.maps.Marker({
  //     position: mark,       // マーカーの位置
  //     label: '＋',          // マーカーラベルの文字
  //     title: '地図中央',    // マーカーのタイトル
  //     map: mapobj           // マーカーを mapobj に設定
  //   });
  //   const infowindow = new google.maps.InfoWindow({
  //     content: "東京駅です<br><a href='https://www.jreast.co.jp/estation/stations/1039.html'>駅構内図</a>が見られます"
  // });
  //   marker.addListener("click", function(){
  //     infowindow.open(mapobj, marker);
  //   });


// 複数のマーカーを指定したい
//   var map;
// var marker;
// var center = {
//   lat: 35.8620322, // 緯度
//   lng: 139.9709241 // 経度
// };
 

//  map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
//      center: center, // 地図の中心を指定
//      zoom: 15 // 地図のズームを指定
//    });
 
//  marker = new google.maps.Marker({ // マーカーの追加
//         position: center, // マーカーを立てる位置を指定
//       map: map // マーカーを立てる地図を指定
//    });
// }



// 柏駅にマーカーの表示
// new google.maps.Marker({
//   map : map,             // 対象の地図オブジェクト
//   position : mapLatLng   // 緯度・経度
// });


// var infowindow = new google.maps.InfoWindow({
//   content: '新橋駅'
// });
// infowindow.open(map, marker);
// マーカーをつける
// var marker = new google.maps.Marker({
//   position: {lat: 35.665498, lng: 139.75964},
//   map: map
// });

// var infowindow = new google.maps.InfoWindow({
//   content: '新橋駅'
// });
// infowindow.open(map, marker);



  // 送信ボタンをクリックされたら次の処理をする

  // newPostRef.on("child_added", function (data) { //dataはなんでもいい
  //   let v = data.val(); //ここに保存されたデータが全て入ってくる
  //   let k = data.key; //今回は使いません
  //   console.log(v);
    
  // })
 

  



  // function distance(lat1, lng1, lat2, lng2) {
  //   lat1 *= Math.PI / 180;
  //   lng1 *= Math.PI / 180;
  //   lat2 *= Math.PI / 180;
  //   lng2 *= Math.PI / 180;
  //   return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
  // }






  //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  // $("#text").on("keydown", function (e) { //eventのe //keydownはキーボードの何かが押された時
  //   console.log(e,'eventデータの塊');
  //   if(e.keyCode === 13){

  //     //送信処理を実行する
  //     newPostRef.push({
  //     username: $("#username").val(), //名前
  //     text: $("#text").val(), //テキストエリア
  //   })
  //   $("#text").val(""); //空にする
  //   $("#username").val(""); //空にする
  //   }
  // })

 

//   ここから書いていく

// var map = new google.maps.Map(document.getElementById('map'), Options);