<?php
// Website base URL
$baseUrl = rtrim(dirname($_SERVER['PHP_SELF']), '/') . '/';


// Load webpack assets list
$webpackAssetsFile = 'assets/generated-assets-files.json';
if (!file_exists($webpackAssetsFile)) {
    die('Error : ' . $webpackAssetsFile . ' doesn\'t exist. => <code>npm run dev</code>');
}
$webpackAssets = json_decode(file_get_contents($webpackAssetsFile), true);

?>
<!doctype html>
<html lang="en">
<head>
    <base href="<?php echo $baseUrl ?>">
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Application title</title>

    <?php if (isset($webpackAssets['files']['chunks']['app']['css'][0])): ?>
        <link rel="stylesheet" href="<?php echo $webpackAssets['files']['chunks']['app']['css'][0] ?>"/>
    <?php endif; ?>
</head>
<body>

<div id="app"></div>

<script
    src="<?php echo $webpackAssets['files']['chunks']['app']['entry']; ?>"
></script>

</body>
</html>
