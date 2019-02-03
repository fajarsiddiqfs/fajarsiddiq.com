$(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://medium.com/feed/fsfajarsiddiq'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
    console.log(response)
    var authorImg = response.feed.image
		if (response.status == 'ok') {
			var output = '';
			$.each(response.items, function (k, item) {
        var tagIndex = item.description.indexOf("<img"); // Find where the img tag starts
        var srcIndex =
          item.description.substring(tagIndex).indexOf("src=") + tagIndex; // Find where the src attribute starts
        var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
        var srcEnd =
          item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
        var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				output += '<div class="box grid' + k+1 + '" style="background-image:url('+src+');background-size:contain;background-position: center; "><div class="bg-layer"><a href="'+item.link+'" target="_blank">';
        output += '<div class="post-content"><div class="grid-title">' + item.title + '</div>';
        output += '<div class="author">'+item.author+'</div>';
				output += '</div></a></div></div>';
				return k < 3;
			});
			$content.html(output);
		}
	});
});