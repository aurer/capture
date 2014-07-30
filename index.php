<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Capture</title>
	<link rel="stylesheet" href="/assets/dist/css/screen.css">
</head>
<body>
	<section class="options">
		
		<div class="row">
			<h1>Capture</h1>
			<h2>beta</h2>
			<form class="shot">
				<div class="field">
					<input type="url" id="in-url" name="url" placeholder="Example: www.mywebsite.com">
				</div>
				<div class="field gen-options">
					<a href="javascript:;" data-opt="set" class="btn active">Set sizes</a>
					<a href="javascript:;" data-opt="custom" class="btn">Custom size</a>
				</div>
				<div class="field opt-custom inactive">
					<input type="number" name="width" placeholder="Width" disabled>
					<input type="number" name="height" placeholder="Height" disabled>
				</div>
		        <div class="field">
					<input type="checkbox" name="refresh" value="true" id="in-refresh">
		          	<label for="in-refresh">Force Refresh</label>
					<button class="btn" type="submit" name="fetch" value="true">Render</button>
		        </div>
			</form>
			<div class="description">
				<p>A simple screenshot service.</p>
				<ol>
					<li>Specify a valid URL.</li>
					<li>Choose either a set of predetermined screen sizes or specify a size.</li>
					<li>Press render to get your screenshots.</li>
				</ol>
			</div>
		</div>
	</section>
	<section class="output">
		<div class="row"></div>
	</section>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="/assets/dist/js/build.js"></script>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-31871536-3', 'auto');
	  ga('send', 'pageview');
	</script>
</body>
</html>
