/* exported rotaryController initRemoteBuzzerFromDOM remoteBuzzerClient */
/* global photoBooth photoboothTools globalGalleryHandle io */

let remoteBuzzerClient;
let rotaryController;
let buttonController;

// eslint-disable-next-line no-unused-vars
function initRemoteBuzzerFromDOM() {
    photoboothTools.console.logDev(
        'Remote Buzzer client:',
        config.remotebuzzer.usebuttons ||
            config.remotebuzzer.userotary ||
            config.remotebuzzer.usehid ||
            config.remotebuzzer.usesoftbtn
            ? 'enabled'
            : 'disabled'
    );

    /*
     ** Communication with Remote Buzzer Server
     */

    remoteBuzzerClient = (function () {
        let ioClient;
        const api = {};

        api.enabled = function () {
            return (
                config.remotebuzzer.usebuttons ||
                config.remotebuzzer.userotary ||
                config.remotebuzzer.usehid ||
                config.remotebuzzer.usesoftbtn
            );
        };

        api.init = function () {
            if (!this.enabled()) {
                return;
            }

            if (config.webserver.ip) {
                ioClient = io('http://' + config.webserver.ip + ':' + config.remotebuzzer.port);

                photoboothTools.console.logDev(
                    'Remote buzzer connecting to http://' + config.webserver.ip + ':' + config.remotebuzzer.port
                );

                ioClient.on('photobooth-socket', function (data) {
                    switch (data) {
                        case 'start-picture':
                            buttonController.takePicture();
                            break;

                        case 'start-collage':
                            buttonController.takeCollage();
                            break;

                        case 'collage-next':
                            // Need to handle collage process in button handler
                            if (buttonController.waitingToProcessCollage) {
                                buttonController.processCollage();
                            } else {
                                buttonController.takeCollageNext();
                            }
                            break;

                        case 'print':
                            buttonController.print();
                            break;

                        case 'rotary-cw':
                            rotaryController.focusNext();
                            break;

                        case 'rotary-ccw':
                            rotaryController.focusPrev();
                            break;

                        case 'rotary-btn-press':
                            rotaryController.click();
                            break;

                        default:
                            break;
                    }
                });

                ioClient.on('connect_error', function () {
                    photoboothTools.console.log(
                        'ERROR: remotebuzzer_client unable to connect to webserver ip - please ensure remotebuzzer_server is running on Photobooth server. Use Photobooth dev mode to create log file for debugging'
                    );
                });

                ioClient.on('connect', function () {
                    photoboothTools.console.logDev(
                        'remotebuzzer_client successfully connected to Photobooth webserver ip'
                    );
                });

                buttonController.init();
                rotaryController.init();

                rotaryController.focusSet('#start');
            } else {
                photoboothTools.console.log(
                    'ERROR: remotebuzzer_client unable to connect - webserver.ip not defined in photobooth config'
                );
            }
        };

        api.inProgress = function (flag) {
            if (this.enabled()) {
                if (flag) {
                    this.emitToServer('in-progress');
                } else {
                    this.emitToServer('completed');
                }
            }
        };

        api.collageWaitForNext = function () {
            if (this.enabled()) {
                this.emitToServer('collage-wait-for-next');
            }
        };

        api.collageWaitForProcessing = function () {
            buttonController.waitingToProcessCollage = true;

            if (this.enabled()) {
                this.emitToServer('collage-wait-for-next');
            }
        };

        api.startPicture = function () {
            if (this.enabled()) {
                this.emitToServer('start-picture');
            }
        };

        api.startCollage = function () {
            if (this.enabled()) {
                this.emitToServer('start-collage');
            }
        };

        api.emitToServer = function (cmd) {
            switch (cmd) {
                case 'start-picture':
                    ioClient.emit('photobooth-socket', 'start-picture');
                    break;
                case 'start-collage':
                    ioClient.emit('photobooth-socket', 'start-collage');
                    break;
                case 'in-progress':
                    ioClient.emit('photobooth-socket', 'in-progress');
                    break;
                case 'completed':
                    ioClient.emit('photobooth-socket', 'completed');
                    break;
                case 'collage-wait-for-next':
                    ioClient.emit('photobooth-socket', 'collage-wait-for-next');
                    break;
                default:
                    break;
            }
        };

        return api;
    })();

    /*
     ** Controls PB with hardware BUTTONS
     */
    buttonController = (function () {
        // vars
        const api = {};
        api.waitingToProcessCollage = false;

        api.init = function () {
            // nothing to init
        };

        api.enabled = function () {
            return (
                (config.remotebuzzer.usebuttons || config.remotebuzzer.usehid || config.remotebuzzer.usesoftbtn) &&
                typeof onStandaloneGalleryView === 'undefined' &&
                typeof onLiveChromaKeyingView === 'undefined'
            );
        };

        api.takePicture = function () {
            if (this.enabled()) {
                $('.resultInner').removeClass('show');
                photoBooth.thrill('photo', 0, true);
            }
        };

        api.takeCollage = function () {
            if (this.enabled() && config.collage.enabled) {
                $('.resultInner').removeClass('show');
                this.waitingToProcessCollage = false;
                photoBooth.thrill('collage');
            }
        };

        api.takeCollageNext = function () {
            $('#btnCollageNext').trigger('click');
        };

        api.processCollage = function () {
            this.waitingToProcessCollage = false;
            $('#btnCollageProcess').trigger('click');
        };

        api.print = function () {
            if ($('#result').is(':visible')) {
                $('.printbtn').trigger('click');
                $('.printbtn').blur();
            } else if ($('.pswp__button--print').is(':visible')) {
                $('.pswp__button--print').trigger('click');
            } else {
                remoteBuzzerClient.emitToServer('completed');
            }
        };

        return api;
    })();

    /*
     ** Controls PB with ROTARY encoder
     */

    rotaryController = (function () {
        // vars
        const api = {};

        // API functions
        api.enabled = function () {
            return (
                config.remotebuzzer.userotary &&
                (typeof onStandaloneGalleryView === 'undefined' ? true : config.remotebuzzer.enable_standalonegallery)
            );
        };

        api.init = function () {
            if (config.dev.enabled && typeof onStandaloneGalleryView !== 'undefined') {
                photoboothTools.console.log(
                    'Rotary Controller is ',
                    config.remotebuzzer.enable_standalonegallery ? 'enabled' : 'disabled',
                    ' for standalone gallery view'
                );
            }
        };

        api.focusSet = function (id) {
            if (this.enabled()) {
                this.focusRemove();
                $(id).find('.rotaryfocus').first().addClass('focused');
            }
        };

        api.focusRemove = function () {
            $('.focused').removeClass('focused');
        };

        api.focusNext = function () {
            if (this.rotationInactive() || !this.enabled()) {
                return;
            }

            if ($('.pswp.pswp--open').is(':visible')) {
                // photoswipe navigation

                const buttonList = $('.pswp.pswp--open').find('.rotaryfocus:visible');
                let focusIndex = buttonList.index($('.focused'));

                if (buttonList.eq(focusIndex + 1).exists()) {
                    focusIndex += 1;
                } else if (buttonList.eq(0).exists()) {
                    focusIndex = 0;
                }

                globalGalleryHandle.ui.setIdle(false);

                $('.focused')
                    .removeClass('focused pswp-rotary-focus')
                    .parents('.pswp.pswp--open')
                    .find('.rotaryfocus:visible')
                    .eq(focusIndex)
                    .addClass('focused pswp-rotary-focus')
                    .find('i.fa')
                    .css('z-index', '1');
            } else {
                const buttonList = $('.focused').parents('.rotarygroup').find('.rotaryfocus:visible');
                let focusIndex = buttonList.index($('.focused'));

                if (buttonList.eq(focusIndex + 1).exists()) {
                    focusIndex += 1;
                } else if (buttonList.eq(0).exists()) {
                    focusIndex = 0;
                }

                $('.focused')
                    .removeClass('focused')
                    .parents('.rotarygroup')
                    .find('.rotaryfocus:visible')
                    .eq(focusIndex)
                    .addClass('focused')
                    .focus();
            }
        };

        api.focusPrev = function () {
            if (this.rotationInactive() || !this.enabled()) {
                return;
            }

            if ($('.pswp.pswp--open').is(':visible')) {
                // photoswipe navigation
                const buttonList = $('.pswp.pswp--open').find('.rotaryfocus:visible');
                const focusIndex = buttonList.index($('.focused'));

                if (buttonList.eq(focusIndex - 1).exists()) {
                    globalGalleryHandle.ui.setIdle(false);

                    $('.focused')
                        .removeClass('focused pswp-rotary-focus')
                        .parents('.pswp.pswp--open')
                        .find('.rotaryfocus:visible')
                        .eq(focusIndex - 1)
                        .addClass('focused pswp-rotary-focus')
                        .find('i.fa')
                        .css('z-index', '1');
                }
            } else {
                const buttonList = $('.focused').parents('.rotarygroup').find('.rotaryfocus:visible');
                const focusIndex = buttonList.index($('.focused'));

                if (buttonList.eq(focusIndex - 1).exists()) {
                    $('.focused')
                        .removeClass('focused')
                        .parents('.rotarygroup')
                        .find('.rotaryfocus:visible')
                        .eq(focusIndex - 1)
                        .addClass('focused')
                        .focus();
                }
            }
        };

        api.rotationInactive = function () {
            if ($('.modal.modal--show').exists()) {
                return true;
            }

            return false;
        };

        api.click = function () {
            if (this.enabled()) {
                // click modal if open
                if ($('#qrCode.modal.modal--show').exists()) {
                    $('#qrCode').click();
                } else {
                    $('.focused').blur().trigger('click');

                    if ($('.pswp.pswp--open').is(':visible')) {
                        globalGalleryHandle.ui.setIdle(true);
                    }
                }
            }
        };

        // private helper functions
        $.fn.exists = function () {
            return this.length !== 0;
        };

        return api;
    })();

    remoteBuzzerClient.init();
}
