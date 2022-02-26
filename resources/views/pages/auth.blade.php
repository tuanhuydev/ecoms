@extends('layouts.base')
@section('title', $type)
@section('stylesheets')
    <link rel="stylesheet" href="/css/pages/auth.css">
@endsection
@section('body')
    <div class="auth__container">
        <form class="auth__form">
            <h1 class="title">{{ $type }}</h1>
            <div class="control">
                <input type="email" class="control__input" name="email" required placeholder="Email" />
                <label for="email" class="control__error"></label>
            </div>
            <div class="control">
                <input type="password" class="control__input" name="password" required placeholder="Password" />
                <label for="password" class="control__error"></label>

            </div>
            <div class="actions">
                <div class="actions__status"></div>
                <button class="submit" type="submit">
                    <svg class="bi" width="18" height="18" fill="currentColor">
                        <use xlink:href="/images/bootstrap-icons.svg#arrow-right"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>
@endsection
@section('scripts')
    <script src="/js/pages/auth.js" defer type="text/javascript"></script>
@endsection