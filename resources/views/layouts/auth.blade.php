<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <title>@yield('title')</title>
        <meta
          name="description"
          content=""
        />
    
        <meta name="author" content="Esmat_khaliqi" />
        <meta name="csrf-token" content="{{csrf_token()}}">
        <link rel="canonical" href="https://example.com" />
    
        <!-- Open Graph -->
        <meta property="og:title" content="" />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:image" content="https://example.com/profile.jpg" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
      </head>
<body class="auth-body">
   @include('partials.header')
   @yield('main')
   <script src="{{ asset('js/app.js') }}"></script>
   <script src="{{ asset('js/style.js') }}"></script>
</body>
</html>