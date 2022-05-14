@extends('layouts.base')
@section('stylesheets')
<link rel="stylesheet" href="/css/pages/admin.css">
@yield('admin-stylesheets')
@endsection

@section('body')
    <main class="admin">
        <div class="admin__sidebar">
            @include('components.sidebar')
        </div>
        <div class="admin__body">
            @include('components.navbar')
            @include('components.breadcrumb', ['active' => $active])
            @include('components.quick-user')
            <div class="body-content">
                @yield('body-content')
            </div>
        </div>
    </main>
@endsection

@section('scripts')
    <script src="/js/pages/admin/base.js" async type="text/javascript"></script>
    @yield('admin-scripts')
@endsection