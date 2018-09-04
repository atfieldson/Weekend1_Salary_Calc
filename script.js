console.log('js');

$(document).ready(readyOn);

function readyOn() {
    console.log('JQ');
    $('#submitButton').on('click', submitClick);
    $('#employeeTable').on('click', '#deleteButton', deleteTableRow);
    establishTable();
    calculateMonthlySalary();
}

let totalMonthlySalary = 0;
let totalAnnualSalary = 0;
let employeeList = [];

class Employee {
    constructor(firstName, lastName, employeeID, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeID = employeeID;
        this.annualSalary = annualSalary;
    }//end constructor
}//end NewEmployee

employeeList.push(new Employee('Jill', 'Smith', '2764', '67000'));
employeeList.push(new Employee('Eve', 'Jackson', '4209', '53500'));

function establishTable() {
    for (employee in employeeList) {
        $('table').append(` 
    <tr>
        <td >` + employeeList[employee].firstName + `</td>
        <td >` + employeeList[employee].lastName + `</td>
        <td >` + employeeList[employee].employeeID + `</td>
        <td class="annualSalary"><span>$</span>` + Number(employeeList[employee].annualSalary).toLocaleString() + `</td>
        <td><button id=deleteButton class="btn btn-secondary">Delete</button></td>
    </tr>`);
    }
}

function submitClick() {
    console.log('Hit');
    let firstName = $('#inputFirstName').val();
    let lastName = $('#inputLastName').val();
    let employeeID = $('#inputID').val();
    let annualSalary = Number($('#inputAnnualSalary').val());


    $('#errorMessage').detach();
    //for some reason, .empty() didn't work, but .detach() worked, jQuery website: 
    //If you want to remove elements without destroying their data or event handlers (so they can be re-added later), use .detach() instead. 

    if (checkForErrors()) {
        return false;
    }
    //push user input to employeList
    employeeList.push(new Employee(
        firstName,
        lastName,
        employeeID,
        annualSalary
    ));

    //add a table row with these values
    $('table').append(` 
    <tr>
        <td >` + employeeList[employeeList.length - 1].firstName + `</td>
        <td >` + employeeList[employeeList.length - 1].lastName + `</td>
        <td >` + employeeList[employeeList.length - 1].employeeID + `</td>
        <td class="annualSalary"><span>$</span>` + Number(employeeList[employeeList.length - 1].annualSalary.toFixed(2)).toLocaleString() + `</td>
        <td><button id=deleteButton class="btn btn-secondary">Delete</button></td>
    </tr>`);
    //clear the field
    $('#inputFirstName').val('');
    $('#inputLastName').val('');
    $('#inputID').val('');
    $('#inputAnnualSalary').val('');

    calculateMonthlySalary();

}

function deleteTableRow() {
    console.log('in delete table row');
    let removedEmployee = employeeList.indexOf(this.employeeID);
    // .indexOf is finding the first occurance of this.employeeID in the employeeList, since employeeID is individual,
    //it identifies the needed employee!  Also, removedEmployee is simply an index of employeeList.
    employeeList.splice(removedEmployee, 1);//the '1' indicates how many items to be removed
    $(this).parents('tr').empty();
    calculateMonthlySalary();
}

function checkForErrors() {
    //empty the error field
    let firstName = $('#inputFirstName').val();
    let lastName = $('#inputLastName').val();
    let employeeID = $('#inputID').val();
    let annualSalary = $('#inputAnnualSalary').val();

    //check to see if all fields are complete
    if (firstName === '') {
        console.log('FN error');
        $('#submitAndError').append(`<p id=errorMessage> Please complete the First Name field</p>`);
        return true;
    }

    else if (lastName === '') {
        console.log('LN error');
        $('#submitAndError').append(`<p id=errorMessage> Please complete the Last Name field</p>`);
        return true;
    }

    else if (employeeID === '') {
        console.log('EN error');
        $('#submitAndError').append(`<p id=errorMessage> Please complete the Employee ID field</p>`);
        return true;
    }

    //employee number must be 4 digits exactly long
    else if (employeeID.length !== 4) {
        console.log('EN not 4 digits long');
        $('#submitAndError').append(`<p id=errorMessage> The Employee ID field must be 4 digits long</p>`);
        return true;
    }
    //trying to check if the new employeeID already exists in the array
    else if ( checkIfIDAlreadyExists( employeeID )){
    console.log( 'employee ID is not different' );
    $('#submitAndError').append(`<p id=errorMessage> This Employee ID already exists, please choose another</p>`);
    return true;
    }
    

    else if (annualSalary === '') {
        console.log('AS error');
        $('#submitAndError').append(`<p id=errorMessage> Please complete the Annual Salary field</p>`);
        return true;
    };

}

function checkIfIDAlreadyExists( employeeIDInput ){
    for (let i = 0; i < employeeList.length; i++)
        if (employeeList[i].employeeID === employeeIDInput ) {
            return employeeList[i];
        }
}

function calculateMonthlySalary() {
    let totalAnnualSalary = 0

    //add up all the salaries and display it on the DOM

    for (employee in employeeList) {
        totalAnnualSalary += parseInt(employeeList[employee].annualSalary);
    }//end for

    //Divide it by 12 to get the monthly salary
    totalMonthlySalary = totalAnnualSalary / 12;
    $('#totalMonthlySalary').empty();
    $('#totalMonthlySalary').append('<span>$</span>' + Number(totalMonthlySalary.toFixed(2)).toLocaleString());
    //if totalMonthlySalary is >20,000, give it a red background
    if (totalMonthlySalary > 20000) {
        $('#totalMonthlySalaryP').css(
            { "background-color": "red", "color": "white" }
        );
    }//end if
}
