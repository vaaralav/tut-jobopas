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
    // Build a jobView object as a link with div within
    var $jobView = $("<a>", {
      href: job.url,
      target: "_blank",
      title: job.name,
    });
    var $jobViewDiv = $("<div>", {class: "job-view"});
    $jobViewDiv.append("<h4>" + job.name
      + " <small>" + job.employer + "</small></h4>");

    return $jobView.append($jobViewDiv);
  }

  // Builds and adds a popup showing search results
  var jobsPopup = function jobsPopup(tagName, data) {
    // Disable app under the popup
    $(".ontop").show();
    // Disable scrolling
    $("body").addClass("stop-scrolling");

    // The popup object
    var $jobsPopup = $("<div>", {
      id: "jobs-popup"
    });
    $jobsPopup.append( $("<div>", {class: "close-button-container"}).append("<button>X</button>") );
    $jobsPopup.append("<h3>" + tagName + "</h3>");
    $jobsPopup.append("<p>Yhteensä " + data.found_items + " hakutulosta.");

    // Where the jobs are
    $jobsPopup.append($("<div>", {class: "jobs-container"}));
    data.items.forEach(function (job) {

      // Add new job to the jobs container
      $jobsPopup.find(".jobs-container").append(jobView(job));
    })

    if($jobsPopup.find(".job-view").length < data.found_items) {
      $jobsPopup.find(".jobs-container")
        .append("<button type='button' id='more-jobs' class='btn btn-primary'>Lataa lisää ilmoituksia</button>");
    }


    $(".ontop").append($jobsPopup);
  }



  var spacesToDashes = function(str) {
    str.replaceAll('data name')
  }

  var jobsBaseURL = (function() {
    return "https://tyopaikat.api.oikotie.fi/rest/1/job-search?limit=10&jq="
  })();

  var searchJobs = function searchJobs(tagName) {
    console.log("Search!");
    $(".ontop").show();
    $.getJSON(jobsBaseURL + encodeURIComponent(tagName.replace(/ /g, '-')) + '', function(data) {
      jobsPopup(tagName, data);
    });
  }

  var moreJobs = function moreJobs() {
    $("#more-jobs").text("...");
    var tagName = $("#jobs-popup h3").text();

    var url = jobsBaseURL + encodeURIComponent(tagName.replace(/ /g, '-'))
    url += "&offset=" + $(".job-view").length;
    $.getJSON(url, function(data) {
      $("#more-jobs").remove();
      data.items.forEach(function(job) {
        $(".jobs-container").append(jobView(job));
      })

      if($(".job-view").length < data.found_items) {
        $(".jobs-container")
          .append("<button type='button' id='more-jobs' class='btn btn-primary'>Lataa lisää ilmoituksia</button>");
      }
    })
  }

  $(".ontop").on('click', '#more-jobs', function(event) {
    event.preventDefault();
    moreJobs();
  });


  /**
   * Automagic search
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

  // Click on button returned by automagic search
  $('#job-search-actions').on('click', '.job-search-action' ,function(event) {
    event.preventDefault();
    searchJobs($(this).text());
  })


  /**
   * Closes and clears the popup div
   * @param  {Object} event
   */
  var closePopup = function closePopup(event) {
    event.preventDefault();
    $(".ontop").hide();
    $("body").removeClass("stop-scrolling");
    $("#jobs-popup").remove();
  }

  // Listen to close button click
  $(".ontop").on('click', '.close-button-container > button', function(event) {
    closePopup(event);
  })

  // Listen to esc
  $(document).keyup(function(event) {
    // 27 = esc
    if(event.keyCode === 27 && $("body").hasClass("stop-scrolling")) {
      closePopup(event);
    }
  });


})();
