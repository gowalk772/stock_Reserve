let result = []; // 最終的な二次元配列を入れるための配列
let startPeriod = document.getElementById("sPeriod"); //積立開始月
let endPeriod = document.getElementById("ePeriod"); //積立開始月
let price = document.getElementById("money"); //投資金額

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
  
  let tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

  // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
  result = [];
  for(let i=0;i<tmp.length;++i){
      result[i] = tmp[i].split(',');
  }

  
  let child;
  while(child = startPeriod.firstChild){ //セレクトボックスの子要素を取得しつつループ
    startPeriod.removeChild(child); //セレクトボックスから子要素を削除
  }
  while(child = endPeriod.firstChild){ //セレクトボックスの子要素を取得しつつループ
    endPeriod.removeChild(child); //セレクトボックスから子要素を削除
  }

  let op = []
  for(let i = 1; i < result.length-1; i++){
    op[i-1] = document.createElement("option"); //option要素を新しく作る
    op[i-1].value = result[i][0]; 
    op[i-1].text = result[i][0];
    startPeriod.appendChild(op[i-1]); //セレクトボックスにoption要素を追加する
  }
  
  let opp = []
  for(let i = 1; i < result.length-1; i++){
    opp[i-1] = document.createElement("option"); //option要素を新しく作る
    opp[i-1].value = result[i][0]; 
    opp[i-1].text = result[i][0];
    endPeriod.appendChild(opp[i-1]); //セレクトボックスにoption要素を追加する
  }

}

// ティッカーシンボルを取得する
let ticker = document.getElementById("tick");
ticker.onchange = function(){
  getCSV(this.value);
}

let sRow;
let eRow;
let cal = document.getElementById("cal");
cal.onclick = function(){
  if(ticker.value){
    for(let i = 0; i < result.length-1; i++){
      if(result[i][0] == startPeriod.value){
        sRow = i; //開始期間の行を保存
      }
    }
    for(let i = 0; i < result.length-1; i++){
      if(result[i][0] == endPeriod.value){
        eRow = i; //終了期間の行を保存
      }
    }
    //計算
    if(sRow < eRow){
      alert("期間を正しく選択してください")
    } else{
      let remainder = 0;
      let dTotal = 0;
      let sNumber = 0;
      let sTNumber = 0;
      //計算はドル
      for(let i = sRow; i > eRow; i--){
        dTotal = (price.value*100) + remainder;
        sNumber = parseInt(dTotal/result[i][1]);
        remainder = dTotal - (sNumber*result[i][1]);
        sTNumber = sNumber + sTNumber;
      }
      //合計は円
      let tot = document.getElementById("tot");
      let val = document.getElementById("val");
      let pro = document.getElementById("pro");
      let prof = document.getElementById("prof");
      let total = price.value*10000*(sRow-eRow);
      let valuation = sTNumber*result[eRow][1]*100;
      tot.textContent = total.toLocaleString() + " 円";
      val.textContent = valuation.toLocaleString() + " 円";
      pro.textContent = (valuation-(total-remainder*100)).toLocaleString() + " 円";
      prof.textContent = parseInt((valuation-(total-remainder*100))*0.717).toLocaleString() + " 円";


    }
    //alert(startPeriod.value);
    //alert(endPeriod.value); 
    //alert(price.value);
  }
  
}



