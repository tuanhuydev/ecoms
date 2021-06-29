@extends('layouts.admin.base')
@section('title', 'Blog')
@section('admin-stylesheets')
    <link rel="stylesheet" href="/css/pages/blogs.css">
@endsection
@section('body-content')
    <div class="container-fluid">
        <div class="blogs">
            <div class="blogs__toolbar">
                <button class="btn btn-primary toolbar__btn--create">
                  <svg class="bi link-icon" fill="currentColor" width="16" height="16">
                    <use xlink:href="/images/bootstrap-icons.svg#pencil"/>
                  </svg>
                  New article
                </button>
            </div>
            <div class="blogs__list">
                <div class="blogs-list__table"></div>
                {{-- <table class="table blogs-list__table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table> --}}
            </div>
        </div>
    </div>
@endsection
@section('admin-scripts')
    <script src="/js/pages/admin/blogs.js" type="text/javascript"></script>
@endsection