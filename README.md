# Laravel + React Boilerplate

> Boilerplate repository for Laravel + Inertia + React + TypeScript + Tailwind CSS

## Prerequisits

For this project to run, you need a couple of things:

-   Composer 2
-   PostgreSQL 14+
-   PHP 8.2
-   Node 16+
-   Yarn
-   Laravel 10+
-   Laravel Valet or Homestead

## Setup

-   Clone this repository and `cd` into the directory
-   Install composer packages with `composer install`
-   Install node packages with `yarn`
-   Run `cp .env.example .env`
-   Edit your `.env` file to update the database credentials
-   Setup an application key with `php artisan key:generate`
-   Run migrations with `php artisan migrate:fresh`

If you're using [Laravel Valet](https://laravel.com/docs/10.x/valet), you can now link your app with `valet link`. Run `yarn dev` to build the development files and navigate to `dashbrd.test` afterwards to see the application in action. Do not navigate to the `localhost` URL that vite shows in your terminal, as that will refer to the hot-reloading server and not the actual application.

## Development

When working on this project, you need to keep a few things in mind:

-   The backend is written in Laravel (10+, on PHP 8.2+).
-   The frontend is written in React (TypeScript).
-   For communication between Laravel and React, we rely on Inertia.
-   To make life a little easier, we utilize [Laravel Data](https://github.com/spatie/laravel-data) together with [TypeScript Transformer](https://github.com/spatie/typescript-transformer) to allow for easy type generation and to avoid rewriting classes in various locations. This generates TypeScript files when running `php artisan typescript:transform`

In addition to the above, please setup `prettier` in your IDE (VSCode or whatever you use). This will allow you to format your files when saving and keeps the codebase consistent.
