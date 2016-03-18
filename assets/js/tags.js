$("#tag-form").submit(function(e) {
  console.log("prevented default");

  var res = $.ajax({
    url: "/api/tag",
    type: "POST",
    dataType: "text",
    data: {
      name: $("#name").val()
    }
  }).done(function(res) {
    console.log(JSON.stringify(res));
    $("#tags").append("<li>"+$("#name").val()+"</li>");
    $("#name").val("");
  })
  return false;
})
