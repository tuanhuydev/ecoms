<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <meta property="og:url"         content="@yield('url')" />
    <meta property="og:type"        content="@yield('type')" />
    <meta property="og:title"       content="@yield('title')" />
    <meta property="og:description" content="@yield('description')" />
    <meta property="og:image"       content="@yield('image')" />
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    @yield('stylesheets')
</head>
<body>
    <div id="loading"></div>
    @yield('body')
    <script src="{{ asset('/js/app.js') }}" defer type="text/javascript"></script>
    @yield('scripts')
</body>
</html>
