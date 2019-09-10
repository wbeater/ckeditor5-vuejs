import Vue from 'vue';

let _callbackFunc;
let _cancelSource;

class Uploader {
    
    // static _media = this.API_PATH + "/wp/v2/media";
    // static _media_id = this.API_PATH + "/wp/v2/media/{id}";
    
    constructor ( loader ) {
        this.loader = loader;
        console.log('CKEditor File loader', loader);
        const CancelToken = Vue.$http.CancelToken;
        this.source = CancelToken.source();
    }

    async upload() {
        // {
        //     default: 'http://example.com/images/image–default-size.png',
        //     '160': 'http://example.com/images/image–size-160.image.png',
        //     '500': 'http://example.com/images/image–size-500.image.png',
        //     '1000': 'http://example.com/images/image–size-1000.image.png',
        //     '1052': 'http://example.com/images/image–default-size.png'
        // }
    //     let file = await this.loader.file;
    // //    console.log('Uploaded file', file);
    //     const data = new FormData();
    //     data.append( 'file', file );
    //     data.append('title', file.name);

        // const CancelToken = Vue.$http.CancelToken;
        // this.source = CancelToken.source();

        // let result = await Wordpress.post(Constant.wp._media, {}, data, {
        //     cancelToken: this.source.token,
        //     onUploadProgress: (evt) => {
        //         // Do whatever you want with the native progress event
        //         if ( evt.lengthComputable ) {
        //             this.loader.uploadTotal = evt.total;
        //             this.loader.uploaded = evt.loaded;
        //         }
        //     },
        // });

        let result = {};
        if (_callbackFunc) {
            result = await _callbackFunc( this.loader, this.source );
        }

        // {id: 153, date: "2019-08-14T06:52:47", date_gmt: "2019-08-14T06:52:47",…}
        // alt_text: ""
        // author: 2
        // caption: {raw: "test caption", rendered: "<p>test caption</p>↵"}
        // comment_status: "open"
        // date: "2019-08-14T06:52:47"
        // date_gmt: "2019-08-14T06:52:47"
        // description: {raw: "test description",…}
        // generated_slug: "test-title-4"
        // guid: {rendered: "http://beta.futurejs.com/wp-content/uploads/2019/08/71fc5625de163a486307.jpg",…}
        // id: 153
        // link: "http://beta.futurejs.com/test-title-4/"
        // media_details: {width: 720, height: 960, file: "2019/08/71fc5625de163a486307.jpg", sizes: {,…},…}
        // media_type: "image"
        // meta: []
        // mime_type: "image/jpeg"
        // modified: "2019-08-14T06:52:47"
        // modified_gmt: "2019-08-14T06:52:47"
        // permalink_template: "http://beta.futurejs.com/?attachment_id=153"
        // ping_status: "closed"
        // post: null
        // slug: "test-title-4"
        // source_url: "http://beta.futurejs.com/wp-content/uploads/2019/08/71fc5625de163a486307.jpg"
        // status: "inherit"
        // template: ""
        // title: {raw: "test title", rendered: "test title"}
        // type: "attachment"
        // _links: {self: [{href: "http://beta.futurejs.com/wp-json/wp/v2/media/153"}],…}

        return { default: result.source_url };
    }

    // Aborts the upload process.
    abort() {
        if (this.source && this.source.cancel) this.source.cancel('Operation canceled by the user.');
    }
}

function UploaderPlugin( editor ) {
    if (editor.plugins.has('FileRepository')) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new Uploader( loader );
        };
    }
}

export default function(asyncCallback) {
    _callbackFunc = asyncCallback;
    return UploaderPlugin;
}

/** How to use */
// UploaderPlugin(async ( loader, cancelSource ) => {
//     return await Wordpress.post(Constant.wp._media, {}, data, {
//         cancelToken: cancelSource.token,
//         onUploadProgress: (evt) => {
//             // Do whatever you want with the native progress event
//             if ( loader && evt.lengthComputable ) {
//                 loader.uploadTotal = evt.total;
//                 loader.uploaded = evt.loaded;
//             }
//         },
// });
// })