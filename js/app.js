function isValidStudentNumber(value) {
if (typeof value !== "string") return false;
return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
if (typeof value !== "string") return false;
var noSpace = !/\s/.test(value);
var longEnough = value.length >= 8;
var hasUpper = /[A-Z]/.test(value);
var hasDigit = /\d/.test(value);
var hasSymbol = /[@$!]/.test(value);
return noSpace && longEnough && hasUpper && hasDigit && hasSymbol;
}

function checkEmail(value) {
return /^\S+@\S+\.\S+$/.test(value.trim());
}

function checkMobile(value) {
return /^(09\d{9}|\+639\d{9})$/.test(value.trim());
}

if (typeof document !== "undefined") {
window.onload = function () {

var form = document.getElementById("registrationForm");

var get = function (id) {
return document.getElementById(id);
};

var showError = function (fieldId, errorId, msg) {
get(errorId).textContent = msg;
var field = get(fieldId);
if (msg) {
field.setAttribute("aria-invalid", "true");
} else {
field.setAttribute("aria-invalid", "false");
}
return msg === "";
};

var validateName = function () {
var name = get("fullName").value.trim();
if (name.length < 2) {
return showError("fullName", "fullNameError", "Please type your full name (at least 2 letters).");
}
return showError("fullName", "fullNameError", "");
};

var validateStudentNumber = function () {
if (!isValidStudentNumber(get("studentNumber").value)) {
return showError("studentNumber", "studentNumberError", "Enter a student number in the format 24-1234-123.");
}
return showError("studentNumber", "studentNumberError", "");
};

var validateEmail = function () {
if (!checkEmail(get("email").value)) {
return showError("email", "emailError", "Please enter a valid email.");
}
return showError("email", "emailError", "");
};

var validateMobile = function () {
if (!checkMobile(get("mobileNumber").value)) {
return showError("mobileNumber", "mobileNumberError", "Use 09xxxxxxxxx or +639xxxxxxxxx.");
}
return showError("mobileNumber", "mobileNumberError", "");
};

var validatePassword = function () {
if (!isValidPassword(get("password").value)) {
return showError("password", "passwordError", "Password needs 8+ chars, uppercase, a number and @ $ or !.");
}
return showError("password", "passwordError", "");
};

var validateConfirm = function () {
if (get("confirmPassword").value !== get("password").value || get("confirmPassword").value === "") {
return showError("confirmPassword", "confirmPasswordError", "Passwords do not match.");
}
return showError("confirmPassword", "confirmPasswordError", "");
};

var validateCourse = function () {
var c = get("course").value;
if (c !== "BSIT" && c !== "BSCS") {
return showError("course", "courseError", "Please pick a course.");
}
return showError("course", "courseError", "");
};

var validateTerms = function () {
if (!get("terms").checked) {
return showError("terms", "termsError", "You need to agree to the terms.");
}
return showError("terms", "termsError", "");
};

form.onsubmit = function (e) {
e.preventDefault();

var results = [
validateName(),
validateStudentNumber(),
validateEmail(),
validateMobile(),
validatePassword(),
validateConfirm(),
validateCourse(),
validateTerms()
];

var allGood = true;
for (var i = 0; i < results.length; i++) {
if (results[i] === false) {
allGood = false;
}
}

if (allGood) {
get("summaryName").textContent = get("fullName").value.trim();
get("summaryStudentNumber").textContent = get("studentNumber").value.trim();
get("summaryEmail").textContent = get("email").value.trim();
get("summaryMobileNumber").textContent = get("mobileNumber").value.trim();
get("summaryCourse").textContent = get("course").value;

get("registrationSummary").hidden = false;
get("successMessage").textContent = "Registration details validated successfully!";
}
};

get("password").oninput = function () {
var pw = get("password").value;
if (pw === "") {
get("passwordFeedback").textContent = "";
} else if (isValidPassword(pw)) {
get("passwordFeedback").textContent = "Strong password.";
} else {
get("passwordFeedback").textContent = "Needs 8+ chars, uppercase, number and @ $ or !.";
}
};

get("fullName").onblur = function () {
validateName();
};

get("course").onchange = function () {
validateCourse();
};

get("terms").onchange = function () {
validateTerms();
};

get("studentNumber").oninput = function () {
if (get("studentNumberError").textContent !== "") validateStudentNumber();
};

get("email").oninput = function () {
if (get("emailError").textContent !== "") validateEmail();
};

get("mobileNumber").oninput = function () {
if (get("mobileNumberError").textContent !== "") validateMobile();
};

get("confirmPassword").oninput = function () {
if (get("confirmPasswordError").textContent !== "") validateConfirm();
};

form.onreset = function () {
var errorIds = ["fullNameError", "studentNumberError", "emailError", "mobileNumberError", "passwordError", "confirmPasswordError", "courseError", "termsError"];
for (var i = 0; i < errorIds.length; i++) {
get(errorIds[i]).textContent = "";
}

var fieldIds = ["fullName", "studentNumber", "email", "mobileNumber", "password", "confirmPassword", "course", "terms"];
for (var j = 0; j < fieldIds.length; j++) {
get(fieldIds[j]).setAttribute("aria-invalid", "false");
}

get("passwordFeedback").textContent = "";
get("successMessage").textContent = "";

var summaryIds = ["summaryName", "summaryStudentNumber", "summaryEmail", "summaryMobileNumber", "summaryCourse"];
for (var k = 0; k < summaryIds.length; k++) {
get(summaryIds[k]).textContent = "";
}

get("registrationSummary").hidden = true;
};

};
}

if (typeof module !== "undefined" && module.exports) {
module.exports = { isValidStudentNumber: isValidStudentNumber, isValidPassword: isValidPassword };
}
