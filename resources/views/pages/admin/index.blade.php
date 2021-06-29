@extends('layouts.admin.base', [
  'active' => $active
])
@section('title', 'Home')
@section('body-content')
  <div class="container-fluid">
    <div class="row">
      <div class="col-8">
        <div class="card-grid">
          <div class="card text-center card-grid--orders">
            <h1 class="card-grid__title">Order</h1>
            <h2 class="text-muted card-grid__count">30</h2>
          </div>
          <div class="card text-center card-grid--orders">
            <h1 class="card-grid__title">Product</h1>
            <h2 class="text-muted card-grid__count">30</h2>
          </div>
          <div class="card text-center card-grid--orders">
            <h1 class="card-grid__title">Blogs</h1>
            <h2 class="text-muted card-grid__count">{{$blogs ?? 0}}</h2>
          </div>          
          <div class="card text-center card-grid--orders">
            <h1 class="card-grid__title">Customer</h1>
            <h2 class="text-muted card-grid__count">30</h2>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="recently-activities">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>3 days ago</small>
              </div>
              <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
              <small>Donec id elit non mi porta.</small>
            </a>
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
              <small class="text-muted">Donec id elit non mi porta.</small>
            </a>
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
              <small class="text-muted">Donec id elit non mi porta.</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection