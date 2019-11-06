<template>
  <v-container>
        <v-btn
          color="red lighten-2"
          dark
          @click.stop="config.show = true"
        >
          Open dialog
        </v-btn>

    <v-row>
      <v-col cols="12">
        <grape-editor :stylesheets="['/demo.css']" :mediaConfig="config" :html="html" js="alert('test');">
        </grape-editor>
      </v-col>
    </v-row>


    <v-dialog persistent v-model="config.show" max-width="100%" height="100%" style="z-index:1000;">
        <custom-open-dialog :config="config" @onSelected="onSelected"></custom-open-dialog>
    </v-dialog>
  </v-container>
</template>

<script>
import initAssets from '@/components/CustomOpenAssets';
import EventBus from '@/services/EventBus';

export default {
  components: {
      'grape-editor': () => import('@/components/GrapesEditor'),
      'custom-open-dialog': () => import('@/components/CustomOpenDialog'),
  },
  data() {
    return {
      html: "<b>Test<\/b>",
      config: {show: false},
    };
  },
  mounted() {

  },

  methods: {
    onSelected(data) {
      console.log('On selected: ', data);
      EventBus.$emit('stop-open-assets', data);
    }
  }
};
</script>
