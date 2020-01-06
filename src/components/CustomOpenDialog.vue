<template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
    import Vue from 'vue';
    import EventBus from '@/services/EventBus'
    
    export default {
        props: {
          'config': {type: Object, default: () => {return {show: false}}}
        },

        methods: {
          close() {
            this.config.show = false;
            Vue.set(this.config, 'show', false);

            EventBus.$emit('close-injectors', {
              'html': `
              <img src="https://img2.10bestmedia.com/Images/Photos/352450/GettyImages-913753556_54_990x660.jpg">
              `,
              'scripts': ['http://plugins.jquery.com/jquery-wp-content/themes/jquery/js/modernizr.custom.2.8.3.min.js'],
              'stylesheets' : ['http://plugins.jquery.com/jquery-wp-content/themes/plugins.jquery.com/style.css'],
              'js': 'console.log("Hello world");',
              'css': '',
            });

            this.$emit('onSelected', ['https://img2.10bestmedia.com/Images/Photos/352450/GettyImages-913753556_54_990x660.jpg']);
          }
        }
    }
</script>