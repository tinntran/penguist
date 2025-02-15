# Penguist
Penguist is an embeddable presentation library written in Typescript, allow users to make presentations programmatically with HTML, CSS and Javascript.

> [!Warning]
> This project has been deprecated.
> use its successor https://github.com/tinntran/peng

<img src="https://raw.githubusercontent.com/tinntran/penguist/refs/heads/master/assets/penguist.svg" width="128" alt="logo">
<br>

## Index
- [Example](#example)
- [Elements](#elements)

## Example
```html
<!DOCTYPE html>
<head>
  <title>Rizz</title>
  <script src="penguist.min.js"></script>
  <style>
    body {
      background: #333;
      color: #eee;
      font-family: 'Fira Code', monospace;
      font-size: 16pt;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5rem;
    }
  </style>
  <template data-name="test">
    <h1><slot name="title"></slot></h1>
    <hr>
    <slot></slot>
  </template>
</head>

<p-present>
  <p-slide class="title">
    <div style="scale: .8;">
      <img src="https://raw.githubusercontent.com/tinntran/penguist/refs/heads/master/assets/penguist.svg" alt="sosu">
    </div>
    <panim-rush style="font-size: 32px;">
      Hello <strong>Penguist</strong> 🐧
    </panim-rush>
  </p-slide>
  <p-slide template="test">
    <span slot="title">This slide is using a template</span>
    This slide is using a template
  </p-slide>
  <p-slide>
    <strong style="color: pink;">Super</strong><panim-fade style="display: inline;">califragilisticexpialidocious</panim-fade>
  </p-slide>
</p-present>

<script>
  Penguist.init()
</script>
```

## Elements
[`<p-present>`](#p-present)
[`<p-slide>`](#p-slide)
[`<template data-name="...">`](#template-data-name)

### `<p-present>`

The `p-present` element defines a presentation. A `p-present` element consists of `p-slide` elements, and only one slide will be shown per presentation element.

| Attribute      | Type    | Description
| -              | -       | -
| selected-index | Number  | Determines which slide will be shown (start from 0)

### `<p-slide>`

The `p-slide` element defines a slide in a `p-present` element. Only one slide is shown per presentation element.

| Attribute      | Type    | Description
| -              | -       | -
| slot           | String  | Behaves like an HTML slot attribute and is a uuid string if user do not assign it. We do not recommend changing it twice or more because the slot name is only saved once by the presentation element.
| template       | String  | Applies a template from a `<template data-name="...">` that matches its value.

### `<template data-name="...">`

The `<template data-name="...">` element is an HTML `<template>` element that defines a template for slide elements.
| Attribute      | Type    | Description
| -              | -       | -
| data-name      | String  | Declares a name for the template.

