$('#addBlogButton').submit(function (e) {
 $('.alert.alert-danger').hide();
 if (!$('input#blogTitle').val() || !$('textarea#blogText').val()) {

 if ($('.alert.alert-danger').length) {
   $('.alert.alert-danger').show();
  } else {
    $(this).prepend('<div role="alert" class="alert alert-danger">
    All fields required, please try again</div>'); 
 }
     return false;
 }

});

