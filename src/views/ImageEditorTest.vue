<template>
    <div>
        <input type="file" accept="image/*" id="input-image-file" @change="imageChanged">
        <v-btn label="Download" @click.stop="download"></v-btn>
        <tui-image-editor ref="tuiImageEditor" :include-ui="useDefaultUI" :options="options"></tui-image-editor>
    </div>
</template>

<script>
//https://github.com/nhn/tui.image-editor
//https://nhn.github.io/tui.image-editor/latest/ImageEditor#event-addText
//https://nhn.github.io/tui.image-editor/latest/ImageEditor#loadImageFromFile
//http://nhn.github.io/tui.image-editor/latest/ImageEditor#toDataURL
//imageEditor.toDataURL();
//Load from file:
//https://github.com/nhn/tui.image-editor/blob/master/docs/Apply-Mobile-Version-Image.md

import ImageEditor from '@/components/ImageEditor.vue';
var MAX_RESOLUTION = 3264 * 2448;

export default {
    components: {
        'tui-image-editor': ImageEditor
    },
    data() {
        return {
            useDefaultUI: true,
            options: { // for tui-image-editor component's "options" prop
                cssMaxWidth: 700,
                cssMaxHeight: 500
            }
        }
    },
    mounted() {
        let ref = this.$refs.tuiImageEditor;
        console.log('tuiImageEditor: ', ref);

        ref.loadUrl('http://beta.futurejs.com/wp-content/plugins/affiliate-manager/cors.php?url=http:/beta.futurejs.com/wp-content/uploads/2019/10/110-153656940251222853823-1537240320282510680630.jpg');
    },

    methods: {
        imageChanged(event) {
             
            console.log('Event file changed: ', event);
            let file = event.target.files[0];
            let ref = this.$refs.tuiImageEditor;

            if (file) {
                
                console.log('refs: ', ref);
                console.log('file: ', file);

                (async() => {
                    //await ref.invoke('load', file);
                    await ref.load(file);
                    // URL.revokeObjectURL(file);
                })();

                // let img = new Image();
                // img.onload = function () {
                //     let resolution = this.width * this.height;

                //     if (resolution <= MAX_RESOLUTION) {

                //     } else {
                //         alert('Loaded image\'s resolution is too large!\nRecommended resolution is 3264 * 2448!');
                //     }                    
                // };

                // img.src = URL.createObjectURL(file);
            }
        },
        download() {
            console.log('ImageEditor: ', this.$refs.tuiImageEditor.getDataBlob());
        }
    }
}
</script>