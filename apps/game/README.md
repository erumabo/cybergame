# About

A repo to develop a 2d top-down view rpg strategy game

## Libs

- [Phaser 3](https://phaser.io/): Game engine
- [Picnic CSS](https://picnicss.com): CSS and UI look and feel
- HTML Web Components for UI
- [AnimeJS](https://animejs.com/documentation/): Animation and Tweening Timelines
- [Inkle's Ink](http://www.inklestudios.com/ink) and [InkJS](https://github.com/y-lohse/inkjs): Dialogs and story state management
- [Normalize CSS](https://github.com/necolas/normalize.css/)

Other libs I might use, saved here for future ref
- Events: 
  - https://github.com/pmndrs/valtio, https://github.com/pmndrs/valtio/blob/main/docs/guides/async.mdx
  - https://github.com/ai/nanoevents
- https://github.com/dataarts/dat.gui/blob/master/API.md#Controller+listen
- https://github.com/ai/keyux

## Assets

Currently using ["Pixel Art Top Down Basic" by _Cainos_](https://cainos.itch.io/pixel-art-top-down-basic) tileset.
Will change eventually.

Tilesets are created using this [tileset template](https://opengameart.org/content/seamless-tileset-template) by [caeles](https://opengameart.org/users/caeles)

## Tools Used

The entire game[^1] is made from an Android phone thanks to this wonderfull tools:

- Pixel Studio by _Hippo Games_, available for
  [Steam](https://store.steampowered.com/app/1204050/Pixel_Studio__pixel_art_editor/)
  and [Android](https://play.google.com/store/apps/details?id=com.PixelStudio)
- [Termux](https://termux.com/) the best terminal emulator for android
- [NotTiled](https://github.com/wandsmire/NotTiled) nice .tmx editor and Tiled alternative for Android,
  and other platforms
- [ACode](https://acode.app/) as HTML JS CSS editor
- [Vite](https://vitejs.dev) for development server and static site build


[^1]: The final APK is generated with Github Actions, as I couldn't setup the build tools on my Termux instace