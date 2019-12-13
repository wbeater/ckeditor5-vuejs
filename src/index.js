import CKEditor from './ckeditor';
import Command from '@ckeditor/ckeditor5-core/src/command';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import DecoupledEditor from './decoupled-editor';
import UploaderPlugin from './uploader-plugin';
import InlineEditor from './lib/inlineeditor';
import BalloonEditor from './lib/ballooneditor';
import GrapesEditor from './components/GrapesEditor';
import EventBus from './services/EventBus';
import ImageEditor from './components/ImageEditor';
import CodeMirror from './components/CodeMirror';
// import AutosavePlugin from '@ckeditor/ckeditor5-autosave/src/autosave';
// import MediaEmbedPlugin from './ckeditor-embed';

// Vue.component('ckeditor', CKEditor); 
export { CodeMirror, GrapesEditor, ImageEditor, EventBus, CKEditor, DecoupledEditor, InlineEditor, BalloonEditor,/*MediaEmbedPlugin, AutosavePlugin,*/ UploaderPlugin, Command, Plugin, ButtonView, toWidget, toWidgetEditable, Widget };