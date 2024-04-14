$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('input[type="text"]').on("input", function () {
        var input = $(this);
        var errorIcon = input.next(".error-icon-circle");
        var errorFeedback = input.parent().next(".invalid-feedback");
        var value = input.val();
        var message = "Please enter numbers only.";

        if (!/^\d*\.?\d*$/.test(value) && value !== "") {
            input.addClass("is-invalid");
            errorIcon.addClass("showError"); 
            errorIcon.show();
            errorIcon.attr("data-original-title", message); 
            errorIcon.tooltip('dispose').tooltip({ trigger: "hover" }); 
            errorFeedback.hide();
        } else {
            input.removeClass("is-invalid");
            errorIcon.removeClass("showError"); 
            errorIcon.hide();
            errorIcon.tooltip('hide'); 
            errorFeedback.hide();
        }
    });

    $("#calculateBtn").click(function () {
        var valid = true;
        $('input[type="text"]').each(function () {
            var input = $(this);
            var errorIcon = input.next(".error-icon-circle");
            var errorFeedback = input.parent().next(".invalid-feedback");

            if (input.val().trim() === "") {
                input.addClass("is-invalid");
                errorIcon.addClass("showError"); 
                errorIcon.show();
                errorIcon.attr("data-original-title", "This field is required."); 
                errorIcon.tooltip('dispose').tooltip({ trigger: "hover" }); 
                errorFeedback.show();
                errorFeedback.text("This field is required.");
                valid = false;
            } else if (input.hasClass("is-invalid")) {
                valid = false;
                errorIcon.tooltip("show");
            }
        });

        if (valid) {
            var age = $("#age").val();
            var income = parseFloat($("#income").val()) || 0;
            var extraIncome = parseFloat($("#extraIncome").val()) || 0;
            var deductions = parseFloat($("#deductions").val()) || 0;
            var totalIncome = income + extraIncome - deductions;
            var taxableIncome = totalIncome;
            var tax = 0;

            if (taxableIncome > 800000) {
                var incomeOver8Lakhs = taxableIncome - 800000;
                switch (age) {
                    case "<40":
                        tax += incomeOver8Lakhs * 0.3;
                        break;
                    case "40-59":
                        tax += incomeOver8Lakhs * 0.4;
                        break;
                    case ">=60":
                        tax += incomeOver8Lakhs * 0.1;
                        break;
                }
            }

            var resultText = `<i class="fas fa-coins"></i><p>Your overall income after tax deduction will be:</p><p class="result-highlight">
            ₹${(totalIncome - tax).toFixed(2)}</p>`;
            $("#modalBodyContent").html(resultText);
            $("#resultModal").modal("show");
        } else {
            $("#result").html("");
        }
    });
});
