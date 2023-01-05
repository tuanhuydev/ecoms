@extends('layouts.base')
@section('title', "Sidehand - ".$title)
@section('stylesheets')
<link rel="stylesheet" href="{{ asset('/css/pages/auth.css') }}">
@endsection
@section('body')
<div class="auth__container">
  <form class="auth__form" id="auth__form" data-type="{{$type}}">
    <h1 class="title">{{ $title }}</h1>
    @csrf
    <input type="hidden" name="_token" value="{{ csrf_token() }}" />

    @if ($type === 'verify-account')
    <div class="control">
      <input type="text" class="control__input" name="verifyToken" required placeholder="Verification token" />
    </div>
    @endif

    @if ($type === 'sign-up')
    <div class="flex justify-between w-100">
      <div class="control">
        <input type="text" class="control__input" name="firstName" required placeholder="First Name" />
      </div>
      <div class="control">
        <input type="text" class="control__input" name="lastName" required placeholder="Last Name" />
      </div>
    </div>
    @endif

    @if (in_array($type, array('sign-up', 'sign-in', 'forgot-password')))
    <div class="control">
      <input type="email" class="control__input" name="email" required placeholder="Email" />
    </div>
    @endif


    @if (in_array($type, array('sign-up', 'sign-in', 'new-password')))
    <div class="control">
      <input type="password" class="control__input" name="password" required placeholder="Password" />
    </div>
    @endif

    @if (in_array($type, array('sign-up', 'new-password')))
    <div class="control">
      <input type="password" class="control__input" name="confirmPassword" required placeholder="Confirm Password" />
    </div>
    @endif

    <button class="submit" type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zM5 12v8h14v-8H5zm6 2h2v4h-2v-4zm6-4V9A5 5 0 0 0 7 9v1h10z" />
      </svg>
    </button>
    <ul class="text-center" id="errorList"></ul>
    @if ($type === 'sign-in')
    <!-- <div class="flex justify-between w-100 mt-12">
      <a href="{{ route('pages.auth', ['type' => 'forgot-password']) }}" class="text-grey-400 fs-3 hover-underline">Forgot your password ?</a>
      <a href="{{ route('pages.auth', ['type' => 'sign-up']) }}" class="text-grey-400 fs-3 hover-underline">Sign up new account</a>
    </div> -->
    @endif
  </form>
</div>
@endsection
@section('scripts')
<script src="/js/pages/auth.js" defer type="text/javascript"></script>
@endsection
