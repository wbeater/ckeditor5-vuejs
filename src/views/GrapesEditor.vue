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
        <grape-editor :mediaConfig="config" :allowExport="true"
          css='* { box-sizing: border-box; } body {margin: 0;}.gjs-dashed .container, .gjs-dashed .container-fluid, .gjs-dashed .tab-pane, .gjs-dashed .row, .gjs-dashed .col, .gjs-dashed [class^="col-"]{min-height:1.5rem !important;}.gjs-dashed .w-100{background-color:rgba(0, 0, 0, 0.1);min-height:0.25rem !important;}.gjs-dashed img{min-width:25px;min-height:25px;background-color:rgba(0, 0, 0, 0.5);}.gjs-dashed .btn-group, .gjs-dashed .btn-toolbar{padding-right:1.5rem !important;min-height:1.5rem !important;}.gjs-dashed .card, .gjs-dashed .card-group, .gjs-dashed .card-deck, .gjs-dashed .card-columns{min-height:1.5rem !important;}.gjs-dashed .collapse{display:block !important;min-height:1.5rem !important;}.gjs-dashed .dropdown{display:block !important;min-height:1.5rem !important;}.gjs-dashed .dropdown-menu{min-height:1.5rem !important;display:block !important;}.basic-row{display:flex;justify-content:flex-start;align-items:stretch;flex-wrap:nowrap;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.basic-cell{min-height:75px;flex-grow:1;flex-basis:100%;}.countdown{text-align:center;font-family:Helvetica, serif;}.countdown-block{display:inline-block;margin-top:0px;margin-right:10px;margin-bottom:0px;margin-left:10px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.countdown-digit{font-size:5rem;}.countdown-endtext{font-size:5rem;}.countdown-cont{display:inline-block;}@media (max-width: 768px){.basic-row{flex-wrap:wrap;}}'
          js='var items = document.querySelectorAll("#iz42");
              for (var i = 0, len = items.length; i < len; i++) {
                (function(){var t=new Date("2019-11-16").getTime(),e=this.querySelector("[data-js=countdown]"),n=this.querySelector("[data-js=countdown-endtext]"),r=this.querySelector("[data-js=countdown-day]"),i=this.querySelector("[data-js=countdown-hour]"),o=this.querySelector("[data-js=countdown-minute]"),a=this.querySelector("[data-js=countdown-second]"),s=this.gjs_countdown_interval;s&&s&&clearInterval(s);var l=function(t,e,n,s){r&&(r.innerHTML=t<10?"0"+t:t),i&&(i.innerHTML=e<10?"0"+e:e),o&&(o.innerHTML=n<10?"0"+n:n),a&&(a.innerHTML=s<10?"0"+s:s)},c=function(){var r=(new Date).getTime(),i=t-r,o=Math.floor(i/864e5),a=Math.floor(i%864e5/36e5),s=Math.floor(i%36e5/6e4),c=Math.floor(i%6e4/1e3);l(o,a,s,c),i<0&&(clearInterval(u),n&&(n.innerHTML="EXPIRED"),e.style.display="none",n.style.display="")};if(t){var u=setInterval(c,1e3);this.gjs_countdown_interval=u,n.style.display="none",e.style.display="",c()}else l(0,0,0,0)}.bind(items[i]))();
              }'
        >
          <div>
            <div class="basic-row">
              <div class="basic-cell">
                <div id="iz42" class="countdown">
                  <span data-js="countdown" class="countdown-cont">
                  <div class="countdown-block">
                    <div data-js="countdown-day" class="countdown-digit"></div>
                    <div class="countdown-label">days</div>
                  </div>
                  <div class="countdown-block"><div data-js="countdown-hour" class="countdown-digit">
                      </div><div class="countdown-label">hours
                      </div></div>
                  <div class="countdown-block"><div data-js="countdown-minute" class="countdown-digit">
                      </div><div class="countdown-label">minutes
                      </div></div>
                  <div class="countdown-block"><div data-js="countdown-second" class="countdown-digit">
                      </div><div class="countdown-label">seconds
                      </div></div>
                  </span>
                  <span data-js="countdown-endtext" class="countdown-endtext"></span>
                </div>
              </div>
            </div>
          </div>
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
    EventBus.$on('open-injectors', (model, params) => {
      this.config.show = true;
    });
  },

  methods: {
    onSelected(data) {
      console.log('On selected: ', data);
      EventBus.$emit('stop-open-assets', data);
    }
  }
};
</script>
