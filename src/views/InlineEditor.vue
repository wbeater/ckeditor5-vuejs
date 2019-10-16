<template>
  <div id="core-view">
    Hello all,
    <br />
    <!-- <ckeditor :config="editorConfig" v-model="content"></ckeditor> -->
    <br />

    <div id="editor">
      <h2>Sample</h2>

      <p>
        This is an instance of the
        <a
          href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#inline-editor"
        >inline editor build</a>.
      </p>

      <p>
        You can use this sample to validate whether your
        <a
          href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html"
        >custom build</a> works fine.
      </p>
    </div>
  </div>
</template>

<script>
import {
  CKEditor,
  InlineEditor,
  AutosavePlugin,
  UploaderPlugin
} from "@/index";

export default {
  data() {
    return {
      content: "",
      inlineEditor: InlineEditor,
      editorConfig: {
        toolbar: {
          viewportTopOffset: 50, //<-- height of fixed header
          items: [
            "heading",
            "|",
            "fontsize",
            "fontfamily",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "link",
            "blockquote",
            "imageUpload",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo"
          ]
        },
        allowedContent: true,
        // extraAllowedContent: '*(*);*{*}',
        extraPlugins: null,
        // extraPlugins = [UploaderPlugin, Autosave, AffBox,CKMedia(this.mediaDialog)];
        autosave: {
          waitingTime: 60000
        },
        // mediaEmbed: MediaEmbedPlugin
      }
    };
  },
  mounted() {
    InlineEditor.create(document.querySelector("#editor"))
      .then(editor => {
        window.editor = editor;
      })
      .catch(err => {
        console.error(err.stack);
      });

    // BalloonEditor
    //     .create( document.querySelector( '#balloon' ) )
    //     .catch( error => {
    //         console.error( error );
    //     } );
  }
}
</script>