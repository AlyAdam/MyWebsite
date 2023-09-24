function random_numberl() {
    var minNum = parseInt(document.querySelector("#value1").value);
    var maxNum = parseInt(document.querySelector("#value2").value);
    
    var calculate = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    document.querySelector("#Result").innerHTML =calculate;
}