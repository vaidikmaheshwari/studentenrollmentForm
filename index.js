
var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = 'api/iml';
var stuDBName = 'Stu-DB';
var stuRelationName = 'StuData';
var connToken = '90933127|-31949318693959464|90951276';

$('#stuid').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data) ;
    localStorage.setItem('recno',lvData.rec_no);
}

function getStuIdAsJsonObj(){
    var stuid = $('#stuid').val();
    var jsonStr = {
        id:stuid
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record =  JSON.parse(jsonObj.data).record ;
    $('#stuname').val(record.name);
    $('#grade').val(record.grade);
    $('#birthdate').val(record.birthdate);
    $('#address').val(record.address);
    $('#enrollmentdate').val(record.enrollmentdate);
}


function resetForm(){
    $('#stuid').val("");
    $('#stuname').val("");
    $('#grade').val("");
    $('#birthdate').val("");
    $('#address').val("");
    $('#enrollmentdate').val("");
    $('#stuid').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#update').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#stuid').focus();
}

function validateData(){
    var stuid,stuname,grade,birthdate,address,enrollmentdate;
    stuid=$('#stuid').val();
    stuname=$('#stuname').val();
    grade = $('#grade').val();
    birthdate = $('#birthdate').val();
    address = $('#address').val();
    enrollmentdate = $('#enrollmentdate').val();
  
    if(stuid ===''){
        alert('student id missing');
        $('#stuid').focus();
        return "";
    }
    
    if(stuname ===''){
        alert('student name missing');
        $('#stuname').focus();
        return "";
    }

    if(grade ===''){
        alert('grade missing');
        $('#grade').focus();
        return "";
    }

    if(birthdate ===''){
        alert('birthdate missing');
        $('#birthdate').focus();
        return "";
    }

    if(address ===''){
        alert('address missing');
        $('#address').focus();
        return "";
    }

    if(enrollmentdate ===''){
        alert('enrollmentdate missing');
        $('#enrollmentdate').focus();
        return "";
    }
    
    var jsonStrObj ={
        id:stuid,
        name:stuname,
        grade:grade,
        birthdate: birthdate,
        address:address,
        enrollmentdate:enrollmentdate,
       
    };
    
    return JSON.stringify(jsonStrObj);
}

function getStu(){
    var stuIdJsonObj = getStuIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,stuIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#stuname').focus();
    }
    else if(resJsonObj === 200){
        $('#stuid').prop('disabled',true);
        fillData(resJsonObj);
        $('#update').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#stuname').focus(); 
    }
}

function saveData(){
    var jsonStrObj = validateData();
    console.log(jsonStrObj);
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stuDBName,stuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#stuid').focus();
}

function updateData(){
    $('#update').prop('disabled',true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,stuDBName,stuRelationName,localStorage.getItem("recno") );
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#stuid').focus();
}

