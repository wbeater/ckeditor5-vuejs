import './ckeditor.css';
import Vue from 'vue';
import CKEditor from './ckeditor';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import Command from '@ckeditor/ckeditor5-core/src/command';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import DecoupledEditor from './decoupled-editor';

Vue.component('ckeditor', CKEditor); 
export {CKEditor, DecoupledEditor, Autosave, Command, Plugin, ButtonView, toWidget, toWidgetEditable, Widget};