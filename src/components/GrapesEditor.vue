<template>
    <div id="custom_gjs" style="overflow:hidden;height:0px;">
      <div v-if="!!html" v-html="'<style>' + css + '</style>' + html + '<script>' + js + '</script>'"></div>
      <div v-else>
        <div style="position: absolute;left: -1000px;" v-html="'<style>' + css + '</style>'"></div>
        <slot></slot>
        <div style="position: absolute;left: -1000px;" v-html="'<script>' + js + '</script>'"></div>
      </div>
    </div>
</template>

<script>
// https://grapesjs.com/docs/guides/Replace-Rich-Text-Editor.html#interface
// import "@/node_modules/grapesjs/dist/css/grapes.min";

// import Rest from '@/services/rest';

import grapesjs from 'grapesjs';

import 'grapesjs-component-countdown';
import 'grapesjs-flipclock';
import 'grapesjs-lory-slider';
import 'grapesjs-blocks-bootstrap4';
import 'grapesjs-bs4';
import 'grapesjs-wbeater';
// import 'grapesjs-style-gradient';

/**********BEGIN Image editor ************* */
// import '@/assets/tui-editor/svg/icon-a.svg';
// import '@/assets/tui-editor/svg/icon-b.svg';
// import '@/assets/tui-editor/svg/icon-c.svg';
// import '@/assets/tui-editor/svg/icon-d.svg';

// Load Style Code
// import '@/assets/tui-editor/css/tui-image-editor.min.css';
// import '@/assets/tui-editor/css/tui-color-picker.min.css';
/**********END Image editor ************* */

//Load script code
// import '@/assets/tui-editor/js/fabric.min.js';
// import '@/assets/tui-editor/js/tui-code-snippet.min.js';
// import '@/assets/tui-editor/js/tui-color-picker.min.js';
// import '@/assets/tui-editor/js/tui-image-editor.min.js';

import grapesjsTabs from 'grapesjs-tabs';
import grapesjsCustomCode from 'grapesjs-custom-code';
import grapesjsTouch from 'grapesjs-touch';
// import grapesjsParserPostcss from 'grapesjs-parser-postcss';
import grapesjsTooltip from 'grapesjs-tooltip';
import grapesjsTuiImageEditor from 'grapesjs-tui-image-editor-custom';
import grapesjsStyleFilter from 'grapesjs-style-filter'; 

grapesjs.plugins.add('grapesjs-tabs', grapesjsTabs);
grapesjs.plugins.add('grapesjs-tui-image-editor', grapesjsTuiImageEditor);
grapesjs.plugins.add('grapesjs-custom-code', grapesjsCustomCode);
grapesjs.plugins.add('grapesjs-touch', grapesjsTouch);
// grapesjs.plugins.add('grapesjs-parser-postcss', grapesjsParserPostcss);
grapesjs.plugins.add('grapesjs-tooltip', grapesjsTooltip);
grapesjs.plugins.add('grapesjs-style-filter', grapesjsStyleFilter);

// import grapesjsStyleGradient from '@/plugins/grapesjs-style-gradient';
// grapesjs.plugins.add('grapesjs-style-gradient', grapesjsStyleGradient);


// grapesjs.plugins.add('grapesjs-custom-code', () => import('grapesjs-custom-code'));
// grapesjs.plugins.add('grapesjs-touch', () => import('grapesjs-touch'));
// grapesjs.plugins.add('grapesjs-parser-postcss', () => import('grapesjs-parser-postcss'));
// grapesjs.plugins.add('grapesjs-tooltip', () => import('grapesjs-tooltip'))

import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css"
import "grapesjs-preset-webpage";
import "grapesjs-preset-newsletter";

import customStyleManager from './style-manager';
import './style-manager.css';

import initGrapesAssets from '@/components/CustomOpenAssets';


// import * as icona from '@/assets/tui-editor/svg/icon-a.svg';
// import * as iconb from '@/assets/tui-editor/svg/icon-b.svg';
// import * as iconc from '@/assets/tui-editor/svg/icon-c.svg';
// import * as icond from '@/assets/tui-editor/svg/icon-d.svg';

// import '@/assets/tui-editor/css/tui-color-picker.min.css';
// import '@/assets/tui-editor/css/tui-image-editor.min.css';

// import 'fabric';
// import 'tui-code-snippet';
// import 'tui-color-picker';
// import ImageEditor from 'tui-image-editor';

const defaultTuiEditor = {
  config: {
    crossOrigin: 'anonymous',
    includeUI: {
      initMenu: 'filter',
    },
  },
  // constructor: ImageEditor,
  // icons: {
  //   'menu.normalIcon.path': icond,
  //   'menu.activeIcon.path': iconb,
  //   'menu.disabledIcon.path': icona,
  //   'menu.hoverIcon.path': iconc,
  //   'submenu.normalIcon.path': icond,
  //   'submenu.activeIcon.path': iconc,
  // },
  // script: [],
  // style: [],
};

// const DEFAULT_STYLES = [
//   'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
// ];

// const DEFAULT_SCRIPTS = [
//   'https://code.jquery.com/jquery-3.4.1.min.js',
//   //'https://code.jquery.com/jquery-3.3.1.slim.min.js',
//   'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
//   'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
// ];

import {GoogleCss} from './google-font-families';

const defaultLibs = {
  jquery: {
    js: ['https://code.jquery.com/jquery-3.4.1.min.js'],
    css: [],
  },

  bootstrap: {
    js: ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',],
    css: ['https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'],
  },

  fonts: {
    js: [],
    css: [GoogleCss,]
  }
};

const defaultConfig = {
  jquery: true,
  bootstrap: true,
  fonts: true, 
}

export default {
  data: function() {
    return {
      
    };
  },

  props: {
    //'openAssets': {type: Object, default: undefined},
    mail: {type: Boolean, default: false},
    allowExport: {type: Boolean, default: false}, // Show Export HTML button
    allowScripts: {type: Boolean, default: false},
    'mediaConfig': {type: Object, default: () => {return {show: false, fonts: true, jquery: true, bootstrap: true}}},

    'html': {type: String, default: () => ('')}, 
    'css': {type: String, default: ''},
    'js': {type: String, default: ''},
    'model': {type: Object, default: () => ({
        html: '',
        js: '',
        css: '',
        scripts: [],
        stylesheets: [],
    })},

    'scripts': {type: Array, default: () => []},
    'stylesheets': {type: Array, default: () => []},
    'images': {type: Array, default: () => []},

    ///////////////////////NOT USED
    'urlStore': {type: String, default: undefined}, 
    'urlLoad' :  {type: String, default: undefined}, 
    'stepsBeforeSave': {type: Number, default: 10}, 
    'onUploadAsync': {type: Function, default: async () => {}},
    'tuiEditorConfig': {type: Object, default: () => {}}
  },

  created() {
    window.addEventListener('resize', () => {
      let el = document.querySelector('#custom_gjs');
      if (el && el.style) el.style.height = (window.innerHeight - 50) + 'px';
    });
  },
  mounted() {
    this.reload();
  },

  methods: {
    reload() {
      this.getEditor(true).render();
      // this.getEditor().on('load', this.editorLoaded);
      this.getEditor().on("change", this.editorChanged);
    },

    getEditor(renew=false) {
      if (renew && window.grapeseditor && window.grapeseditor.destroy) {
         window.grapeseditor.destroy();
      }
      
      if (!renew && window.grapeseditor) {
        return window.grapeseditor;
      }

      let editor = this.createGrapesEditor() || {};

      editor.Commands.add('open-assets',  initGrapesAssets(this.mediaConfig));

      window.grapeseditor = editor;
      return window.grapeseditor;
    },

    createGrapesEditor() {
      let config = {
        ...defaultConfig,
        ...this.mediaConfig
      }

      let styles = [];
      let scripts = [];

      for (let lib in defaultLibs) {
        if (config[lib] && defaultLibs[lib]) {
          if (defaultLibs[lib].css) styles = styles.concat(defaultLibs[lib].css);
          if (defaultLibs[lib].js) scripts = scripts.concat(defaultLibs[lib].js);
        }
      }

      if (this.stylesheets) {
        styles = (styles.concat(this.stylesheets)).filter((value, idx, self) => {
          return self.indexOf(value) === idx;
        });
      }

      // let scripts = DEFAULT_SCRIPTS;
      if (this.scripts) {
        scripts = (scripts.concat(this.scripts)).filter((value, idx, self) => {
          return self.indexOf(value) === idx;
        });
      }

      let canvasCss = `
        .gjs-dashed div[data-gjs-type]:not(*[data-gjs-type="default"]) {min-height: 20px; min-width: 20px}
        .gjs-dashed div[data-gjs-type="bs_container"] {height: 100%;}
        .gjs-dashed div[data-gjs-type="bs_tabs-panes"],.gjs-dashed div[data-gjs-type="bs_card_container"] {min-height: 72px}
        .gjs-dashed div[data-gjs-type="bs_row"],
        .gjs-dashed div[data-gjs-type="bs_col"] {min-height: 24px;}
        .gjs-dashed div[data-gjs-type="bs_tabs-tab-pane"] {outline: 1px dashed rgba(170,170,170,0.7);display: block !important;opacity:0.6 !important;}
        .gjs-dashed div[data-gjs-type="bs_tabs-tab-pane"].show {outline: 1px dashed red !important;opacity:1 !important;}
        div[data-gjs-type="map"] iframe.gjs-no-pointer {width: inherit !important;}
      `;
      let urlStore = this.urlStore;
      let urlLoad = this.urlLoad;
      let images = this.images;
      let stepsBeforeSave = this.stepsBeforeSave;
      let height = window.innerHeight - 50;
      let allowExport = this.allowExport;

      const pluginConfig = this.getPlugins(config);

      let editor = grapesjs.init({
        allowScripts: this.allowScripts,
        avoidInlineStyle: 1,
        height: height + 'px',
        container: "#custom_gjs",
        components: '',
        fromElement: true,
        showOffsets: 1,
        noticeOnUnload: 1,
        storeComponents: true,
        storeStyles: true,
        autorender: false,
        //style: this.css,
        canvasCss,
        canvas: {
          styles: styles,
          scripts: scripts,
        },
        assetManager: {
          embedAsBase64: 0,
          assets: images,
          // disableUpload: false,
          uploadFile: this.uploadAsset,
        },
        styleManager: { 
          clearProperties: 1,
          sectors: [
            {
              name: 'Filters',
              properties: [ {
                name: 'Filter',
                property: 'filter',
                type: 'filter', // <- the new type
                full: 1,
              },
              // {
              //   name: 'Gradient',
              //   property: 'background-image',
              //   type: 'gradient',
              //   defaults: 'none'
              // }
              ],
            },
            {
              name: 'Others',
              open: false,
              properties: [ {
                name: 'Z Index',
                property: 'z-index',
                type: 'integer'
              },
              // {
              //   name: 'Gradient',
              //   property: 'background-image',
              //   type: 'gradient',
              //   defaults: 'none'
              // }
              ],
            },
          ]
          
        },
        plugins: pluginConfig.plugins,
        pluginsOpts: pluginConfig.options,
        storageManager: {
          id: 'gjseditor-',         // Prefix identifier that will be used inside storing and loading
          type: 'remote',           // Type of the storage : local | remote
          
          stepsBeforeSave,          // If autosave enabled, indicates how many changes are necessary before store method is triggered
          autosave: !!urlStore,     // Store data automatically
          urlStore,
          autoload: !!urlLoad,      // Autoload stored data on init
          urlLoad,
          storeComponents: true,    // Enable/Disable storing of components in JSON format
          storeStyles: true,        // Enable/Disable storing of rules in JSON format
          storeHtml: true,          // Enable/Disable storing of components as HTML string
          storeCss: true,           // Enable/Disable storing of rules as CSS string
          contentTypeJson: true,
          
          params: { _t: Date.now()}, // Custom parameters to pass with the remote storage request, eg. CSRF token
          headers: {}, // Custom headers for the remote storage request
        },
      });

      var pn = editor.Panels;
      // var modal = editor.Modal;
      // var cmdm = editor.Commands;

      // Store and load events
      editor.on("storage:load", function(e) {
        editor.render();
      });
      // editor.on("storage:store", function(e) {
      //   console.log("Storage Stored ", e);
      // });

       editor.on('component:selected', model => {
            var $ = grapesjs.$;
            
            if ($) {
              if (model && model.ccid) {
                var selTitle = $('#gjs-clm-sel-help #gjs-clm-label');
                var selHelp = $('#gjs-clm-sel-help #gjs-clm-sel');

                if (selTitle && selHelp) {
                  if (selHelp.text().indexOf('#' + model.ccid) == -1) {
                    selTitle.text("Selector (ID: #" + model.ccid + "): ");
                  }
                  else {
                    selTitle.text("Selector: ");
                  }
                }
              }
            }
        });

      // Do stuff on load
      editor.on("load", function() {
          var $ = grapesjs.$;

          // Load and show settings and style manager
          var openTmBtn = pn.getButton('views', 'open-tm');
          openTmBtn && openTmBtn.set('active', 1);
          var openSm = pn.getButton('views', 'open-sm');
          openSm && openSm.set('active', 1);

          editor.runCommand('sw-visibility');

          // Add Settings Sector
          if ($) {
            var traitsSector = $(
              '<div class="gjs-sm-sector no-select">' +
                '<div class="gjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
                '<div class="gjs-sm-properties" style="display: none;"></div>' + 
              '</div>'
            );

            var traitsProps = traitsSector.find(".gjs-sm-properties");
            traitsProps.append($(".gjs-trt-traits"));
            $(".gjs-sm-sectors").before(traitsSector);

            const exports = $('.gjs-pn-btn.fa-code');
            if (!allowExport && exports) exports.remove();

            traitsSector.find(".gjs-sm-title").on("click", function() {
              var traitStyle = traitsProps.get(0).style;
              var hidden = traitStyle.display == "none";
              if (hidden) {
                traitStyle.display = "block";
              } else {
                traitStyle.display = "none";
              }
            });

            $('.gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa.fa-square-o').click();
          }
        });

      // Open block manager
      // var openBlocksBtn = editor.Panels.getButton("views", "open-blocks");
      // openBlocksBtn && openBlocksBtn.set("active", 1);
      // window.editor = editor;
      return editor;
    },



    // ___editorLoaded() {
    //   console.log('Editor onloaded');
    //   if (this.autoload) {
    //     let response = Rest.get(this.urlLoad, {_t: Date.now()})
        
    //     if (response && response.data && response.data.result) {
    //         this.getEditor().setStyle(response.data.result.css);
    //         this.getEditor().setComponents(response.data.result.html);
    //     }
    //   }
    //   else if (this.html) {
    //     this.getEditor().setStyle(this.css);
    //     this.getEditor().setComponents(this.html);
    //   }
    // },

    editorChanged() {
      // console.log('Editor on changed');
      this.model.html = this.getEditor().getHtml();
      const cjs = this.getEditor().getConfig().canvas.js || {};
      let js =this.getEditor().getJs();


      for (var id in cjs) {
        if (cjs[id] && cjs[id][1]) {
          this.model.html += `<script id="s_${id}">${cjs[id]}<\/script>`;
          js += ';' + cjs[id];
        }
      }

      this.model.css = this.getEditor().getCss();
      this.model.js = js;
      
      this.model.scripts = this.getEditor().getConfig().canvas.scripts || [];
      this.model.stylesheets = this.getEditor().getConfig().canvas.styles || [];

      // this.model.scripts = (this.getEditor().getConfig().canvas.scripts || []).filter((item) => {
      //   return this.defaultScripts.indexOf(item) == -1;
      // });
      
      // this.model.stylesheets = (this.getEditor().getConfig().canvas.styles || []).filter((item) => {
      //   return this.defaultStylesheets.indexOf(item) == -1;
      // });

      this.$emit("change", this.model);
    },

    saveEdits() {
      this.getEditor().store();
    },

    uploadAsset(e) {
        //https://grapesjs.com/docs/modules/Assets.html#configuration
        (async() => {
            // const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            // const formData = new FormData();
            
            // formData.append("files", files[0]); // containing all the selected images from local
            // let response = await Rest.post(this.imgUpload || Constant.TPL_IMG_UPLOAD, formData, {
            //     headers: { "Content-Type": "multipart/form-data" }
            // });

            // const assets = response.data.data.map(imageName => ({
            //     name: imageName,
            //     src: (this.imgView || Constant.TPL_IMG_VIEW).replace('{id}', imageName)
            // }));

          
            let assets = await this.onUploadAsync(e);
            this.getEditor().AssetManager.add(assets);
            this.getEditor().AssetManager.render();
        })();
    },

    createHtmlElement(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();

      // Change this to div.childNodes to support multiple top-level nodes
      return div.firstChild; 
    },

    getPlugins(config) {
      if (!this.mail) {
        // const customStyles = customStyleManager(!this.mediaConfig.disableFonts);
        const customStyles = customStyleManager(config.fonts);
        const tuiEditorConfig = {...defaultTuiEditor, ...this.tuiEditorConfig};

        return {
          plugins: [
            "gjs-preset-webpage",
            'grapesjs-custom-code',
            'grapesjs-touch',
            'grapesjs-tooltip',
            'grapesjs-style-filter',
            'grapesjs-tabs',
            'grapesjs-blocks-bootstrap4',
            "grapesjs-lory-slider",
            "grapesjs-flipclock",
            'grapesjs-bs4',
            'grapesjs-wbeater',
            // 'grapesjs-tui-image-editor',

            // 'grapesjs-style-gradient',
            // 'gjs-style-gradient',
            // 'grapejs-parser-postcss',
            // grapejsTabs,          
            // grapesjsCustomCode,
            // grapesjsTouch,
            // grapesjsTooltip,
            // grapesjsParserPostcss,
          ],

          options: {
            'grapesjs-blocks-bootstrap4': {
                blocks: {},
                blockCategories: {
                  layout: true,
                  components: true,
                  typography: true,
                  basic: true, //die for slider
                  forms: true,
                },
                labels: { },
                formPredefinedActions: null,
                optionsStringSeparator: '::'
            },
            "grapesjs-lory-slider": {
              sliderBlock: {
                category: "Extra"
              }
            },
            'grapesjs-tabs': {
              tabsBlock: {
                category: 'Extra'
              }
            },
            'grapesjs-bs4': {

            },
            // 'grapesjs-style-gradient': {
            //   colorPicker: 'default',
            //   grapickOpts: {
            //     min: 1,
            //     max: 99 
            //   }
            // },
            "gjs-preset-webpage": {
              modalImportTitle: "Import Template",
              modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
              modalImportContent: function(editor) {
                return editor.getHtml() + "<style>" + editor.getCss() + "</style>";
              },
              // filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
              aviaryOpts: false,
              blocksBasicOpts: { 
                flexGrid: 1,
                stylePrefix: 'basic-',
              },
              customStyleManager: customStyles,
            }, 
            'grapesjs-tui-image-editor': tuiEditorConfig,
          }
        }
      }
      else {
        return {
          plugins: [
            'gjs-preset-newsletter',
            //'gjs-plugin-ckeditor'
          ],
          options: {
            'gjs-preset-newsletter': {
              modalLabelImport: 'Paste all your code here below and click import',
              modalLabelExport: 'Copy the code and use it wherever you want',
              codeViewerTheme: 'material',
              //defaultTemplate: templateImport,
              importPlaceholder: '<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
              cellStyle: {
                'font-size': '12px',
                'font-weight': 300,
                'vertical-align': 'top',
                color: 'rgb(111, 119, 125)',
                margin: 0,
                padding: 0,
              }
            },
            // 'gjs-plugin-ckeditor': {
            //   position: 'center',
            //   options: {
            //     startupFocus: true,
            //     extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
            //     allowedContent: true, // Disable auto-formatting, class removing, etc.
            //     enterMode: CKEDITOR.ENTER_BR,
            //     extraPlugins: 'sharedspace,justify,colorbutton,panelbutton,font',
            //     toolbar: [
            //       { name: 'styles', items: ['Font', 'FontSize' ] },
            //       ['Bold', 'Italic', 'Underline', 'Strike'],
            //       {name: 'paragraph', items : [ 'NumberedList', 'BulletedList']},
            //       {name: 'links', items: ['Link', 'Unlink']},
            //       {name: 'colors', items: [ 'TextColor', 'BGColor' ]},
            //     ],
            //   }
            // }
          }
        }
      }
    },
  },
}






// grapesjs-plugin-export - Export GrapesJS templates in a zip archive
// grapesjs-plugin-filestack - Add Filestack uploader in Asset Manager
// grapesjs-plugin-ckeditor - Replaces the built-in RTE with CKEditor
// grapesjs-aviary - Add the Aviary Image Editor (dismissed, use the plugin below instead)
// grapesjs-tui-image-editor - GrapesJS TOAST UI Image Editor
// grapesjs-blocks-basic - Basic set of blocks
// grapesjs-plugin-forms - Set of form components and blocks
// grapesjs-navbar - Simple navbar component
// grapesjs-component-countdown - Simple countdown component
// grapesjs-style-gradient - Add gradient type input to the Style Manager
// grapesjs-style-filter - Add filter type input to the Style Manager
// grapesjs-blocks-flexbox - Add the flexbox block
// grapesjs-lory-slider - Slider component by using lory
// grapesjs-tabs - Simple tabs component
// grapesjs-tooltip - Simple, CSS only, tooltip component for GrapesJS
// grapesjs-custom-code - Embed custom code
// grapesjs-touch - Enable touch support
// grapesjs-indexeddb - Storage wrapper for IndexedDB
// grapesjs-firestore - Storage wrapper for Cloud Firestore
// grapesjs-parser-postcss - Custom CSS parser for GrapesJS by using PostCSS
</script>

<style>
  #gjs-sm-float,
  .gjs-pn-views .fa-cog {
    display: none;
  }

  .gjs-pn-panel.gjs-pn-views {
    padding: 0;
    border-bottom: none;
  }

  .gjs-pn-btn.gjs-pn-active {
    box-shadow: none;
  }

  .gjs-pn-views .gjs-pn-btn {
    margin: 0;
    height: 40px;
    padding: 10px;
    width: 33.3333%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  .gjs-mdl-dialog {
    max-width: inherit !important;
  }

  .gjs-field-wrp--datetime-local {
    max-width: 70%;
  }
</style>