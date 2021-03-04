'use strict';

window.onload = function () {
    document.getElementById('mstatus').onchange = mstatusChange;
    document.getElementById('submit').onclick = processForm;
    document.getElementById('resetForm').onclick = resetForm;
    document.getElementById('fname').focus();
}
function mstatusChange() {
    var marStatus = document.getElementById('mstatus').value;
    if (marStatus == 'Married') {
        document.getElementById('sname').disabled = false;
        document.getElementById('sname').focus();
    }
    else {
        document.getElementById('sname').disabled = true;
        document.getElementById('email').focus();
    }
}
function processForm() {
    var formGood = true;
    formGood = inputformGood(formGood);
    formGood = selectformGood(formGood);
    if (formGood == true) {
        document.getElementById('errorMsg').style.visibility = 'hidden';
        document.getElementById('myForm').submit();
    } else {
        document.getElementById('errorMsg').style.visibility = 'visible';
    }
}
function resetForm() {
    var labels = document.getElementsByTagName('label');
    for (var index = 0; index < labels.length; ++index) {
        labels[index].className = 'blacktext';
    }
    document.getElementById('errorMsg').style.visibility = 'hidden';
}
function inputformGood(formGood) {
    var gender = "";
    var marStatus = ""

    var inputs = document.getElementsByTagName('input');
    for (var index = 0; index < inputs.length; ++index) {
        var inpType = inputs[index].type;
        if (inpType != 'button' && inpType != 'reset') {
            var lbl = inputs[index].name + '_label';

            document.getElementById(lbl).className = 'blacktext';
            if ((inpType == 'text' || inpType == 'date' || inpType == 'email')
                && inputs[index].value == "" && inputs[index].disabled == false) {
                formGood = false;
                document.getElementById(lbl).className = 'redtext';
            }
            else if (inpType == 'password') {
                var pass1Val = document.getElementById('password1').value;
                var pass2Val = document.getElementById('password2').value;
                if (pass1Val != pass2Val || pass1Val + pass2Val == "") {
                    formGood = false;
                    document.getElementById(lbl).className = 'redtext';
                }
            }
            else if (inpType == 'radio' && inputs[index].name == 'gender'
                && inputs[index].checked) {
                gender = inputs[index].value;
            }
        }
    }
    if (gender == "") {
        formGood = false;
        document.getElementById('gender_label').className = 'redtext';
    }
    return formGood;
}
function selectformGood(formGood) {
    var mstat = document.getElementById('mstatus').value;
    if (mstat == "") {
        formGood = false;
        document.getElementById('mstatus_label').className = 'redtext';
    }
    else {
        document.getElementById('mstatus_label').className = 'blacktext';
    }
    return formGood;
}