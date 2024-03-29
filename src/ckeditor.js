/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global console */

import { debounce } from 'lodash-es';
import DecoupledEditor from './decoupled-editor';
import AutosavePlugin from '@ckeditor/ckeditor5-autosave/src/autosave';
import MediaEmbedPlugin from './ckeditor-embed';
import './ckeditor.css';

const INPUT_EVENT_DEBOUNCE_WAIT = 300;

export default {
	name: 'ckeditor',

	render( createElement ) {
		return createElement( this.tagName );
	},

	props: {
		editor: {
			type: Function,
			default: DecoupledEditor
		},
		value: {
			type: String,
			default: ''
		},
		config: {
			type: Object,
			default: () => ( {
                toolbar: {
                    viewportTopOffset : 50,    //<-- height of fixed header
                    items: [
                        "heading", "|", "fontsize", "fontfamily", "|", "bold", "italic", "underline", "strikethrough", "highlight", "|", "alignment", "|", 
                        "numberedList", "bulletedList", "|", "link", "blockquote", "imageUpload", "insertTable", "mediaEmbed", "|", "undo", "redo",
                    ],
                },
                allowedContent: true,
                // extraAllowedContent: '*(*);*{*}',
                extraPlugins: null,
                autosave: {
                    waitingTime: 60000,
				},
				mediaEmbed: MediaEmbedPlugin,
			} )
		},
		tagName: {
			type: String,
			default: 'div'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			// Don't define it in #props because it produces a warning.
			// https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow
			instance: null,

			$_lastEditorData: {
				type: String,
				default: ''
			}
		};
	},

	mounted() {
		if ( this.value ) {
			Object.assign( this.config, {
				initialData: this.value
			} );
		}

		if (!this.config) this.config = {};
		if (!this.config.mediaEmbed) this.config.mediaEmbed = MediaEmbedPlugin;
		if (!this.config.extraPlugins) this.config.extraPlugins = [];
		this.config.extraPlugins.push(AutosavePlugin);

		this.editor.create( this.$el, this.config )
			.then( editor => {
				// Save the reference to the instance for further use.
				this.instance = editor;

				// Set initial disabled state.
				editor.isReadOnly = this.disabled;

				this.$_setUpEditorEvents();

				editor.ui.getEditableElement().parentElement.insertBefore(
					editor.ui.view.toolbar.element,
					editor.ui.getEditableElement()
				);
				
				// Let the world know the editor is ready.
				this.$emit( 'ready', editor );
			} )
			.catch( error => {
				console.error( error );
			} );
	},

	beforeDestroy() {
		if ( this.instance ) {
			this.instance.destroy();
			this.instance = null;
		}

		// Note: By the time the editor is destroyed (promise resolved, editor#destroy fired)
		// the Vue component will not be able to emit any longer. So emitting #destroy a bit earlier.
		this.$emit( 'destroy', this.instance );
	},

	watch: {
		value( newValue, oldValue ) {
			// Synchronize changes of instance#value. There are two sources of changes:
			//
			//                     External value change      ------\
			//                                                       -----> +-----------+
			//                                                              | Component |
			//                                                       -----> +-----------+
			//                     Internal data change       ------/
			//              (typing, commands, collaboration)
			//
			// Case 1: If the change was external (via props), the editor data must be synced with
			// the component using instance#setData() and it is OK to destroy the selection.
			//
			// Case 2: If the change is the result of internal data change, the #value is the same as
			// instance#$_lastEditorData, which has been cached on instance#change:data. If we called
			// instance#setData() at this point, that would demolish the selection.
			//
			// To limit the number of instance#setData() which is time-consuming when there is a
			// lot of data we make sure:
			//    * the new value is at least different than the old value (Case 1.)
			//    * the new value is different than the last internal instance state (Case 2.)
			//
			// See: https://github.com/ckeditor/ckeditor5-vue/issues/42.
			if ( this.instance && newValue !== oldValue && newValue !== this.$_lastEditorData ) {
				this.instance.setData( newValue );
			}
		},

		// Synchronize changes of #disabled.
		disabled( val ) {
			this.instance.isReadOnly = val;
		}
	},

	methods: {
		$_setUpEditorEvents() {
			const editor = this.instance;
			const emitInputEvent = evt => {
				// Cache the last editor data. This kind of data is a result of typing,
				// editor command execution, collaborative changes to the document, etc.
				// This data is compared when the component value changes in a 2-way binding.
				const data = this.$_lastEditorData = editor.getData();

				// The compatibility with the v-model and general Vue.js concept of input–like components.
				this.$emit( 'input', data, evt, editor );
			};

			// Debounce emitting the #input event. When data is huge, instance#getData()
			// takes a lot of time to execute on every single key press and ruins the UX.
			//
			// See: https://github.com/ckeditor/ckeditor5-vue/issues/42
			editor.model.document.on( 'change:data', debounce( emitInputEvent, INPUT_EVENT_DEBOUNCE_WAIT ) );

			editor.editing.view.document.on( 'focus', evt => {
				this.$emit( 'focus', evt, editor );
			} );

			editor.editing.view.document.on( 'blur', evt => {
				this.$emit( 'blur', evt, editor );
			} );
		}
	}
};