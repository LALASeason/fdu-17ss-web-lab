let element = document.getElementById("Order");
let ele = document.getElementById("Table");
let showTable = document.getElementById("ShowTable");
let form = document.getElementById("form");
let theTable = null;
let tableArray = [];

    document.getElementById("OperateTable").onchange = fresh;
    function fresh() {
    let index = document.form.OperateTable.selectedIndex;
    switch (index) {
        case 0:
            selectOne();
            break;
        case 1:
            createTable();
            break;
        case 2:
            addRow();
            break;
        case 3:
            deleteRow();
            break;
        case 4:
            deleteTable();
            break;
    }
}

function selectOne() {
    document.getElementById("ifHide").style.display = "none";
    element.innerHTML = "";
}

function createTable() {
    element.innerHTML = "<input type='text' id='tablename' placeholder='Table Name' />\n" +
        "<input type='number' id='tablecolumn' placeholder='Columns Numbers' /><br />" + "<div id = 'Attr'></div>";
    if (document.getElementById("tablecolumn").value !== null && document.getElementById("tablecolumn").value !== null){
        document.getElementById("tablecolumn").oninput = showHead;
        document.getElementById("tablecolumn").oninput = showHead;
    }

    }



function showHead(){
    document.getElementById("Attr").innerHTML = "";
    let numberOfColumn = document.getElementById("tablecolumn").value;

    if (document.getElementById("tablename").value !== "" && (/(^[1-9]\d*$)/.test(numberOfColumn))) {
        createAttr(numberOfColumn);
        document.getElementById("ifHide").style.display = "block";
    }

        document.getElementById("ifHide").onclick = function () {
        if (ele.innerHTML !== ""){
            if (theTable) {
                ele.removeChild(theTable.table);
            }
        }
        var tab = new Table(document.getElementById("tablename").value,numberOfColumn);
        tab.selectIndex = document.getElementById("ShowTable").selectedIndex;
        tab.rowNumber++;
        addName(tab);
        showAttr(tab);
        theTable = tab;
        tableArray.push(tab);
    }
    }

function addRow() {
    element.innerHTML = "";
    if (!theTable){
        return;
    }
    for (let i = 0; i < theTable.columnNumber; i++){
        let inputs = document.createElement("input");
        inputs.type = "text";
        inputs.name = "inputs"+ i;
        inputs.placeholder = theTable.columnContain[i];
        element.appendChild(inputs);
    }

    document.getElementById("ifHide").onclick = function () {
        let isEmpty = true;
        let arr = [];
        for (let i = 0; i < theTable.columnNumber; i++) {
            arr[i] = form.elements["inputs" + i].value;
            if (arr[i]) {
                isEmpty = false;
            }
        }
        if (!isEmpty) {
            let tr = theTable.table.tBodies[0].insertRow();
            theTable.rowNumber++;
            for (let j = 0; j < theTable.columnNumber; j++){
                tr.insertCell(j);
                tr.cells[j].appendChild(document.createTextNode(arr[j]));
            }
        }
    }
}

function deleteRow() {
    element.innerHTML = "";
    if (!theTable){
        return;
    }
    for (let i = 0; i < theTable.columnNumber; i++){
        let inputs = document.createElement("input");
        inputs.type = "text";
        inputs.name = "inputs"+ i;
        inputs.placeholder = theTable.columnContain[i];
        element.appendChild(inputs);
    }

    document.getElementById("ifHide").onclick = function () {
        let arr = [];
        for (let i = 0; i < theTable.columnNumber; i++) {
            arr[i] = form.elements["inputs" + i].value;
        }


        let i = 0;
        search:while (i < theTable.table.tBodies[0].rows.length){
            let realArr = readRow(i);
                 for (let j = 0; j < arr.length; j++){
                     if (!arr[j]) {
                         i++;
                         continue search;
                     }
                     if (arr[j] !== realArr[j]){
                         i++;
                         continue search;
                     }
                 }
                theTable.table.deleteRow(i+1);
        }
        
        function readRow(index) {
            let arr = [];
            for (let i = 0; i < theTable.columnNumber; i++){
                arr.push(theTable.table.tBodies[0].rows[index].cells[i].firstChild.nodeValue);
            } 
            return arr;
        }
    }
}

function deleteTable() {
        if (!theTable){
            return;
        }
    element.innerHTML = "<p>WARNING: You cannot undo this action!</p>";
    document.getElementById("ifHide").onclick = function (){
        for (let i = 0; i < tableArray.length; i++){
            if (tableArray[i] === theTable){
                ele.removeChild(theTable.table);
                theTable.table = null;
                tableArray.splice(i,1);
                showTable.removeChild(theTable.opt);
                theTable.opt = null;
                break;
            }
        }
        theTable = tableArray[0];
        if (theTable) {
            ele.appendChild(theTable.table);
        }
        showTable.options[1].selected = true;
    }
}


class Table{
        constructor(name,columnNumber){
            this.name = name;
            this.columnNumber = columnNumber;
            this.rowNumber = 0;
            this.table = null;
            this.opt = null;
            this.columnContain = [];
        }

}

function createAttr (num)
{
    for (let i = 0; i < num; i++) {
        let x = document.createElement("input");
        x.setAttribute("type","text");
        x.setAttribute("placeholder","Attribute");
        x.setAttribute("class","Attribute");
        document.getElementById("Attr").appendChild(x);
    }

}

function addName(tab){
    let opt = document.createElement("option");
    opt.text = tab.name + "";
    tab.opt = opt;
    opt.selected = true;
    document.getElementById("ShowTable").options.add(opt);
}

function showAttr(tab) {
   let tablenode = document.createElement("table");
   let thead = tablenode.createTHead();
   tablenode.createTBody();
   let tr = thead.insertRow();
   for (let j = 0; j < tab.columnNumber; j++){
       tr.insertCell(j);
       tr.cells[j].appendChild(document.createTextNode(document.getElementsByClassName("Attribute")[j].value));
       tab.columnContain.push(document.getElementsByClassName("Attribute")[j].value);
   }
   tab.table = tablenode;
   ele.appendChild(tablenode);
   ele.align = "center";
}

showTable.onchange = function () {
    if (theTable){
        ele.removeChild(theTable.table);
    }
    if (showTable.selectedIndex === 0){
        theTable = null;
        return;
    }

    for (let i = 0; i < tableArray.length; i++){
        if (tableArray[i].opt.selected) {
            theTable = tableArray[i];
            ele.appendChild(theTable.table);
            // tableArray[i].table.align = "center";
            ele.align = "center";
        }
    }
    fresh();
}