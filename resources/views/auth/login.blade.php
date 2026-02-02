@extends('layouts.auth')
@section('title')
    Login | To Do
@endsection

@section('main')
    <section class="auth auth--login">
        <form class="auth__form" id="login-form">
            <h1 class="auth__title">Login</h1>
            <p class="auth__error" id="login-error"></p>
            <div class="auth__field">
                <label for="Email">Email :</label>
                <input type="email" name="email" id="login-email">
            </div>
            <div class="auth__field">
                <label for="Password">Password :</label>
                <input type="password" name="password" id="login-password">
            </div>
            <p class="create-acc"> Don't have an account? <a href="/register">Create an account</a></p>
            <button class="submit-btn" type="submit">Login</button>
        </form>
    </section>
@endsection