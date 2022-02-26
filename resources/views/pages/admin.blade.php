<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <meta property="og:url"         content="@yield("url")" />
    <meta property="og:type"        content="@yield("type")" />
    <meta property="og:title"       content="@yield("title")" />
    <meta property="og:description" content="@yield("description")" />
    <meta property="og:image"       content="@yield("image")" />
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/js/pages/admin.css">
</head>
<body>
    <div id="root"></div>
    <script src="/js/pages/admin.js" defer type="text/javascript"></script>
</body>
</html>