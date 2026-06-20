<pre>
<?php
    /* Nezatrzeny checkbox se neposila vubec, tady to napravujeme */
    if (!isset($_REQUEST['checkbox'])) {
        $_REQUEST['checkbox'] = 0;
    } else {
        $_REQUEST['checkbox'] = 1;
    }
    print_r($_REQUEST);  
?>
</pre>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Checkbox + PHP testing</title>
	<meta name="generator" content="TextMate http://macromates.com/">
	<meta name="author" content="Martin Michálek">
	<!-- Date: 2012-07-25 -->
</head>
<body>
    
    
    <form action="" method="get">
        
        <p>
            <input type="text" name="text" value="">    
        </p>        
        
        <p>
            <input type="checkbox" name="checkbox" value="">    
        </p>

        <p>
            <input type="submit">
        </p>
    </form>

</body>
</html>
