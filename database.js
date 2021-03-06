"use strict";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDvgJB9iMN0wKe9dsOcq6zOvyBXY18F-50",
    authDomain: "employeedatabasefun.firebaseapp.com",
    databaseURL: "https://employeedatabasefun.firebaseio.com",
    projectId: "employeedatabasefun",
    storageBucket: "employeedatabasefun.appspot.com",
    messagingSenderId: "1057084575215"
  };

//Assign the reference to the database to a variable
firebase.initializeApp(config);
var database = firebase.database();

//Declare Global Vars
var nameInput; //input
var position; //input
var salary; //input
var startDate; //input


$("#submit-info").on("click",function(event){
    
    event.preventDefault(); //this prevents the page from reloading every submit
    nameInput = $("#employee-name").val().trim();
    position = $("#employee-position").val().trim();
    salary = $("#employee-salary").val().trim();
    startDate = $("#employee-startDate").val().trim();

    //To set the database once info is updated
    database.ref().push({
        name: nameInput,
        position: position,
        salary: salary,
        startDate: startDate
    });

    //console.log("DEBUG: ", nameInput, position, salary, startDate);
});

//To update the date from the database to the table
database.ref().on(
    'child_added',

    function(snapshot){
        var sv = snapshot.val();

        //Convert Date
        var newFormat = "MM/DD/YYYY";
        var convertDate = moment(sv.startDate, newFormat);
        var newMoment = moment();


        var tableRow = $("<tr>");
        var nameInfo = $("<th>").text(sv.name);
        var positionInfo = $("<th>").text(sv.position);
        var salaryInfo = $("<th>").text(sv.salary);
        var startDateInfo = $("<th>").text(convertDate.format("MM/DD/YYYY"));
        var monthsWorked = $("<th></th>").text(moment().diff(convertDate, "months"));
        var calcTotalBilled = ( moment().diff(convertDate, "months") * parseInt(sv.salary));
        var totalBilled = $("<th></th>").text(calcTotalBilled);


        tableRow.append(nameInfo, positionInfo, startDateInfo, monthsWorked, salaryInfo, totalBilled);

        $("#employee-table").append(tableRow);
    
    }
);


//Get info from form
    //IDS
    //employee-name
    //employee-postiion
    //employee-
//Push info to Firebase
//Update table with inserted firbase info


  








