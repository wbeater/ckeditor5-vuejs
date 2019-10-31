<template>
    <div ref="tuiImageEditor" style="width: 100%;height: 100%;"></div>
</template>
<script>

// import 'tui-image-editor/dist/svg/icon-a.svg';
// import 'tui-image-editor/dist/svg/icon-b.svg';
// import 'tui-image-editor/dist/svg/icon-c.svg';
// import 'tui-image-editor/dist/svg/icon-d.svg';
// Load Style Code
// import 'tui-image-editor/dist/tui-image-editor.min.css';
// import 'tui-color-picker/dist/tui-color-picker.min.css';

import * as icona from '@/assets/tui-editor/svg/icon-a.svg';
import * as iconb from '@/assets/tui-editor/svg/icon-b.svg';
import * as iconc from '@/assets/tui-editor/svg/icon-c.svg';
import * as icond from '@/assets/tui-editor/svg/icon-d.svg';

import '@/assets/tui-editor/css/tui-color-picker.min.css';
import '@/assets/tui-editor/css/tui-image-editor.min.css';

import 'fabric';
import 'tui-code-snippet';
import 'tui-color-picker';
import ImageEditor from 'tui-image-editor';

const includeUIOptions = {
    includeUI: {
        initMenu: 'filter',
        theme: {
            'menu.normalIcon.path': icond,
            'menu.activeIcon.path': iconb,
            'menu.disabledIcon.path': icona,
            'menu.hoverIcon.path': iconc,
            'submenu.normalIcon.path': icond,
            'submenu.activeIcon.path': iconc,

            // 'menu.normalIcon.path': '/tui-editor/svg/icon-d.svg',
            // 'menu.activeIcon.path': '/tui-editor/svg/icon-b.svg',
            // 'menu.disabledIcon.path': '/tui-editor/svg/icon-a.svg',
            // 'menu.hoverIcon.path': '/tui-editor/svg/icon-c.svg',
            // 'submenu.normalIcon.path': '/tui-editor/svg/icon-d.svg',
            // 'submenu.activeIcon.path': '/tui-editor/svg/icon-c.svg',
        }
    }
};
const editorDefaultOptions = {
    cssMaxWidth: 700,
    cssMaxHeight: 500,
};
export default {
    props: {
        includeUi: {
            type: Boolean,
            default: true
        },
        options: {
            type: Object,
            default() {
                return editorDefaultOptions;
            }
        }
    },
    mounted() {
        let options = editorDefaultOptions;
        if (this.includeUi) {
            options = Object.assign(includeUIOptions, this.options);
        }

        console.log('tuiImageEditor: ', ImageEditor);
        this.editorInstance = new ImageEditor(this.$refs.tuiImageEditor, options);
        this.addEventListener();
    },
    destroyed() {
        Object.keys(this.$listeners).forEach(eventName => {
            this.editorInstance.off(eventName);
        });
        this.editorInstance.destroy();
        this.editorInstance = null;
    },
    methods: {
        addEventListener() {
            Object.keys(this.$listeners).forEach(eventName => {
                this.editorInstance.on(eventName, (...args) => this.$emit(eventName, ...args));
            });
        },
        getRootElement() {
            return this.$refs.tuiImageEditor;
        },
        getActions() {
            return this.editorInstance.getActions();
        },
        getInstance() {
            return this.editorInstance;
        },
        load(file) {
            return this.getActions().main.load(file);
        },
        loadUrl(url) {
            this.getActions().main.initLoadImage(url, 'image').then(() => {
                this.editorInstance.ui.activeMenuEvent();
            });
        },
        getDataURL() {
            return this.editorInstance.toDataURL();
        },
        /**
         * Change base64 to blob
         * @param {String} data - base64 string data
         * @returns {Blob} Blob Data
         */
        getDataBlob() {
            const rImageType = /data:(image\/.+);base64,/;
            let mimeString = '';
            let raw, uInt8Array, i;

            let data = this.editorInstance.toDataURL();

            raw = data.replace(rImageType, (header, imageType) => {
                mimeString = imageType;
                return '';
            });

            raw = atob(raw);
            const rawLength = raw.length;
            uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

            for (i = 0; i < rawLength; i += 1) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], {type: mimeString});
        },
        download() {
            return this.getActions().main.download();
        },
        invoke(methodName, ...args) {
            let result = null;
            if (this.editorInstance[methodName]) {
                result = this.editorInstance[methodName](...args);
            } else if (methodName.indexOf('.') > -1) {
                const func = this.getMethod(this.editorInstance, methodName);

                if (typeof func === 'function') {
                    result = func(...args);
                }
            }

            return result;
        },
        getMethod(instance, methodName) {
            const {first, rest} = this.parseDotMethodName(methodName);
            const isInstance = (instance.constructor.name !== 'Object');
            const type = typeof instance[first];
            let obj;

            if (isInstance && type === 'function') {
                obj = instance[first].bind(instance);
            } else {
                obj = instance[first];
            }

            if (rest.length > 0) {
                return this.getMethod(obj, rest);
            }

            return obj;
        },
        parseDotMethodName(methodName) {
            const firstDotIdx = methodName.indexOf('.');
            let firstMethodName = methodName;
            let restMethodName = '';

            if (firstDotIdx > -1) {
                firstMethodName = methodName.substring(0, firstDotIdx);
                restMethodName = methodName.substring(firstDotIdx + 1, methodName.length);
            }

            return {
                first: firstMethodName,
                rest: restMethodName
            };
        }
    }
};
</script>
<style>
.tui-image-editor-container .tui-image-editor {
    height: 100%;
    top: 0px !important;
}

.tui-image-editor-container .tui-image-editor-main {
    top: 0px;
}
.tui-image-editor-container .tui-image-editor-header {
    display:none;
}

.tui-image-editor-container .tui-image-editor-size-wrap {
    margin-bottom: 140px;
}
</style>