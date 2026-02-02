@extends('layouts.auth')
@section('title')
    Register | To Do
@endsection

@section('main')
    <section class="auth auth--register">
        <form class="auth__form" id="register-form">
            <h1 class="auth__title">Register</h1>
            <div class="auth__field">
                <label for="Name">Name :</label>
                <input type="text" name="name" id="name">
                <p class="auth_register-errors" id="auth-name"></p>
            </div>
            <div class="auth__field">
                <label for="Email">Email :</label>
                <input type="email" name="email" id="register-email">
                <p class="auth_register-errors" id="auth-email"></p>
            </div>
            <div class="auth__field">
                <label for="Password">Password :</label>
                <input type="password" name="password" id="register-password">
                <p class="auth_register-errors" id="auth-password"></p>
            </div>
            <p class="create-acc">Already have an account? <a href="/">Log in</a></p>
            <button class="submit-btn" type="submit">Register</button>
        </form>
    </section>
@endsection