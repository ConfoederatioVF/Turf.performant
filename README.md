# Turf.performant

<div>
  <img align = "center" src = "https://i.postimg.cc/sDMz4djT/turf-logo.png" height = "64">
  <img align = "center" src = "https://i.postimg.cc/HxNQXRvc/ctd-coat-of-arms-logo.png" height = "64">
</div>

---

[![Join our community!](https://img.shields.io/discord/548994743925997570?label=Discord&style=for-the-badge)](https://discord.gg/89kQY2KFQz) ![](https://img.shields.io/github/languages/code-size/ConfoederatioVF/Turf.performant?style=for-the-badge) 

A fork of [**Turf.js**](https://github.com/turfjs/turf) maintained by Confoederatio, Technical Division (CTD).

## Abstract

This fork is a CDN drop-in replacement for Turf.js, based off the [clipper2-ts pull request](https://github.com/Turfjs/turf/pull/2997) by smallsauceepan, with drastic performance improvements to elementary operations such as difference, intersect, and union. In our own testing, we found improvements for complex layer operations of ~6-10x over real academic datasets.

Unfortunately, this draft has not yet been merged into the main repository due to a slight increase in build size and architectural concerns. We have bypassed those to build the `.min.js` ourselves.

**Performance Improvements:**

<table>
  <tr>
    <th>Function</th>
    <th>Reported Improvement</th>
  <tr>
    <td>Difference</td>
    <td>20-130x</td>
  </tr>
  <tr>
    <td>Intersect</td>
    <td>55-60x</td>
  </tr>
  <tr>
    <td>Union</td>
    <td>10-120x</td>
  </tr>
  <tr>
    <td>Complex Operations<br>(layer merge of Cliopatria, C-Shapes)</td>
    <td>6-10x</td>
  </tr>
</table>

If you wish to make changes and build the fork yourself, check the <ins>Contributing</ins> tab.

## Usage.

1. Download [turf.min.js](https://raw.githubusercontent.com/ConfoederatioVF/Turf.performant/refs/heads/main/turf.min.js) from this repository (Right Click > Save As). Place the downloaded file in your root project folder.

2. Link the `.min.js` script inside your `<head>` tag:
    ```html
    <script type = "text/javascript" src = "turf.min.js"></script>
    ```

Alternatively, simply replace the `turf.min.js` you already have in your project. It should work as a drop-in replacement.
