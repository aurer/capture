<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Screenshot</title>
	<link rel="stylesheet" href="/assets/dist/css/screen.css">
</head>
<body>
	<section class="options">
		
		<div class="row">
			<h1>Capture</h1>
			<h2>beta</h2>
			<form class="shot">
				<div class="field">
					<input type="text" id="in-url" name="url" placeholder="URL">
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
					<li>Specify a valid URL</li>
					<li>Choose either a set of predetermined screen sizes or specofy a size</li>
					<li>Press render to get the screenshot</li>
				</ol>
			</div>
		</div>
	</section>
	<section class="output">
		<div class="row">
			<!-- images generated here -->
		</div>
	</section>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="/assets/dist/js/build.js"></script>
</body>
</html>