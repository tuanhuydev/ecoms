@extends('layouts.base')
@section('title', $type)
@section('stylesheets')
<link rel="stylesheet" href="/css/pages/auth.css">
@endsection
@section('body')
<div class="auth-form">
    <div class="auth-form__container">
        <div class="d-flex flex-column shadow-sm p-3 bg-body rounded border auth-form__form">
            <h1 class="fw-bold text-primary">{{$type}}</h1>
            <div class="input-group mb-3">
                <span class="input-group-text">
                    <svg class="bi" width="18" height="18" fill="currentColor">
                        <use xlink:href="/images/bootstrap-icons.svg#person"/>
                    </svg>
                </span>
                <input type="email" class="form-control shadow-sm" name="email" placeholder="Email" autocomplete="off">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">
                    <svg class="bi" width="18" height="18" fill="currentColor">
                        <use xlink:href="/images/bootstrap-icons.svg#shield-lock"/>
                    </svg>
                </span>
                <input type="password" class="form-control shadow-sm" name="password" placeholder="Password" autocomplete="off">
            </div>
            <button class="btn btn-primary" type="button" name="login">Login</button>
        </div>
    </div>
    <div class="auth-form__thumbnail">
        <object data="/images/login.svg" class="thumbnail__image" width="500" type=""></object>
    </div>
</div>    
@endsection
@section('scripts')
    <script src="/js/pages/auth.js" defer type="text/javascript"></script>
@endsection