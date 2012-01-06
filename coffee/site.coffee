$ ->

##test coffeescript function to check if it's working
    show_message = (msg) ->
        $('#message').hide().text(msg).fadeIn(2222,-> $('#message').append('!'))
 
    $ -> show_message "World"
    $('#message').click -> show_message "Neighborhood"


    twitter_api_url = "http://search.twitter.com/search.json"


    parseURL = (text) ->
        urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        text.replace urlRegex, (url) ->
            "<a href=\"" + url + "\">" + url + "</a>"

##increment/decrement function ported from js example at http://css-tricks.com/4011-number-increment-buttons/ by Chris Coyier  
    $(".button").click ->
        $button = $(this)
        oldValue = document.getElementById("twitter-number").value
        if $button.text() is "+"
            newVal = parseFloat(oldValue) + 1
        else
            if oldValue >= 1 then newVal = parseFloat(oldValue) - 1
            else newVal = 0
        document.getElementById("twitter-number").value = newVal
            
    $("#twitter-string").focus()

##Form results are serialized into string for URL query for Ajax call to Twitter api
    $("#tweet-json").click ->
        if document.getElementById("twitter-user").checked is true
            twitter_api_url = "http://api.twitter.com/1/statuses/user_timeline.json"
            queryObject =
                screen_name: document.getElementById("twitter-string").value
                count: document.getElementById("twitter-number").value
            query_string = $.param(queryObject)
            $.ajax
                    type: "GET"
                    url: "#{twitter_api_url}?#{query_string}"    
                    dataType: "jsonp"
                    timeout: 10000
                    error: (xhr, textStatus, errorThrown) ->
                        alert "An error occurred! " + errorThrown
                    success: (data, textStatus) ->
                        $.each data, (i, tweet) ->
                            console.log(tweet);
                            tweet_html = '<dl><dt>' + tweet.user.screen_name + '<dd>' + parseURL(tweet.text) + '</dl>'
                            $('#tweet-container').append(tweet_html)
        else
            twitter_api_url = "http://search.twitter.com/search.json"
            queryObject =
                q: document.getElementById("twitter-string").value
                rpp: document.getElementById("twitter-number").value
            query_string = $.param(queryObject)
            $.ajax
                type: "GET"
                url: "#{twitter_api_url}?#{query_string}"    
                dataType: "jsonp"
                error: (xhr, textStatus, errorThrown) ->
                    alert "An error occurred! " + errorThrown
                success: (data, textStatus) ->
                    $.each data.results, (i, tweet) ->
                        console.log(tweet);
                        tweet_html = '<dl><dt>' + tweet.from_user + '<dd>' + parseURL(tweet.text) + '</dl>'
                        $('#tweet-container').append(tweet_html)

## Clear out the tweet div when the clear button is clicked

    $("#clear-tweets").click ->
        $("#tweet-container").empty()
           
