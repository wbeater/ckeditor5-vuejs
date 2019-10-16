import Vue from 'vue';

export default class Rest {
   
    static appendParams(url, params, replace=false) {
      let u = new URL(url);

      for (let k in params) {
        if (replace) {
          u.searchParams.set(k, params[k]);
        }
        else {
          u.searchParams.append(k, params[k]);
        }
      }

      return u.href;
    }

    static async get(url = '', data = {}, config = {}) {
      let headers = {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      };

      if (config && config.headers) {
        for (let key in config.headers) {
          headers[key] = config.headers[key];
        }
      }

      if (config && config.params) {
        url = this.appendParams(url, config.params);
      }

      try {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: headers,
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }catch(e) {
        throw e;
      }
    }

    static async post(url = '', data = {}, config = {}) {
      let headers = {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      };

      if (config && config.headers) {
        for (let key in config.headers) {
          headers[key] = config.headers[key];
        }
      }

      if (config && config.params) {
        url = this.appendParams(url, config.params);
      }

      try {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: headers,
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }catch(e) {
        throw e;
      }
    }

    static async upload() {
      //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const formData = new FormData();
      const photos = document.querySelector('input[type="file"][multiple]');

      formData.append('title', 'My Vegas Vacation');
      for (let i = 0; i < photos.files.length; i++) {
        formData.append('photos', photos.files[i]);
      }

      try {
        const response = await fetch('https://example.com/posts', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        console.log('Success:', JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    static async form(url, params, config) {
      const data = new FormData(); //new URLSearchParams();

      for (let param in params) {
        data.append(param, params[param]);
      }

      return await Rest.post(url, data, config);
    }
}