//https://github.com/artf/grapesjs/blob/e921165a8d681b5d1056c816f88dd7719d4f61e0/src/dom_components/view/ComponentImageView.js#L68

import Vue from 'vue';
import EventBus from '@/services/EventBus';

let OPEN_ASSETS = {show: false};

const openAssets = {
    run(editor, sender, opts = {}) {
        Vue.set(OPEN_ASSETS, 'show', true);
        const am = editor.AssetManager;
        const selected = editor.getSelected();

        // const rootContainer = editor.Canvas.getBody();
        // const types = opts.types;
        // const accept = opts.accept;
    
        am.setTarget(opts.target);
        am.onClick(opts.onClick);
        am.onDblClick(opts.onDblClick);
        am.onSelect(opts.onSelect);

        EventBus.$once('stop-open-assets', (assetUrls) => {
            console.log('CustomOpenAssets::run assetsUrls ', assetUrls);
            if (assetUrls && assetUrls[0]) {
                if (opts.target && opts.target.attributes && opts.target.attributes.tagName == 'img') {
                    let width = opts.target.view.el.width;
                    let height = opts.target.view.el.height;
                    opts.target.setAttributes({src: assetUrls[0]});
                    opts.target.attributes.src = assetUrls[0];
                    opts.target.setStyle({width: width + 'px', height: height + 'px'});
                }
                else if (selected) {
                    selected.setStyle({'background-image': `url(${assetUrls[0]})`});
                }
            }

            editor.stopCommand(this.id);
        });

      return this;
    },
  
    stop(editor) {
      return this;
    }
  };

  export default function(data) {
    OPEN_ASSETS = data;
    return openAssets;
  }