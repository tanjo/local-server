var _positions = [];

/*
 * 有効証拠金額 ÷ 必要証拠金 × 100 = 証拠金維持率
 */
function syokokinritsu(resource, need) {
  if (need !== 0) {
    return resource / need * 100;
  } else {
    return " - ";
  }
}

/*
 * 算出式：（評価レート）× 10,000通貨 × 4% @ 25倍
 */
function need(hyoka_rate, tsuka) {
  return hyoka_rate * tsuka * 4 / 100;
}

function deleteList() {
  var list = document.getElementById('list');
  for (var i = list.childNodes.length - 1; i >= 0; i--) {
    list.removeChild(list.childNodes[i]);
  }
  _positions = [];
}

/*
 * ポジションを追加
 */
function add() {
  var money = document.add_position.money.value;
  var position = document.add_position.position.value;
  var maisu = document.add_position.maisu.value * 10000;
  if (money > 0) {
    var order = {
      "money" : money,
      "position" : position,
      "maisu" : maisu
    };
    _positions.push(order);
  }
  show_list();
}

function show_list() {
  var hyoka_rate = document.add_position.hyoka_rate.value;
  var resource = document.add_position.resource.value;
  var pip = 0.01;
  var pips = document.add_position.pips.value;
  var alert = document.add_position.alert.value;
  var standard = document.add_position.standard.value;
  var standard_value = parseFloat(standard);
  var list = document.getElementById('list');
  list.innerHTML = '';

  // テーブル本体
  var table = document.createElement('table');
  table.className = "table";

  // ヘッダー
  var tr = table.insertRow(table.rows.length);
  var th1 = document.createElement( 'th' );
  tr.appendChild(th1);
  th1.innerHTML = '金額';
  var th2 = document.createElement( 'th' );
  tr.appendChild(th2);
  th2.innerHTML = '証拠金率';
  for (i = 0; i < _positions.length; i++) {
    var th = document.createElement( 'th' );
    tr.appendChild(th);
    var order = _positions[i];
    if (order.position == "kai") {
      th.innerHTML += "買";
      th.className = "danger";
    } else if (order.position == "uri") {
      th.innerHTML += "売";
      th.className = "info";
    }
    if (order.maisu > 0) {
      th.innerHTML += order.maisu;
    }
    if (order.money > 0) {
      th.innerHTML += "@" + order.money;
    }
  }

  // ボディ(-)
  var half_pips = parseInt(pips) / 2;
  for (i = 0; i <  half_pips; i++) {
    var tr = table.insertRow(table.rows.length);
    // 金額
    var kingaku = standard_value - pip * (half_pips - i);
    var td1 = tr.insertCell();
    td1.innerHTML += kingaku;
    // 証拠金率
    var td2 = tr.insertCell();
    var sum = 0.0;
    for (j = 0; j < _positions.length; j++) {
      var td3 = tr.insertCell();
      // 損得
      var order = _positions[j];
      var default_need = need(hyoka_rate, parseFloat(order.maisu));
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
      sum += default_need + v;
    }
    var ritsu = syokokinritsu(resource, sum);
    if (ritsu < alert) {
      tr.className = "danger";
    }
    td2.innerHTML += ritsu + "%";
  }

  // ボディ(真ん中)
  {
    var tr = table.insertRow(table.rows.length);
    tr.className = "success";
    // 金額
    var kingaku = standard_value;
    var td1 = tr.insertCell();
    td1.innerHTML += kingaku;
    // 証拠金率
    var td2 = tr.insertCell();
    var sum = 0.0;
    for (j = 0; j < _positions.length; j++) {
      var td3 = tr.insertCell();
      // 損得
      var order = _positions[j];
      var default_need = need(hyoka_rate, parseFloat(order.maisu));
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
      sum += default_need + v;
    }
    var ritsu = syokokinritsu(resource, sum);
    if (ritsu < alert) {
      tr.className = "danger";
    }
    td2.innerHTML += ritsu + "%";
  }

  // ボディ(+)
  for (i = 0; i < half_pips; i++) {
    var tr = table.insertRow(table.rows.length);
    // 金額
    var kingaku = standard_value + pip * (i + 1);
    var td1 = tr.insertCell();
    td1.innerHTML += kingaku;
    // 証拠金率
    var td2 = tr.insertCell();
    var sum = 0.0;
    for (j = 0; j < _positions.length; j++) {
      var td3 = tr.insertCell();
      // 損得
      var order = _positions[j];
      var default_need = need(hyoka_rate, parseFloat(order.maisu));
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
      sum += default_need + v;
    }
    var ritsu = syokokinritsu(resource, sum);
    if (ritsu < alert) {
      tr.className = "danger";
    }
    td2.innerHTML += ritsu + "%";
  }

  list.appendChild(table);
}
