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

  var spacesToDashes = function(str) {
    str.replaceAll('data name')
  }


  var searchJobs = function searchJobs(tagName) {
    console.log("Search!");
    $.getJSON('https://tyopaikat.api.oikotie.fi/rest/1/job-search?jq=' + tagName + '', function(data) {
      console.log(data);
    });
  }


  /**
   * [description]
   * @param  {Object} event) {               if ($(this).val().length > 0) {      io.socket.get('/api/tag?where [description]
   * @return {[type]}        [description]
   */
  $("#job-search-input").on('input', function(event) {
    if ($(this).val().length > 0) {
      io.socket.get('/api/tag?where={"name":{"startsWith":"' + encodeURIComponent($(this).val()) + '"}}',
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

  $('#job-search-actions').on('click', '.job-search-action' ,function(event) {
    event.preventDefault();
    searchJobs($(this).text());
  })
})();
