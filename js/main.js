var rowCount;

function generateEdges(arr, arr2, div) {

    var tbl = document.getElementById("edge");
    if (tbl != null) tbl.parentNode.removeChild(tbl);
	tbl = document.createElement('table');
    tbl.setAttribute("border", "1");
    tbl.setAttribute("width", "100");
    tbl.id = "edge";
	tbl.insertRow(-1);
	for (var j=0; j<2; j++)	tbl.tBodies[0].rows[0].insertCell(-1).innerHTML = 'V' + (j + 1) + '';
    for (var i=1; i<=arr.length; i++) {
        tbl.insertRow(-1).insertCell(-1).innerHTML = arr2[i - 1] + 1;
        tbl.tBodies[0].rows[i].insertCell(-1).innerHTML = arr[i - 1] + 1;
    }
	div.appendChild(tbl);
}

function generate() {
	rowCount = document.querySelector(".active .rowCount").value;
    var divMatr = document.getElementsByClassName("matrix");
    var  tbl = document.getElementById("main");
    var  btn = document.getElementById("btn");
    var p  = document.getElementById("p");
    if (tbl != null && btn != null) {
        tbl.parentNode.removeChild(tbl);
        btn.parentNode.removeChild(btn);
    }
    if (p != null) {
        p.parentNode.removeChild(p);
    }
    var tblEdge = document.getElementById("edge");
    if (tblEdge != null) {
        tblEdge.parentNode.removeChild(tblEdge);
    }
    p  = document.createElement("p");
    p.id = "p";
	tbl = document.createElement('table');
    tbl.setAttribute("border", "1");
    tbl.setAttribute("width", "100");
    tbl.className = "main";
    tbl.id = "main";
	tbl.insertRow(-1);
	for (var j=0; j<=rowCount; j++)	tbl.tBodies[0].rows[0].insertCell(-1).innerHTML = j||'V';
	for (var i=1; i<=rowCount; i++)
	{
		tbl.insertRow(-1).insertCell(-1).innerHTML = i;
		for (var j=1; j<=rowCount; j++)	
		{
			var input = document.createElement('input');
			input.id=input.name='m_'+i+'_'+j;
			input.size = "1";
			tbl.tBodies[0].rows[i].insertCell(-1).appendChild(input);
		}
	}
    var div = document.querySelector(".active .matrix");
    if (div == undefined) {
        div = document.querySelector(".active .loop");
        if (div == undefined) {
            div = document.querySelector(".active .edge");
            if (div == undefined) {
                div = document.querySelector(".active .edgeGr");
                if (div == undefined) {
                    div = document.querySelector(".active .pow");
                }
            }
        }
    }
	div.appendChild(tbl);
    
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Решить";
    btn.className =  "btn btn-success";
    btn.id =  "btn";
    div.appendChild(btn);
    
    btn.addEventListener('click', function() {

    var div = document.querySelector(".active .matrix");
    if (div == undefined) {
        div = document.querySelector(".active .loop");
        if (div == undefined) {
            div = document.querySelector(".active .edge");
            if (div == undefined) {
                div = document.querySelector(".active .edgeGr");
                if (div == undefined) {
                    div = document.querySelector(".active .pow");
                }
            }
        }
    }

    
    var p  = document.getElementById("p");
    if (p != null) {
        p.parentNode.removeChild(p);
    }

    p  = document.createElement("p");
    p.id = "p";

    var matrix = getMatrix();
    if (div.className == "matrix") {
        if (A(matrix) == false) p.innerHTML = "Матрица не является матрицей смежности простого неориентированного графа";
        else p.innerHTML = "Матрица является матрицей смежности простого неориентированного графа";
    }
    if (div.className == "loop") {
        if (B(matrix).loop == false) p.innerHTML = "Матрица смежности не имеет петель";
        else p.innerHTML = "Матрица смежности имеет петли. Следующие вершины имеют петли: " + B(matrix).index + "";
    }
    if (div.className == "edge") {
        if (A(matrix) == false) {
            p.innerHTML = "Матрица не является матрицей смежности простого неориентированного графа";
        } else {
            generateEdges(CnE(matrix).edge, CnE(matrix).edge1, div);
            var edge = (CnE(matrix).edge.length + B(matrix).index.length) / 2;
            p.innerHTML = "Количество ребер - " + edge + "";
        } 
    }
    if (div.className == "edgeGr") {
        generateEdges(CnE(matrix).edge, CnE(matrix).edge1, div);
        var edge = CnE(matrix).edge.length;
        p.innerHTML = "Количество ребер - " + edge + "";
    }
    if (div.className == "pow") {
        var vertexPow = L(matrix);
        for (var i = 0; i < vertexPow.length; i ++) {
            p.innerHTML += "валентность вершины " + (i + 1) + " равна "+ vertexPow[i] + "<br>";
        }
        p.innerHTML += "<br>";
    }
    div.appendChild(p);
    });
}


function printMatrix(arr) {
    var  tbl = document.getElementById("table");
    if (tbl != null)
    tbl.parentNode.removeChild(tbl);
    tbl = document.createElement('table');
    tbl.setAttribute("border", "1");
    tbl.setAttribute("width", "100%");
    tbl.className = "table";
    tbl.id = "table";
    tbl.insertRow(-1);
    tbl.tBodies[0].rows[0].insertCell(-1).innerHTML ='<strong>V</strong>';
	for (var j=1; j<=arr.length; j++)	tbl.tBodies[0].rows[0].insertCell(-1).innerHTML ='<strong>' + j + '</strong>';
	for (var i=1; i<=arr.length; i++)
	{
		tbl.insertRow(-1).insertCell(-1).innerHTML ='<strong>' + i + '</strong>';
		for (var j=1; j<=arr.length; j++)	
		{
			tbl.tBodies[0].rows[i].insertCell(-1).innerHTML = arr[i-1][j-1];
		}
	}
    div = document.querySelector(".active .mart");
    div.appendChild(tbl);
}

function getMatrix() {
    var matrix = [];
    for (var i = 1; i <= rowCount; i++) {
        matrix[i-1] = [];
        for (var j = 1; j <= rowCount; j++) {
            var input = document.getElementById("m_"+i+"_"+j+"");
            matrix[i-1][j-1] = input.value;
        }
    }
    return matrix;
}



var matr = [[0, 1, 1, 0, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0]];

var array = [[0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0]];

function A(arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
        for (var j = i; j < arr.length; j++) {
            if (arr[i][j] != arr[j][i])  flag = false;
        }
    }
    return flag
}

function B(arr) {
    var loop = false, index = [];
    for (var i = 0; i < arr.length; i++) 
        if (arr[i][i] == 1) {
            loop = true;
            index.push(i + 1);
        }
    return {loop:loop, index:index};
}

function CnE(arr) {
    var edge = [];
    var edge1 = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[i][j] == 1) {
                edge.push(i);
                edge1.push(j);
            }
        }
    }
    return {edge:edge, edge1:edge1};
}

function L(arr) {
    var vertexPow = [];
    var counter;
    for (var i = 0; i < arr.length; i++) {
        vertexPow[i] = 0;
        counter = 0;
        if (arr[i][i] == 1) {
            counter++;
            vertexPow[i] = counter;
        }
        for(var j = 0; j < arr.length; j++) {
            if (arr[i][j] == 1) {
                counter++;
                vertexPow[i] = counter;
            }
        }
    }
    return vertexPow;
}

function addEdge(edges) {
    var arr = [];
    var vertex = 0, k;
    for (var i = 0; i < edges.length; i++) {
        for (var j = 0; j < edges[i].length; j++) {
            if (edges[i][j] > vertex) vertex = edges[i][j];
        }
    }
    for (var i = 0; i <= vertex; i++) {
        arr[i] = [];
        for (var j = 0; j <= vertex; j ++) {
            arr[i][j] = 0;
        }
    }

    for (var i = 0; i <= vertex; i++) {
        for (var j = 0; j < edges.length; j++) {
            if (edges[j][0] == i) {
                k = edges[j][1];
                arr[i][k] = 1;
            } 
            if (edges[j][1] == i) {
                k = edges[j][0];
                arr[i][k] = 1;
            }
            if (edges[j][0] == edges[j][1]) {
                arr[edges[j][0]][edges[j][1]] = 1;
            }
        }
    }
    return arr;
}

function getEdges() {
    var button_enter = document.querySelector('.dynamic_fields .js-enter');
    var input = document.getElementsByClassName('form-control');
    button_enter.addEventListener('click', function () {
        var arr = [];
        var arrEdges = [];
        for (var i = 0; i < input.length; i++) {
            arrEdges[i] = input[i].value - 1;
        }
        for (var i = 0; i < input.length/2; i++) {
            arr[i] = arrEdges.slice(i*2,i*2 + 2);
        }
        arr.splice(0,1);
        edges = arr;
        arr = addEdge(arr);
        printMatrix(arr);
        return arr;
    });
}

(function($) {
    $(function() {
      
      $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });
      
    });
    })(jQuery);


window.onload = function() {
    var button_add = document.querySelector('.dynamic_fields .js-add');

// ожидание клика на кнопку .add
button_add.addEventListener( 'click', function () {

    // определение блока, содержащего элементы
    var students = document.querySelector( '.dynamic_fields .students' );

    // клонирование образцового элемента
    var element = document.querySelector( '.example_student' ).cloneNode( true );

    // добавление класса к клонированному элементу
    element.classList.add( 'student' );

    // удаление класса из клонированного элемента
    element.classList.remove( 'example_student' );

    // добавление нового элемента к списку
    students.appendChild( element );
    
} );

// ожидание клика по документу
document.addEventListener( 'click', function ( el ) {

    // если клик был по элементу, который содержит класс remove
    if ( el.target && el.target.classList.contains( 'js-remove' ) ) {

        // определение прародительского блока, содержащего кнопку
        var child = el.target.closest( '.table' );

        // удаление элемента списка
        child.parentNode.removeChild( child );
    }
} );
getEdges();
}