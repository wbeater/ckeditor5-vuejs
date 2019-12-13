<template>
    <div>
        <input type="file" accept="image/*" id="input-image-file" @change="imageChanged">
        <v-btn label="Download" @click.stop="showImageEditor">Show Image Editor</v-btn>

        <v-dialog persistent v-model="editDialog.show" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dense dark color="#443b3b">
                <v-btn icon dark @click="editDialog.show = false;">
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{'Chỉnh sửa ảnh'}}</v-toolbar-title>&nbsp;&nbsp;
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>
            <v-list class="py-0" :style="{height: editDialog.height + 'px'}">
                <tui-image-editor ref="tuiImageEditor" :include-ui="true" :options="editDialog.options"></tui-image-editor>
            </v-list>
        </v-card>
        </v-dialog>
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
            },
            editDialog: {
                show: false,
                options: { 
                // for tui-image-editor component's "options" prop
                cssMaxWidth: 1024,
                cssMaxHeight: 800,
                includeUI: {
                    initMenu: 'filter',
                }
                },
                height: 800,
            },
        }
    },
    mounted() {

        
    },



    methods: {
        showImageEditor () {
            this.editDialog.height = window.innerHeight - 50;

            (async () => {
                this.editDialog.show = true;
                await this.$nextTick();
                let ref = this.$refs.tuiImageEditor;
            
                if (ref) {
                    console.log('tuiImageEditor: ', ref);
                    //ref.loadUrl('http://beta.futurejs.com/wp-content/plugins/affiliate-manager/cors.php?url=http:/beta.futurejs.com/wp-content/uploads/2019/10/110-153656940251222853823-1537240320282510680630.jpg');
                    ref.loadUrl('http://beta.futurejs.com/wp-content/plugins/affiliate-manager/cors.php?url=http://beta.futurejs.com/wp-content/uploads/2019/12/bird.jpg');
                }
            })()
        },
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