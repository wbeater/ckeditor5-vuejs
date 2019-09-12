<template>
  
    <div id="core-view">
        Hello all,<br/>
        <ckeditor :config="editorConfig" v-model="content"></ckeditor>
    </div>
</template>

<script>
  import {CKEditor, AutosavePlugin, MediaEmbedPlugin, UploaderPlugin} from './index';
  export default {
      data() {
          return {
            content: '',
            editorConfig: {
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
                // extraPlugins = [UploaderPlugin, Autosave, AffBox,CKMedia(this.mediaDialog)];
                autosave: {
                    waitingTime: 60000,
                },
                mediaEmbed: MediaEmbedPlugin
            } 
          }
      },
	  mounted() {
	    
	  }
  }
</script>
