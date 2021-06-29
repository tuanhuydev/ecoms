@extends('layouts.admin.base')
@section('title', 'Product')
@section('admin-stylesheets')
    <link rel="stylesheet" href="/css/pages/products.css">
@endsection
@section('body-content')
    <div class="container-fluid">
        <div class="products">
            <div class="products__toolbar"></div>
            <div class="products__table">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Nick</td>
                            <td>Stone</td>
                            <td>
                                <span class="label label-inline label-light-primary font-weight-bold">
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Ana</td>
                            <td>Jacobs</td>
                            <td>
                                <span class="label label-inline label-light-success font-weight-bold">
                                    Approved
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>Pettis</td>
                            <td>
                                <span class="label label-inline label-light-danger font-weight-bold">
                                    New
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
@section('admin-scripts')
<script src="/js/pages/products.js" type="text/javascript"></script>
@endsection