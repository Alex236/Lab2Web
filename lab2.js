var trapeziums = new Array();

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

document.getElementById("AddTrapezium").addEventListener("click", function (event) {
    if (trapeziums.length == 0) {
        var table = document.getElementById("table");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = "Number";
        cell2.innerHTML = "Base1";
        cell3.innerHTML = "Base2";
        cell4.innerHTML = "Side1";
        cell5.innerHTML = "Side2";
    }
    var base1 = document.getElementById('Base1').value;
    var base2 = document.getElementById('Base2').value;
    var side1 = document.getElementById('Side1').value;
    var side2 = document.getElementById('Side2').value;
    trapeziums.push(new Trapezium(base1, base2, side1, side2));
    var table = document.getElementById("table");
    var row = table.insertRow(trapeziums.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = trapeziums.length - 1;
    cell2.innerHTML = base1;
    cell3.innerHTML = base2;
    cell4.innerHTML = side1;
    cell5.innerHTML = side2;
});

document.getElementById("ChangeSize").addEventListener("click", function (event) {
    var number = document.getElementById('ChangeSizeNumber').value;
    var coefficient = document.getElementById('coefficient').value;
    trapeziums[number].changeSize(coefficient);
    var temp = parseInt(number) + 1;
    var record = document.getElementById("table").rows[temp];
    record.cells[1].innerHTML = trapeziums[number].base1;
    record.cells[2].innerHTML = trapeziums[number].base2;
    record.cells[3].innerHTML = trapeziums[number].side1;
    record.cells[4].innerHTML = trapeziums[number].side2;
});

document.getElementById("GetFigureInfo").addEventListener("click", function (event) {
    var number = document.getElementById('GetFigureNumber').value;
    var message = "Perimeter: " + trapeziums[number].getPerimeter()
        + "\nArea: " + trapeziums[number].getArea()
        + "\nMiddle line: " + trapeziums[number].getMiddleLine()
        + "\nHeight: " + trapeziums[number].getHeight();
    var p = document.createElement("p");
    p.textContent = message;
    document.getElementById("messagesList").appendChild(p);
});

document.getElementById("AreSimilar").addEventListener("click", function (event) {
    var number1 = document.getElementById('IsSimilar1').value;
    var number2 = document.getElementById('IsSimilar2').value;
    var result = trapeziums[number1].isSimilar(trapeziums[number2]) ? "similar" : "not similar";
    var message = "Trapeziums " + number1 + " and " + number2 + " are " + result;
    var p = document.createElement("p");
    p.textContent = message;
    document.getElementById("messagesList").appendChild(p);
});
