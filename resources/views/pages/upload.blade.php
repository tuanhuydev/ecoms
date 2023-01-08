@extends('layouts.base')
@section('title', 'Upload')

@section('body')
<form method="post" action="/api/files/upload/images" enctype="multipart/form-data">
  {{ csrf_field() }}
  <div>
    <label for="file">Choose file to upload</label>
    <input type="file" name="file" multiple>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
 </form>
@endsection
