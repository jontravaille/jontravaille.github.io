
$(document).ready(function() {
    
    var yourName;
    var yourEmail;
    var goto;
    var sign;
    var createName;
    var createEmail;
    var join;

    var list = {};
    var idlist = [];
    
    goto = $('#login');
    sign = $('#create');
    
    join = $('#createAccount');
    
    goto.click(function() {
        yourName = document.getElementById('name').value;
        yourEmail = document.getElementById('email').value;
        
        var obj = JSON.parse(localStorage.getItem('trello'));
        
        if (obj[0].typed_name == yourName) {
            window.location.href = 'trello_list.html';            
        }
        else {
            alert("You typed wrong name/email or there is no account. Please check again.");
        }
    }); 
    
    sign.click(function() {
       window.location.href = 'createuser.html'; 
    });
    
    join.click(function(form) {
//        createName = $('#crtname').value;
        createName = document.getElementById('crtname').value;
        createEmail = document.getElementById('crtemail').value;
//        createEmail = $('#crtemail').value;
        
        list["typed_name"] = createName;
        list["typed_email"] = createEmail;
        
        idlist.push(list);
        console.log(JSON.stringify(idlist));
        localStorage.setItem("trello",JSON.stringify(idlist));
        
        window.location.href = 'login.html';
//        window.location.href = 'trello_list.html';
    });
    
});