
<?php
	$host='https://game.youngvoice.tw/';
	$page_url=$host;	
	// echo $page_url;
	$img_url=$host.'upload/output/'.$_GET['id'].'.png';	
	// echo $img_url;
?>
<html>
<head>	
	<meta charset="UTF-8">

	<meta property="fb:app_id" content="262109598012691" />
	<meta property="og:title" content="吃吃真心話" />
	<meta property="og:description" content="這是一個喜歡吃內心話的貪食蛇。特別喜歡青春的心。" />
	<meta property="og:url" content="<?php echo $img_url?>" />	
	<meta property="og:image" content="<?php echo $img_url?>" />	

</head>
<body>
	<script>
		setTimeout(function(){
			window.location.href="http://game.youngvoice.tw";
		},100);
	</script>
</body>

</html>