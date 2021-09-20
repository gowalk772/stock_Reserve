

//CSVファイルを読み込む関数getCSV()の定義
function getCSV(symbol){
  let req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
  req.open("get", symbol + ".csv", true); // アクセスするファイルを指定
  req.send(null); // HTTPリクエストの発行

  // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
  req.onload = function(){
    convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
  }
} 

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
  let result = []; // 最終的な二次元配列を入れるための配列
  let tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

  // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
  for(let i=0;i<tmp.length;++i){
      result[i] = tmp[i].split(',');
  }

  let startPeriod = document.getElementById("sPeriod"); //積立開始月
  let endPeriod = document.getElementById("ePeriod"); //積立開始月

  const option = document.createElement('option'); //option要素を新しく作る
  option.value = result[1][0]; //option要素の値に、メニューを識別できる番号を指定する
  option.innerHTML = menu; //ユーザー向けの表示としてメニュー名を指定する
  startPeriod.appendChild(option); //セレクトボックスにoption要素を追加する
  endPeriod.appendChild(option); //セレクトボックスにoption要素を追加する
  
  alert(result[1][1]);
}

// ティッカーシンボルを取得する
let ticker = document.getElementById("tick");
ticker.onchange = function(){
  alert(this.value);
  getCSV(this.value);
}




