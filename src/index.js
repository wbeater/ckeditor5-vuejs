import Vue from 'vue';
import CKEditor from './ckeditor';
import Command from '@ckeditor/ckeditor5-core/src/command';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import DecoupledEditor from './decoupled-editor';
import UploaderPlugin from './uploader-plugin';
// import AutosavePlugin from '@ckeditor/ckeditor5-autosave/src/autosave';
// import MediaEmbedPlugin from './ckeditor-embed';

Vue.component('ckeditor', CKEditor); 
export {CKEditor, DecoupledEditor, /*MediaEmbedPlugin, AutosavePlugin,*/ UploaderPlugin, Command, Plugin, ButtonView, toWidget, toWidgetEditable, Widget};