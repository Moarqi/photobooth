### Changelog

#### Upcoming Photobooth release

To use a preview of the upcoming Version you need to install the `Install last development version` using the `install-raspbian.sh` installer (now also works on all devices running debian / a debian based OS).  
An updated FAQ can always be found at [localhost/faq](http://localhost/faq).  

Please read the license notice [here](https://github.com/andi34/photobooth/blob/dev/LICENSE_NOTICE).

**Bugfixes**
  - livechroma: fix text formatting on error/retry
  - api(takePic): fix error message, take picture command can be anything

**New Options**
  - Add traslate button to Adminpanel, opens Photobooth project on Crowdin
  - Shutter animation, enabled by default [#368](https://github.com/andi34/photobooth/pull/368)

**General**
  - Cleanup core.js:
    - remove unneeded if checks
    - improve readability

<hr>

#### 3.3.0 (16.01.2022)

**Breaking changes**
  - If you are using an older version of Rasperry Pi OS or Debian / Debian based distribution make sure Node.js v12.22.x is installed!  
    Check your Node.js version while running `node -v` from your terminal.  
  - (config) Switch from milliseconds to seconds the image is visible on result screen  
    _Please adjust your configuration if you've changed the default setting on previous version. If you've not changed the default setting there's nothing to do._
  - vendor: phpqrcode as submodule
  - config: Webserver IP should not contain subfolder/subpages, IP should be detected if not defined. QR now needs it's own URL defined (see new Options).

**Bugfixes**
  - standalone slideshow: fix auto refresh
  - hide inner navigation panel if thrill is triggered from result page
  - remotebuzzer:
    - fix hang of remotebuzzer server on error
    - bugfix for hardware button to trigger collage mode [#351](https://github.com/andi34/photobooth/pull/351) (fixes [Issue #300](https://github.com/andi34/photobooth/issues/300))
    - fix socket.io Server on Photobooth subfolder installation [#364](https://github.com/andi34/photobooth/pull/364) (fixes [Issue #360](https://github.com/andi34/photobooth/issues/360))
  - picture and mail database always need a name, add fallback to default if empty
  - configsetup: add event option to basic view (fixes [Issue #320](https://github.com/andi34/photobooth/issues/320))
  - build: fix build failing on macOS (fixes [Issue #318](https://github.com/andi34/photobooth/issues/318))
  - Fix Typo in admin.php while using a custom style [#322](https://github.com/andi34/photobooth/pull/322)
  - Fix preview from gphoto as background if BSM is disabled (thanks to Uwe Pieper), **note:** This is not recommended for a Raspberry Pi as it requires faster hardware!

**New Options**
  - remotebuzzer:
    - Allow to configure GPIO debouce delay through admin panel [#294](https://github.com/andi34/photobooth/pull/294)
  - ui: add option to show / hide button bar on result screen
  - general: add config to use sample pictures instead taking a picture, dev-mode now only enables advanced logging for debugging purpose
  - add button for reboot and shutdown on linux
  - collage:
    - continuous collage: allow to disable single images being visible
    - allow to define collage background color [#324](https://github.com/andi34/photobooth/pull/324)
    - add option to add all images from collage to gallery [#307](https://github.com/andi34/photobooth/pull/307) (fixes [Issue #269](https://github.com/andi34/photobooth/issues/269))
    - add cutting lines on 2x4 collage layouts
  - feature: allow sending a GET request at countdown and/or after processing [#308](https://github.com/andi34/photobooth/pull/308)
  - text on {picture,collage,print}: use color picker - This gives the possibility to use any color instead choosing one out of three defined colors! [#312](https://github.com/andi34/photobooth/pull/312)
  - QR:
    - Add close button to QR [#316](https://github.com/andi34/photobooth/pull/316) (fixes [Issue #315](https://github.com/andi34/photobooth/issues/315))
    - Own QR menu entry [#325](https://github.com/andi34/photobooth/pull/325):
      - Enable/Disable QR-Code
      - Allow to define a own URL used for the QR-Code
        - Add fallback to default setting if not defined
      - Decide whether to append the filename to defined URL
      - Allow to define a own help text visible below the QR-Code
  - optional retry to take a picture on error [#366](https://github.com/andi34/photobooth/pull/366)

**General**
  - Add welcome screen on first access [#296](https://github.com/andi34/photobooth/pull/296), add config to skip by default
  - Add experimental Photobooth Updater and dependencies checker [#285](https://github.com/andi34/photobooth/pull/285)
  - install-raspbian.sh:
    - ask all questions before installing anything
    - allow silent installation (`sudo bash install-raspbian.sh WEBSERVER silent`)
    - don't delete INSTALLFOLDERPATH if exists, make a backup instead
    - inform about URL to access Photobooth
    - ask if remote access to CUPS should be enabled
    - install Node.js v12.22 if needed (for Debian buster compatibility)
  - update-booth.sh:
    - also copy hidden files and folder
  - adjust default chromium flags
  - build: add "clean" task
  - style: allow adjustments via `private/overrides.css` (automatically used if the file exist)
  - debugpanel: show latest git changes of installation
  - Add script to disable automount and add polkit rules for USB Sync (Only needed if you have declined the question to enable the USB sync file backup while running the `install-raspbian.sh` and like to use the USB Sync feature.):
```
wget https://raw.githubusercontent.com/andi34/photobooth/dev/enable-usb-sync.sh
sudo bash enable-usb-sync.sh
```
  - disabled version checker on dev branch
  - add tools.js with central access to common functions
  - Adjust and optimize different API endpoints
  - Updated build dependencies
  - general jquery improvements (thanks to Uwe Pieper)
  - retry getting preview via gphoto if failed (thanks to Uwe Pieper)
  - retry taking a picture if failed (thanks to Uwe Pieper)
  - crowdin: translation import
  - config: try to dectect Webserver IP if not defined

**FAQ**
  - adjust chromium flags
  - Raspberry Touchpanel DSI simultaneously with HDMI
  - How to administer CUPS remotely using the web interface?

<hr>

#### 3.2.1

**Bugfixes**
- fix collage without filter/effect applied to single images

<hr>


[Compare changes with v3.2.0](https://github.com/andi34/photobooth/compare/v3.2.0...v3.2.1).

#### 3.2.0

**Security**
- api: don't show mail password and sensible login data [#274](https://github.com/andi34/photobooth/pull/274)
- api: Bugfix for server-side node scripts to correctly parse the config file
- Temporary removed numbered image naming option to prevent overriding existing images. For details see [Issue 291](https://github.com/andi34/photobooth/issues/291).

**Bugfixes**
- sync-to-drive: bugfix for depreciated handling of type error - cannot read property of undefined
- collage: Apply defined effect(s) and/or filter to the single images instead of the final collage (partially [#290](https://github.com/andi34/photobooth/pull/290))
- core: new timeout only if no activity in progress [#273](https://github.com/andi34/photobooth/pull/273), fixes Issue [#272](https://github.com/andi34/photobooth/pull/272)

**New Options**
- countdown offset to compensate shutter-delay and cheese time [#286](https://github.com/andi34/photobooth/pull/286)
- Remote-buzzer:
  - allow to enable/disable rotary control for standalone gallery [#261](https://github.com/andi34/photobooth/pull/261)
  - allow parallel use of buttons- and rotary control [#262](https://github.com/andi34/photobooth/pull/262)

**General**
- Updated build dependencies
- Collage: Always show image after taken [#271](https://github.com/andi34/photobooth/pull/271), partially [#290](https://github.com/andi34/photobooth/pull/290)
- Debug Panel [#275](https://github.com/andi34/photobooth/pull/27) and better logging on issues while taking a picture [#277](https://github.com/andi34/photobooth/pull/277) and post-processing (partially [#290](https://github.com/andi34/photobooth/pull/290)):  
  Implements a panel for to help debugging in case of issues. Focus is to be able to access through the browser key configuration and log files on the server side.  
  This feature is  
  1) for fast and efficient debugging iterations  
  and  
  2) also well positioned to help people with less experience on the server administration and Unix / Raspberry Pi OS side of things.  

  Access to the debug panel is available through the admin panel (switch to expert view) or via direct URL [http://localhost/admin/debugpanel.php](http://localhost/admin/debugpanel.php).  
- Removed unneeded file-type checks all around the Photobooth api (we check for jpeg images already inside the api/applyEffects.php)
- result screen: smaller QR code & smaller font-size


[Compare changes with v3.1.0](https://github.com/andi34/photobooth/compare/v3.1.0...v3.2.0).

<hr>

#### 3.1.0

**Bugfixes**
- fix horizontal flip of preview on some browser
- fix decore line config [#257](https://github.com/andi34/photobooth/pull/257)
- fix rotary button support for standalone gallery [#253](https://github.com/andi34/photobooth/pull/253)
- core: fix background from device cam
- login: protect Live keying if index is protected via login
- lang (en): fix delete request

**New Options**
- Pre- / Post- Command [#232](https://github.com/andi34/photobooth/pull/232):
  - execute a shell command before a picture is taken (pre-command)
  - execute a shell command after processing is is completed (post-command)
- Add HTML capability to E-Mail text [#231](https://github.com/andi34/photobooth/pull/231)
- Hide home button on results screen [#256](https://github.com/andi34/photobooth/pull/256)

**General**
- updated build dependencies
- hidden adminshortcut: direct to login panel
- login panel:
  - allow to access Live keying
  - add link to Telegram Community


[Compare changes with v3.0.0](https://github.com/andi34/photobooth/compare/v3.0.0...v3.1.0).

<hr>

#### 3.0.0
A lot of changes have been applied to Photobooth! We're proud to tell that some bugs have been fixed and a lot of user wishes could be realized!  
We have added a lot of new options to make Photobooth adjustable for much more use cases.  
A big thanks goes to [jacques42@GitHub](https://github.com/jacques42) (who was involved a lot for this Release) and everyone who helped on making Photobooth this powerfull!  
Photobooth UI has changed to a modern look on most pages and our Admin panel and configuration setup has changed completely (please read the following Changelog).  

**Breaking changes**
- The configuration setup has changed completely on Photobooth v3 and some config options have been removed!
  **Please note:** Your old config (Photobooth v2.x and older) won't work, **you must** setup your configuration via [adminpanel](http://localhost/admin) again!

**Bugfixes**
- Chromakeying:
  - respect thumnail config
- Delete:
  - fix removing deleted images from database
- Translations:
  - fix translation fallback on all *.js files
- E-Mail:
  - fix small bug for mail subject and text templates to be applied
- Compatibility:
  - adjust default background URL setup to fix backgrounds on iOS (don't use relative path)
  - qr: also display correct url on subfolder installation [Fix #204](https://github.com/andi34/photobooth/issues/204)

**New Options**
- Standalone gallery:
  - continous check for new pictures [#121](https://github.com/andi34/photobooth/pull/121)
- Collage:
  - allow to deactivate standalone picture [Fix #155](https://github.com/andi34/photobooth/issues/155)
  - new collage layouts: 1+3, 1+3 (2), 1+2 & 2x2 (2)
  - remove use of background images, user should apply frames instead
  - test your collage settings accessing [localhost/test/collage.php](http://localhost/test/collage.php)
- Chroma keying:
  - Allow to switch between MarvinJ and Seriously.js algorithm for chroma keying [#123](https://github.com/andi34/photobooth/pull/123)
  - Seriously.js: use color picker to define keyed color, use Seriously.js by default [#213](https://github.com/andi34/photobooth/pull/213)
  - allow to define background path used for chroma keying, place your own backgrounds inside a subfolder of your Photobooth, e.g. inside `private/backgrounds` and define it via admin panel
  - added "live chroma keying" (choose a background -> take a picture -> get the keyed image with choosen background), access via [http://localhost/livechroma.php](http://localhost/livechroma.php) or use the config option to use it as default start page [#157](https://github.com/andi34/photobooth/pull/157)
  - Make imagesize for chromakeying adjustable
    - S = max 1000px
    - M = max 1500px (default like before)
    - L = max 2000px
    - XL = max 2500px
- Userinterface:
  - feature: Allow custom index, add new index layout by Mathias Fiege [#159](https://github.com/andi34/photobooth/pull/159)
  - allow to hide decore lines on start screen [Partially #165](https://github.com/andi34/photobooth/pull/165)
  - allow to hide title and subtitle on start screen [Partially #165](https://github.com/andi34/photobooth/pull/165)
- Backup:
  - Allow syncing of new pictures to USB device using rsync [#158](https://github.com/andi34/photobooth/pull/158)
- Preview:
  - Options "See preview by device cam" and "Preview from URL" have been replaced by a select menu
  - live preview from gphoto2 [#131](https://github.com/andi34/photobooth/pull/131)
- Athentication:
  - allow to protect FAQ and manual [#212](https://github.com/andi34/photobooth/pull/212)
  - allow to access login-protected pages without login on localhost access
- Database:
  - make database optional, add button to (re)generate database to admin panel [#203](https://github.com/andi34/photobooth/pull/203)
- Remotebuzzer:
  - Add rotary switch support [#202](https://github.com/andi34/photobooth/pull/202), [#221](https://github.com/andi34/photobooth/pull/221)
- What else:
  - allow delete of images without request [#215](https://github.com/andi34/photobooth/pull/215)
  - allow to take pictures right after the countdown, "Cheese" will be skipped [#129](https://github.com/andi34/photobooth/pull/129)
  - allow to flip image after taken [#209](https://github.com/andi34/photobooth/pull/209)
  - allow to add text to picture and/or collage [#210](https://github.com/andi34/photobooth/pull/210)

**General**
- User Interface:
  - Switch to modern styling by default
- Adminpanel
  - new adminpanel design [#162](https://github.com/andi34/photobooth/pull/162)
  - choose between `Basic View`, `Advanced View` and `Expert View`:
    - Basic View: Show config elements relevant for most simple and most common use-case. Default settings are largely sufficient. Maybe 20-30 % of all config options. The focus are entry-level user, who start to get their feet wet.
    - Advanced View: Features and elements used more often - i.e. Printing, Frames for Pictures, Chroma-Keying, etc. - maybe around 50% of all options on top. This should be sufficient for most of the users.
    - Expert View: Dev-Setting, Data folders, Commands, etc. - the remaining 20-30% of options are mapped to this view. Geeks right here.
  - Admin panel option to hide / show panel headings by Operating System
  - Allow to download data folder as zip from [http://localhost/admin/diskusage.php](http://localhost/admin/diskusage.php)
- Installation:
  - Installation [Instructions for Windows](https://github.com/andi34/photobooth/wiki/Installation-on-Windows) added to Wiki
  - install-raspbian.sh script:
    - Ask if a Raspberry Pi (HQ) camera is used, if yes setup personal config with needed changes
    - allow to install from all devices running debian/debian based OS [#181](https://github.com/andi34/photobooth/pull/181)
- Error handling:
  - api (applyEffects): check if GD library is loaded
  - check if frames and font are valid
- Lanugage support:
  - Add Italian to supported languages
- Collage:
  - Rotate collage images and final collage if needed (Fix [#156](https://github.com/andi34/photobooth/issues/156))  [#63](https://github.com/andi34/photobooth/pull/63)
  - Allow to retake a single picture on collage with interruption (Fix [#166](https://github.com/andi34/photobooth/issues/166))
- Remotebuzzer [#201](https://github.com/andi34/photobooth/pull/201), [#202](https://github.com/andi34/photobooth/pull/202):
  - replace gpio by onoff library
  - Add additional button support for collage, print and shutdown
- Code style:
  - Add prettier-php plugin (and slightly adjust prettier config for php files) to force one codestyle [#124](https://github.com/andi34/photobooth/pull/124)
- Robustness and improvements:
  - don't use relative paths for font, frames and background images
  - folders are always part of data folder (besides data folder itself and archives folder)
    - e.g. images folder config before: `data/images`  
      now: `images` (this will also point to `data/images`)
  - use 100% picture quality while processing images to not lower given configured jpeg quality for the final image
- Authentication:
  - handle login check earlier to protect other api endpoints [#205](https://github.com/andi34/photobooth/pull/205)

<hr>

#### 2.10.0
**Bugfixes**
- check if we're already printing to avoid double printing
- deletePhoto: also delete keying and tmp pictures
- add back fallback to english if translation is missing

**New Options**
- allow to use thumnails for download
- Choose thumbnail size:
  - XS = max 360px
  - S = max 540px
  - M = max 900px
  - L = max 1080px
  - XL = max 1260px"
- Advanced printing functions [#109](https://github.com/andi34/photobooth/pull/109):
  - Auto print function
  - allow to delay auto print
  - allow to adjust time "Started printing! Please wait..." is visible
  - allow to trigger print via defined key
  - options to show the print button independent (e.g. can be only visible on gallery)
- Advanced collage options [#108](https://github.com/andi34/photobooth/pull/108):
  - Choose collage layout:
    - 2x2
    - 2x4
    - 2x4 + background image
  - Collage: apply frame once after taking or to every picture of the collage

**General**
- reordered folder setup
- Crowdin translation import
- add Polish to supported languages

<hr>

#### 2.9.0
**Bugfixes**
- fix saving images on chroma keying

**New Options**
- allow to adjust PhotoSwipe (Gallery) config via Adminpanel, also allow to use some PhotoSwipe functions and make more PhotoSwipe settings available (settings explained inside the manual):
  - Mouse click on image should close the gallery (enable/disable)
  - Close gallery if clicked outside of the image (enable/disable)
  - Close picture on page scroll (enable/disable)
  - Close gallery when dragging vertically and when image is not zoomed (enable/disable)
  - Show image counter (enable/disable)
  - Show PhotoSwipe fullscreen button (enable/disable)
  - Show PhotoSwipe zoom button (enable/disable)
  - PhotoSwipe history module (enable/disable)
  - Pinch to close gallery (enable/disable)
  - Toggle visibility of controls/buttons by tap (enable/disable)
  - allow to adjust PhotoSwipe background opacity (0-1)
  - Loop images (enable/disable)
  - Slide transition effect (enable/disable)
  - Swiping to change slides (enable/disable)
- gallery: add button to delete an image, enable by default
- Remote Buzzer Server based on io sockets
  - Enables a GPIO pin connected hardware button / buzzer for a setup where the display / screen is connected via WLAN / network to the photobooth webserver (e.g. iPad).

**General**
- check for supported mime types on API files (print, chromakeying, applyEffects, deletePhoto)
- core/chromakeying: Handle print.php API errors
- Standalone slideshow & Gallery:
  - only use pictures if they exist and if they are readable
  - only use thumbnails if thumbnail exist and is readable, fallback to full-sized images if not
- gallery: update picture counter font-size
- Crop on print: set image quality to 100% by default
- added disk usage page, access via admin panel or at [localhost/admin/diskusage.php](http://localhost/admin/diskusage.php).
- Updated [PhotoSwipe](https://github.com/andi34/PhotoSwipe)
- added `private/` to .gitignore, can be used e.g. to store own background images
- install-raspbian.sh:
  - check if gvfs-gphoto2-volume-monitor exists
  - remove unneeded "sudo" on yarn installation
  - make sure webserver is defined
  - Add missing common "nodejs" package
  - allow to choose between stable and development version
- update build dependencies to it's latest versions
- Photobooth joined Crowdin as localization manager, [join here](https://crowdin.com/project/photobooth) to translate Photobooth

**Workflow**
- github: add pull request template
- github: don't allow empty issues, emojis to issue template names

<hr>

#### 2.8.0
**Bugfixes**
- fix install-raspbian.sh
- add missing units for crop on print values (fixes [Issue #91](https://github.com/andi34/photobooth/issues/91))
- exit slideshow on close if running
- takeCollage: fix button size on small screens

**General**
- simple-translator updated to v2.0.2
- updated PHPMailer to latest version

**Behind the scenes**
- Add GitHub contribution doc
- run `yarn eslint` once changes to our JavaScripts get pushed to GitHub or if a Pullrequest contains changes on them
- run `gulp sass` once changes to our SCSS files get pushed to GitHub or if a Pullrequest contains changes on them

**New build pipeline and improved JavaScript**  
(special thanks to [Andreas Remdt](https://github.com/andreasremdt)) [#90](https://github.com/andi34/photobooth/pull/90)
  

- added Prettier to have consistent formatting for both JavaScript & SCSS
- Support older browser (should fix [Issue #47](https://github.com/andi34/photobooth/issues/47))
  - javascript transpiled to es5 to support older browsers (e.g. Safari 9)
  - use "whatwg-fetch" polyfill which should enable Safari 9 to use simple translator

<hr>

#### 2.7.2
**Bugfixes**
- use htmlentities on input type configuration (allows to load config containing quotes)

**General changes**
- Handle -1 & 100% picture quality the same way

**Changed default config**
- 100% picture quality by default
- Don't print QR Code by default
- Allow collage by default
  - Use collage without interruption by default
- Show date below pictures inside Gallery by default
- Disable Chromakeying by default

<hr>

#### 2.7.1
**Bugfixes**
- Fix taking photo collage

**General changes**
- simple-translator updated to v1.2.0

<hr>

#### 2.7.0
**New options**
- Add option to use numbered image names
- Allow to change picture permissons while taking a photo
  - usefully if you e.g. like to delete pictures as different user

<hr>

**General changes**
- Add database name to picture name if database changed from default name
- Show "Photobooth Gallery" if using date formatted images but no date available
- Add rpihotspot repo as submodule:
  - FAQ contains instructions to turn Photobooth into a WIFI Hotspot

**Bugfixes**
- Fix "Cheeeeese" on Apple devices
- Fix loading language resources
- Only take Photos if we aren't already

<hr>

#### 2.6.1
**Bugfixes**
- Fix video--sensor canvas
- Update Style for 5inch Display (800x480px)
- Attempt to fix taking Pictures and Collage via defined keys

<hr>

**General changes**
- Add offline FAQ, access directly via [http://localhost/manual/faq.html](http://localhost/manual/faq.html)
- Update jQuery to v3.5.1

<hr>

#### 2.6.0
**New options**
- Automatically reload Photobooth if an error occurs while taking a photo/collage (enabled by default)

**Bugfixes**
- Fix FC on Standalone Gallery if a keycode is defined to take a photo/collage
- Close gallery if a keycode is defined to take a photo/collage

**General changes**
- update PHPMailer to latest version

<hr>

#### 2.5.0
**New options**
- buttons inside gallery on bottom (can be put back on top via admin panel) [#66](https://github.com/andi34/photobooth/pull/66)
- define SSID used for QR on result page via admin panel [#70](https://github.com/andi34/photobooth/pull/70)

**Bugfixes**
- Fix Start Screen on devices with max-width @ 1024px [#68](https://github.com/andi34/photobooth/pull/68)

**General changes**
- install-raspbian: install recommended via git (easier update of Photobooth)
- mention personal fork additions inside README

<hr>

#### 2.4.0
**New Options**
- offline manual with settings explained under [localhost/manual](http://localhost/manual) (https://github.com/andi34/photobooth/pull/59)
- define collage frame seperately (https://github.com/andi34/photobooth/pull/63)
- event specific database: You can now rename the picture and email database via Adminpanel. Only pictures inside the defined database are visible via gallery. (https://github.com/andi34/photobooth/pull/61)
- Preview/Stream from device cam as background on start page (https://github.com/andi34/photobooth/pull/58)

<hr>

#### 2.3.3
**Bugfixes**
- qr code: no need to define width for the text

**General changes**
- index: remove unused "blurred" class
- Remove focus on "New Picture" and "New Collage" buttons
- update-booth.sh: delete old files if exist
- result screen: don't reload page after print

<hr>

#### 2.3.2
**Bugfixes**
- chromakeying: add favicon, add apple meta tags

**New options**
- Allow to rotate preview from URL

**General changes**
- Bump jquery from 3.4.1 to 3.5.0 (fixes a security vulnerability)
- .gitignore changes:
  - config folder: ignore everything but not "config.inc.php"
  - ignore the whole css folder instead defining every .css seperately
- Down-sized QR code
- adjust countdown and cheese colors for default blue-gray theme

<hr>

#### 2.3.1
**Bugfixes**
- Fix loading language files if Photobooth is installed in a subfolder

**General changes**
- add license files for node modules on packed builds
- Installer: Allow using latest prebuild package again

<hr>

#### 2.3.0
**General changes**
- Switch to blue-gray color theme by default
- Admin panel: switch to range config and use toggles instead checkboxes
- Switch to `simple-translator` for translations, use english as fallback language if a translation is missing. This also gives the possibility to easily translate Photobooth. ( [How to update or add translations?](https://github.com/andi34/photobooth/wiki/FAQ#how-to-update-or-add-translations) )

**New Options**
- Show/Hide button to toggle fullscreen mode

**Bugfixes**
- Fix placeholder for preview from stream URL

<hr>

#### 2.2.1
**New Options**
- Allow to rotate photo after taking
- Allow using a stream from URL at countdown for preview

**General changes**
- Remove unused resources/fonts/style.css
- language: use correkt ISO 639-1 Language Code for Greek
- Optimize picture size on result screen

<hr>

#### 2.2.0
**General changes**
- install-raspbian: use Apache2 webserver by default again
- added Slideshow option to Gallery
- standalone slideshow [localhost/slideshow](http://localhost/slideshow)
- access login via [localhost/login](http://localhost/login) instead [localhost/login.php](http://localhost/login.php)
- fix windows compatibility
- fix check for image filter
- performance improvement (https://github.com/andreknieriem/photobooth/pull/226)
- Improved width of admin- and login-panel (partially https://github.com/andreknieriem/photobooth/pull/221)
- general bug-fixes if device cam is used to take pictures (https://github.com/andreknieriem/photobooth/pull/220)

**New options**
- Option to disable the delete button (https://github.com/andreknieriem/photobooth/pull/228)
- Option to keep original images in tmp folder
- Configurable image preview while post-processing
- Adjustable time a image is shown after capture
- Optional EXIF data preservation (disabled by default)

<hr>

#### 2.1.0
**Optimize performance:**
- separate trigger and post-process task
- if possible use faster method to resize a picture

**Many new features and options added:**
- new options:
  - Make collage countdown timer adjustable
  - enable/disable real error messages
  - Allow setting a default filter
  - allow to disable filter
  - JPEG quality configurable
  - enable/disable download button in gallery
  - Allow defining a background via admin panel:
    This also gives the possibility to define a livestream URL (e.g. http://192.168.239.77:8081
    if motion is used ) to use a livestream as background.
  - Allow admins to choose what gets deleted at reset (inspired by https://github.com/andreknieriem/photobooth/issues/178)
    - always:
      - delete db.txt
    - optional (but enabled by default):
      - delete images
      - delete "mail-addresses.txt
      - delete personal config (my.config.inc.php)
  - Allow defining Photobooth web server IP to fix image download via QR-Code if Photobooth is accessed via localhost/127.0.0.1
  - Allow choosing a frame at take pic
  - Frames and font adjustable
  - allow protection of admin panel and index with password
  - allow using device cam to take pictures (save origin (localhost/127.0.0.1 if accessed on server, else HTTPS) needed!
  - define Photobooth colors using colorpicker
  - allow more elements to change color
  - allow defining default font size
  - optional rounded edges style
- admin panel style:
  - change weeding config to event config and add several new symbols to choose
  - own printer submenu
- Added raspi reset script
- allow to abort collage creation
- improve installation script
  - make kiosk mode optional
  - don't delete /var/www/html without request
  - use NGINX by default, optional allow to install Apache or Lighttpd
  - fix printer permissions and install CUPS by default

**General changes:**
- README: update formatting and cleanup
- Fix undefined placeholder warnings
- take picture: red error messages
- choose a filter after picture was taken instead before
- Display collage count before taking photo
- Handle take photo error cases

<hr>

#### 2.0.2:
- fix saving of chroma keying results, style for chroma keying, style of gallery caption, datetime string on images without date info

<hr>

#### 2.0.1:
- fix deletion of db file, fix config changes via admin settings

<hr>

#### 2.0.0:
- Overhaul: reorganized all source files, completely overhaul coding
- New features: gallery standalone (localhost/gallery.php), add button to delete the picture after it was taken and displayed on the screen, change style via admin panel, add trigger keys via config, add option to force the use of a buzzer, add option to enable CUPS button, add option to resize and crop image by center at print, use same printing settings/options for chromakeying as for normal prints, take pictures for collage one after the other with or without interruption, add version checker to admin page, add greek, add option to specify data folder
- Some more bugfixes and improvements as usually

<hr>

#### 1.9.0:
- Responsive Layout. Use relative paths to allow running Photobooth in a subfolder. Fix config.json being ignored on chromakeying. Adjustments on blue-gray theme. Some more small adjustments and bugfixes.

<hr>

#### 1.8.3:
- Adjust scrollbar config and add blue-gray scrollbar theme, allow using Pi Cam for preview and to take pictures, add hidden shortcut for admin settings, add polaroid effect, add print confirmation dialogue

<hr>

#### 1.8.2:
- Added spanish as supported language, print text on picture feature, optional blue-gray theme, adjust admin panel. Small bugfixes and improvements as always.

<hr>

#### 1.8.1:
- Small bugfixes and improvements. New Features: enable/disable printing QR-Code, enable/disable photo collage function, enable/disable printing a frame on your picture

<hr>

#### 1.8.0:
- Update jQuery, GSAP and PhotoSwipe to latest versions, add chroma keying feature (green screen keying)

<hr>

#### 1.7.0:
- Add possibillity to choose an image filter before taking a picture

<hr>

#### 1.6.3:
- Add config and instructions to use a GPIO Button to take a picture (address https://github.com/andreknieriem/photobooth/issues/10), translate sucess and error messages while sending images via mail

<hr>

#### 1.6.2:
- Add wedding specific config, fix gallery settings not being saved from admin panel

<hr>

#### 1.6.1:
- Add possibillity to disable mobile view, update Kiosk Mode instruction

<hr>

#### 1.6.0:
- Button to send image via mail (uses [PHPMailer](https://github.com/PHPMailer/PHPMailer) ), add use of "my.config.inc.php" for personal use to prevent sharing personal data (e.g. E-Mail password and username) on Github by accident

<hr>

#### 1.5.3:
- Several new options (disable gallery via config, set countdown timer via config, set cheeeese! Timer via config, ability to show the date/time in the caption of the images in the gallery), all config changes now available in admin page, complete french translation, add empty Gallery message, Fullscreen Mode on old iOS-Devices when starting photobooth from homescreen, StartScreen message is an option in config/admin page now, add instructions for Kiosk Mode, should fix #11, and #2, improve instructions in README, some more small Bugfixes and improvements. Merged pull-request #53 which includes updated pull-requests #52 & #54

<hr>

#### 1.5.2:
- Bugfixing QR-Code from gallery and live-preview position. Merged pull #45

<hr>

#### 1.5.1:
- Bugfixing

<hr>

#### 1.5.0:
- Added Options page under /admin. Bugfix for homebtn. Added option for device webcam preview on countdown

<hr>

#### 1.4.0:
- Merged several pull requests

<hr>

#### 1.3.2:
- Bugfix for QR Code on result page

<hr>

#### 1.3.1:
- Merged pull-request #6,#15 and #16

<hr>

#### 1.3.0:
- Option for QR and Print Butons, code rework, gulp-sass feature enabled

<hr>

#### 1.2.0:
- Printing feature, code rework, bugfixes

<hr>

#### 1.1.1:
- Bugix - QR not working on touch devices

<hr>

#### 1.1.0:
- Added QR Code to Gallery

<hr>

#### 1.0.0:
- Initial Release
