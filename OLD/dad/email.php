<?php
	$sender = $_POST['from'];
	$content = $_POST['body'];
	$msg = "";	

	$formatted = 'from: '.$sender."\n".$content;

	$msg = wordwrap($formatted,70);

	mail('zeeshanbadr2@gmail.com', 'hello world', $msg);

	echo '<script>console.log("'.$msg.'");</script>';
?>