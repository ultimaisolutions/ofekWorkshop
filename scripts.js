function tempConversion(inputTemp){
    var input = document.getElementById("celsius");
    var celsiusValue = input.value;

    //console.log("The value of the celsius is: " + celsiusValue);

    if(celsiusValue != ""){
        var farenheit = (celsiusValue * 9/5) + 32;
        document.getElementById("fahrenheit").value = farenheit;
        console.log("Converted to farenheit: " + farenheit);
    }
}

function weightConversion(inputWeight){
    var input = document.getElementById("kilo");
    var kgValue = input.value;
    console.log("The kg inserted is: " + kgValue);

    if(kgValue != ""){
        var lbsValue = kgValue * 2.2;
        document.getElementById("pounds").value = lbsValue;
        console.log("converted to lbs: " + lbsValue);
    }
}

function distanceConversion(){
    var input = document.getElementById("km");
    var kmValue = input.value;
    console.log("The km inserted is: " + kmValue);

    if(kmValue != ""){
        var milesValue = kmValue * 0.62137;
        document.getElementById("miles").value = milesValue;
        console.log("converted to miles: " + milesValue);
    }
}
