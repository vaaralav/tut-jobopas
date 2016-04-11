(function() {
  var createAction = function createAction(tag) {
    var $jobSearchAction = $("<a>", {
      "class": "btn job-search-action btn-primary",
      "data-id": tag.id,
      "role": "button",
      "text": tag.name,
      "href": "#"
    });

    return $jobSearchAction;
  }



  $("#job-search-input").on('input', function(event) {
    if ($(this).val().length > 0) {
      io.socket.get('/api/tag?where={"name":{"startsWith":"' + $(this).val() + '"}}',
        function(data) {
          $("#job-search-actions").empty();

          data.forEach(function(tag) {
            $("#job-search-actions").append(createAction(tag));
          });
          if(data.length == 0) {
            $("#job-search-actions").text("Aihetunnisteita ei löydy.");
          }
        }
      );
    }
    else if($(this).val().length == 0){
      $("#job-search-actions").empty();
    }
  });
})();
