function compute() {
    var principal = document.getElementById("principal").value;
    if (principal.trim() == "" || principal <= 0 || principal % 1 != 0) {
        alert("Please enter a numebr a whole number that is above 0!");
        document.getElementById("principal").value = 0;
        var focusbox = document.getElementById("principal");
        focusbox.focus();

        return;
    }

    principal = parseInt(principal);
    console.log("Principal value is: " + principal + " with type: " + typeof(principal));

    var rate = parseInt(document.getElementById("rate").value);
    rate = parseFloat(rate);
    console.log("Rate value is: " + rate + "with type: " + typeof(rate));

    var years = parseInt(parseInt(document.getElementById("years").value));
    console.log("Years value is: " + years + "with type: " + typeof(years));
    var currentYear = new Date().getFullYear();
    currentYear = parseInt(currentYear);
    years = parseInt(years);
    console.log("The current year is: " + currentYear + " with type: " + typeof(currentYear));
    years = currentYear + years;
    console.log("The current value of years now is: " + years + " with type: " + typeof(years));

    var interest = parseFloat(principal * (years - currentYear) * rate / 100);
    console.log("The calculated interest is: " + interest  + "with type: " + typeof(interest));

    var amount = principal + interest;
    console.log("The calculated amount is: " + amount  + "with type: " + typeof(amount));

    var result = document.getElementById("result");

    result.innerHTML = "If you deposit $" + "<mark>" + principal + "</mark>" + ",\<br\> at an interest rate of " + "<mark>" + rate + "%" + "</mark>" + "\<br\> You will receive an amount of $" + "<mark>" + amount + "</mark>" + ",\<br\> in the year " + "<mark>" + years + "</mark>" + "\<br\>";
}

function updateRate() {
    var rateval = document.getElementById("rate").value;
    console.log("The value of rate is: " + rateval);
    document.getElementById("rate_val").innerText = rateval;
}
