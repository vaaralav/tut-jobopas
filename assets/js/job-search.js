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

  var jobView = function jobView(job) {

  }

  var jobsPopup = function jobsPopup(tagName, data) {
    $(".ontop").show();
    $("body").addClass("stop-scrolling");
    var $jobsPopup = $("<div>", {
      id: "jobs-popup"
    });
    window.data = data;
    $jobsPopup.append("<h3>" + tagName + "</h3>");
    $jobsPopup.append("<p>Yhteensä " + data.found_items + " hakutulosta.");
    $jobsPopup.append($("<div>", {class: "jobs-container"}));
    data.items.forEach(function (job) {
      var $jobView = $("<div>", {class: "job-view"});
      $jobView.append("<h4>" + job.name
        + " <small>" + job.employer + "</small></h4>");
      console.log($jobView);
      $jobsPopup.find(".jobs-container").append($jobView);
    })
    console.log(data);
    $(".ontop").append($jobsPopup);
  }

  var spacesToDashes = function(str) {
    str.replaceAll('data name')
  }


  var searchJobs = function searchJobs(tagName) {
    console.log("Search!");
    $.getJSON('https://tyopaikat.api.oikotie.fi/rest/1/job-search?jq=' + tagName + '', function(data) {
      jobsPopup(tagName, data);
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
