export default {
    previewsInData: true,
    providers: [
        {
            name: 'local-video',
            url: /^.*\.(?:mp4|avi)$/,

            html: match => {
                const url = match[ 0 ];

                return (
                    `<video autoplay="false" style="width: 100% !important;max-height: 500px;" controls src="${url}"></video>`
                );
            }
        },
        //https://www.nhaccuatui.com/bai-hat/hay-trao-cho-anh-son-tung-m-tp-ft-snoop-dogg.vtEybe9NxLw7.html
        {
            name: 'nhaccuatui-music',
            url: /^nhaccuatui\.com\/bai\-hat\/.*\.(\w+)\.html/,

            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; /*padding-bottom: 100%;*/ height: 300px; ">' +
                    `\r\nhttps://www.nhaccuatui.com/mh/auto/${ id }\r\n` + 
                    `<iframe src="https://www.nhaccuatui.com/mh/normal/${ id }" width="100%" height="587" frameborder="0" allowfullscreen allow="autoplay"></iframe>` +
                    '</div>'
                );
            }
        },
        {
            name: 'nhaccuatui-video',
            url: /^nhaccuatui\.com\/video\/.*\.(\w+)\.html/,

            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
                    `\r\nhttps://www.nhaccuatui.com/vh/auto/${ id }\r\n` + 
                    `<iframe src="https://www.nhaccuatui.com/vh/normal/${ id }" width="100%" height="587" frameborder="0" allowfullscreen allow="autoplay"></iframe>` +
                    '</div>'
                );
            }
        },
        {
            name: 'nhaccuatui-playlist',
            url: /^nhaccuatui\.com\/playlist\/.*\.(\w+)\.html/,

            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
                    `\r\nhttps://www.nhaccuatui.com/lh/auto/${ id }\r\n` + 
                    `<iframe src="https://www.nhaccuatui.com/lh/normal/${ id }" width="100%" height="587" frameborder="0" allowfullscreen allow="autoplay"></iframe>` +
                    '</div>'
                );
            }
        },
        {
            name: 'zingmp3',
            url: /^zingmp3\.vn\/bai\-hat\/.*\/(\w+)\.html/,

            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
                        `\r\nhttps://zingmp3.vn/embed/song/${ id }?start=true\r\n` +
                        `<iframe src="https://zingmp3.vn/embed/song/${ id }?start=false" ` +
                            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                            'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' +
                        '</iframe>' +
                    '</div>'
                );
            }
        },
        {
            name: 'zingvideo',
            url: /^zingmp3\.vn\/album\/.*\/(\w+)\.html/,

            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
                        `\r\nhttps://zingmp3.vn/embed/playlist/${ id }?start=true\r\n` +
                        `<iframe src="https://zingmp3.vn/embed/playlist/${ id }?start=false" ` +
                            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                            'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' +
                        '</iframe>' +
                    '</div>'
                );
            }
        },
        {
            name: 'dailymotion',
            url: /^dailymotion\.com\/video\/(\w+)/,
            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
                        `\r\nhttps://www.dailymotion.com/embed/video/${ id }\r\n` +
                        `<iframe src="https://www.dailymotion.com/embed/video/${ id }" ` +
                            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                            'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' +
                        '</iframe>' +
                    '</div>'
                );
            }
        },
        {
            name: 'spotify',
            url: [
                /^open\.spotify\.com\/(artist\/\w+)/,
                /^open\.spotify\.com\/(album\/\w+)/,
                /^open\.spotify\.com\/(track\/\w+)/
            ],
            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">' +
                        `\r\nhttps://open.spotify.com/embed/${ id }\r\n` +
                        `<iframe src="https://open.spotify.com/embed/${ id }" ` +
                            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                            'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
                        '</iframe>' +
                    '</div>'
                );
            }
        },
        {
            name: 'youtube',
            url: [
                /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                /^youtube\.com\/embed\/([\w-]+)/,
                /^youtu\.be\/([\w-]+)/
            ],
            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                        `\r\nhttps://www.youtube.com/embed/${ id }\r\n` +
                        `<iframe src="https://www.youtube.com/embed/${ id }" ` +
                            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                            'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                        '</iframe>' +
                    '</div>'
                );
            }
        },
        {
            name: 'vimeo',
            url: [
                /^vimeo\.com\/(\d+)/,
                /^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
                /^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
                /^vimeo\.com\/channels\/[^/]+\/(\d+)/,
                /^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
                /^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
                /^player\.vimeo\.com\/video\/(\d+)/
            ],
            html: match => {
                const id = match[ 1 ];

                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                        `\r\nhttps://player.vimeo.com/video/${ id }\r\n` +
                        `<iframe src="https://player.vimeo.com/video/${ id }" ` +
                            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                            'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
                        '</iframe>' +
                    '</div>'
                );
            }
        },
        {
            name: 'instagram',
            url: /^instagram\.com\/p\/(\w+)/
        },
        {
            name: 'twitter',
            url: /^twitter\.com/
        },
        {
            name: 'googleMaps',
            url: /^google\.com\/maps/
        },
        {
            name: 'flickr',
            url: /^flickr\.com/
        },
        {
            name: 'facebook',
            url: /^facebook\.com/
        },
    ],
}