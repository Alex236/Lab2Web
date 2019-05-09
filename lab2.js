var trapeziums = new Array();
var tableContainer = document.getElementById("tableContainer");

class Trapezium {
    constructor(base1, base2, side1, side2) {
        this.base1 = parseInt(base1);
        this.base2 = parseInt(base2);
        this.side1 = parseInt(side1);
        this.side2 = parseInt(side2);
    }

    changeSize(coefficient) {
        this.base1 *= coefficient;
        this.base2 *= coefficient;
        this.side1 *= coefficient;
        this.side2 *= coefficient;
    }

    getArea() {
        return (this.base1 + this.base2) * this.getHeight() / 2
    }

    getPerimeter() {
        return this.base1 + this.base2 + this.side1 + this.side2;
    }

    isSimilar(trapezium) {
        var isSimilar = 0;
        var coeficient = 0;
        coeficient = this.base1 / trapezium.base1;
        if (this.base2 / trapezium.base2 == coeficient) isSimilar++;
        if (this.side1 / trapezium.side1 == coeficient) isSimilar++;
        if (this.side2 / trapezium.side2 == coeficient) isSimilar++;
        if (isSimilar == 3) return true;
        isSimilar = 0;
        coeficient = this.base1 / trapezium.base2;
        if (this.base2 / trapezium.base1 == coeficient) isSimilar++;
        if (this.side1 / trapezium.side2 == coeficient) isSimilar++;
        if (this.side2 / trapezium.side1 == coeficient) isSimilar++;
        if (isSimilar == 3) return true;
        return false;
    }

    getMiddleLine() {
        return (this.base1 + this.base2) / 2;
    }

    getHeight() {
        var a = Math.pow(this.side1, 2);
        var b = Math.pow(this.base2 - this.base1, 2);
        var c = Math.pow(this.side1, 2);
        var d = Math.pow(this.side2, 2);
        var e = 2 * (this.base1 - this.base2);
        return Math.sqrt(a - Math.pow((b + c - d) / e, 2));
    }
}

outputResultInTable = () => {
    document.getElementById("table").remove();
    var table = document.createElement("table");
    table.id = "table";
    tableContainer.appendChild(table);
    trapeziums.forEach((trapezium, i) => {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = i;
        cell2.innerHTML = trapezium.base1;
        cell3.innerHTML = trapezium.base2;
        cell4.innerHTML = trapezium.side1;
        cell5.innerHTML = trapezium.side2;
    });
    var row = table.insertRow(0);
    var cellForName1 = row.insertCell(0);
    var cellForName2 = row.insertCell(1);
    var cellForName3 = row.insertCell(2);
    var cellForName4 = row.insertCell(3);
    var cellForName5 = row.insertCell(4);
    cellForName1.innerHTML = "Index";
    cellForName2.innerHTML = "Base1";
    cellForName3.innerHTML = "Base2";
    cellForName4.innerHTML = "Side1";
    cellForName5.innerHTML = "Side2";
};

document.getElementById("AddTrapezium").addEventListener("click", function(event) {
    var base1 = document.getElementById('Base1').value;
    var base2 = document.getElementById('Base2').value;
    var side1 = document.getElementById('Side1').value;
    var side2 = document.getElementById('Side2').value;
    trapeziums.push(new Trapezium(base1, base2, side1, side2));
    outputResultInTable();
});

document.getElementById("deleteFigure").addEventListener("click", function(event) {
    var number = document.getElementById("DeleteFigureNumber").value;
    trapeziums.splice(number, 1);
    outputResultInTable();
});

document.getElementById("ChangeSize").addEventListener("click", function(event) {
    var number = document.getElementById('ChangeSizeNumber').value;
    var coefficient = document.getElementById('coefficient').value;
    trapeziums[number].changeSize(coefficient);
    outputResultInTable();
});

document.getElementById("GetFigureInfo").addEventListener("click", function(event) {
    var number = document.getElementById('GetFigureNumber').value;
    var message = "Perimeter: " + trapeziums[number].getPerimeter() +
        "\nArea: " + trapeziums[number].getArea() +
        "\nMiddle line: " + trapeziums[number].getMiddleLine() +
        "\nHeight: " + trapeziums[number].getHeight();
    var p = document.createElement("p");
    p.textContent = message;
    document.getElementById("messagesList").appendChild(p);
});

document.getElementById("AreSimilar").addEventListener("click", function(event) {
    var number1 = document.getElementById('IsSimilar1').value;
    var number2 = document.getElementById('IsSimilar2').value;
    var result = trapeziums[number1].isSimilar(trapeziums[number2]) ? "similar" : "not similar";
    var message = "Trapeziums " + number1 + " and " + number2 + " are " + result;
    var p = document.createElement("p");
    p.textContent = message;
    document.getElementById("messagesList").appendChild(p);
});