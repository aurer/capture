<?php

$capture_path = getcwd() . '/capture.js';
$tempdir = sys_get_temp_dir();
$file_path = getcwd() . "/screenshots/";

function slug($str) {
	$clean = $str;
	$clean = preg_replace("/https?:\/\//", '', $clean);
	$clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
	$clean = strtolower(trim($clean, '-'));
	$clean = preg_replace("/[\/_|+ -]+/", '-', $clean);
	return $clean;
}

function get($var, $fallback=false){
	if( isset($_REQUEST[$var]) && $_REQUEST[$var] != '' ){
		return $_REQUEST[$var];
	} else {
		return $fallback;
	}
}


$url = get('url');
$width = get('width');
$height = get('height');
$format = get('format', 'jpeg');
$quality = get('quality');
$filehash = slug($url). "-{$width}{$height}{$quality}";

if( $url ){
	
	$url = (substr($url, 0, 4) == 'http') ? $url : "http://$url";
	$file = $file_path . $filehash . ".$format";
		
	// Remove the existing file if we want a fresh version
	if( get('refresh') == 'true' && is_file($file) ){
		unlink($file);
	}
	
	// If we have a cached version return it	
	if( is_file($file) ){
		header("Content-type: image/png");
		echo file_get_contents($file);
		exit();
	}
	
	// Looks like we don't have an image so create it
	$command = "phantomjs $capture_path $url $file $width $height";
	$result = shell_exec($command);

	if( is_file($file) ){
		header("Content-type: image/png");
		echo file_get_contents($file);
	} else {
		die("Couldn't render file");
	}
	
} else {
	die("Please enter a valid URL");
}