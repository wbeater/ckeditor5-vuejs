<template>
  <codemirror
    :options="{
        extraKeys: {'Ctrl-Space': 'autocomplete'},
        mode: 'javascript',
        lineNumbers: true,
        autoCloseTags: true,
        theme: 'monokai'
    }"
    :value="code"
  ></codemirror>
</template>

<script>
import { CodeMirror } from "@/index";
//   require('codemirror/mode/javascript/javascript')
//   require('codemirror/mode/vue/vue')

//   require('codemirror/addon/hint/show-hint.js')
//   require('codemirror/addon/hint/show-hint.css')
//   require('codemirror/addon/hint/javascript-hint.js')

export default {
  components: {
    codemirror: CodeMirror
  },
  data() {
    return {
      code: `
            import Router from 'vue-router'
            Vue.use(Router)

            import App from './App.vue'
            import GrapesEditor from '@/views/GrapesEditor';
            import CodeMirrorTest from '@/views/CodeMirrorTest';
        `
    };
  },
  mounted() {}
};
</script>