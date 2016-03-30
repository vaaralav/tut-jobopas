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

$(".tags-list__tag__buttons__edit").click(function() {
  var tag = $(this).parents(".tags-list__tag");
  // Store the old value and remove the label
  var oldVal = $(tag).find(".tags-list__tag__name").text();
  $(tag).find(".tags-list__tag__name").remove()

  // Insert text input
  $(tag).append('<input type="text" value=' + oldVal + '/>');

  $(this).removeClass(".tags-list__tag__buttons__edit")
    .addClass(".tags-list__tag__buttons__save")
    .text("Tallenna");

  $(this).siblings('.tags-list__tag__buttons__remove')
    .removeClass('.tags-list__tag__buttons__remove')
    .addClass('.tags-list__tag__buttons__cancel')
    .text("Peru");

})
