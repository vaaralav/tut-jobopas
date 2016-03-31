$(document).ready(function() {
  /**
   * Listen for add tag form
   * @param  {[type]} e) {             console.log("prevented default");  var res [description]
   * @return {[type]}    [description]
   */
  $("#tag-form").submit(function(e) {
    console.log("prevented default");

    var res = $.ajax({
      url: "/api/tag",
      type: "POST",
      dataType: "json",
      data: {
        name: $("#name").val()
      }
    }).done(function(res) {
      console.log(res);
      $("#tags-list").append(createTag(res.id, res.name));
      $("#name").val("");
    })
    return false;
  })

  /**
   * Listen edit tag button
   * @param  {[type]} ) {             var tag [description]
   * @return {[type]}   [description]
   */
  $("#tags-list").on("click", ".tags-list__tag__buttons__edit", function() {
    var tag = $(this).parents(".tags-list__tag");
    editTag(tag);
  });


  $("#tags-list").on("click", ".tags-list__tag__buttons__cancel", function() {
    var tag = $(this).parents(".tags-list__tag");
    cancelEdit(tag);
  });

  $("#tags-list").on("click", ".tags-list__tag__buttons__remove", function () {
    var tag = $(this).parents(".tags-list__tag");
    removeTag(tag);
  })

  $("#tags-list").on("click", ".tags-list__tag__buttons__save", function() {
    var tag = $(this).parents(".tags-list__tag");
    saveTag(tag);
  })
});

/**
 * UI changes when Edit Tag button is clicked
 * @param  {jQuery element} tag Current tag.
 */
var editTag = function editTag(tag) {
  // Store the old value and remove the label
  var oldVal = $(tag).find(".tags-list__tag__name").text();

  // Hide the original value
  $(tag).find(".tags-list__tag__name").toggle()

  // Insert text input
  $(tag).append('<input type="text" value="' + oldVal.trim() + '"/>');

  toggleButtons(tag);

}

var cancelEdit = function cancelEdit(tag) {
  // Remove input field
  $(tag).find("input").remove();

  // Show the original value
  $(tag).find(".tags-list__tag__name").toggle();

  toggleButtons(tag);
}

var removeTag = function removeTag(tag) {
  var tagID = $(tag).attr('data-id');
  var res = $.ajax({
    url: "/api/tag/" + tagID,
    type: "DELETE",
    dataType: "text",
  }).done(function(res) {
    console.log(JSON.stringify(res));
    $(tag).remove();
  })
}


var saveTag = function(tag) {
  var tagID = $(tag).attr('data-id');
  var editedTag = $(tag).find('input').val();
  var res = $.ajax({
    url: "/api/tag/" + tagID,
    type: "PUT",
    dataType: "text",
    data: {
      name: editedTag
    }
  }).done(function(res) {
    console.log(JSON.stringify(res));
    $(tag).find('input').remove();
    $(tag).find(".tags-list__tag__name").text(editedTag).toggle();
    toggleButtons(tag);
  })
}

var toggleButtons = function toggleButtons(tag) {
  // Toggle Edit Button to Save Button
  $(tag).find(".tags-list__tag__buttons__edit").toggle();
  $(tag).find(".tags-list__tag__buttons__save").toggle();

  // Toggle Remove Button to Cancel Button
  $(tag).find(".tags-list__tag__buttons__remove").toggle();
  $(tag).find(".tags-list__tag__buttons__cancel").toggle();
}

var createTag = function createTag(id, name) {
  var $tag = $("<div>", {
    class: "tags-list__tag",
    "data-id": id
  });

  console.log($tag);

  var $tagName = $("<div>", {class: "tags-list__tag__name"});
  $tagName.text(name);

  $tag.append($tagName);
  $tag.append(
    '<div class="tags-list__tag__buttons">'+
    '<button class="tags-list__tag__buttons__edit">Muokkaa</button>\n'+
    '<button class="tags-list__tag__buttons__save">Tallenna</button>\n'+
    '<button class="tags-list__tag__buttons__remove">Poista</button>\n'+
    '<button class="tags-list__tag__buttons__cancel">Peru</button>\n'+
    '</div>'
  );
  //$("#tags-list").append($tag);
  return $tag;
}

