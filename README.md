# Penguist
Penguist is an embeddable presenation library written in Typescript, designated to make fast and simple presentations. It can be embedded via a single js file, as well as using npm package.

<img src="assets/penguist.svg" width="128" alt="logo">
<br>

## Index
- [Example](#example)
- [*Other contents are under construction 🏗*](#other-contents-are-under-construction-)

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

## Other contents are under construction 🏗
