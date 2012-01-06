(function() {
  $(function() {
    var parseURL, show_message, twitter_api_url;
    show_message = function(msg) {
      return $('#message').hide().text(msg).fadeIn(2222, function() {
        return $('#message').append('!');
      });
    };
    $(function() {
      return show_message("World");
    });
    $('#message').click(function() {
      return show_message("Neighborhood");
    });
    twitter_api_url = "http://search.twitter.com/search.json";
    parseURL = function(text) {
      var urlRegex;
      urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return text.replace(urlRegex, function(url) {
        return "<a href=\"" + url + "\">" + url + "</a>";
      });
    };
    $(".button").click(function() {
      var $button, newVal, oldValue;
      $button = $(this);
      oldValue = document.getElementById("twitter-number").value;
      if ($button.text() === "+") {
        newVal = parseFloat(oldValue) + 1;
      } else {
        if (oldValue >= 1) {
          newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      return document.getElementById("twitter-number").value = newVal;
    });
    $("#twitter-string").focus();
    $("#tweet-json").click(function() {
      var queryObject, query_string;
      if (document.getElementById("twitter-user").checked === true) {
        twitter_api_url = "http://api.twitter.com/1/statuses/user_timeline.json";
        queryObject = {
          screen_name: document.getElementById("twitter-string").value,
          count: document.getElementById("twitter-number").value
        };
        query_string = $.param(queryObject);
        return $.ajax({
          type: "GET",
          url: "" + twitter_api_url + "?" + query_string,
          dataType: "jsonp",
          timeout: 10000,
          error: function(xhr, textStatus, errorThrown) {
            return alert("An error occurred! " + errorThrown);
          },
          success: function(data, textStatus) {
            return $.each(data, function(i, tweet) {
              var tweet_html;
              console.log(tweet);
              tweet_html = '<dl><dt>' + tweet.user.screen_name + '<dd>' + parseURL(tweet.text) + '</dl>';
              return $('#tweet-container').append(tweet_html);
            });
          }
        });
      } else {
        twitter_api_url = "http://search.twitter.com/search.json";
        queryObject = {
          q: document.getElementById("twitter-string").value,
          rpp: document.getElementById("twitter-number").value
        };
        query_string = $.param(queryObject);
        return $.ajax({
          type: "GET",
          url: "" + twitter_api_url + "?" + query_string,
          dataType: "jsonp",
          error: function(xhr, textStatus, errorThrown) {
            return alert("An error occurred! " + errorThrown);
          },
          success: function(data, textStatus) {
            return $.each(data.results, function(i, tweet) {
              var tweet_html;
              console.log(tweet);
              tweet_html = '<dl><dt>' + tweet.from_user + '<dd>' + parseURL(tweet.text) + '</dl>';
              return $('#tweet-container').append(tweet_html);
            });
          }
        });
      }
    });
    return $("#clear-tweets").click(function() {
      return $("#tweet-container").empty();
    });
  });
}).call(this);
