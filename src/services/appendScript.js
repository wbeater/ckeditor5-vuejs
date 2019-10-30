export default  scripts => {
      if (scripts.length) {
        const scr = document.createElement('script');
        scr.src = scripts.shift();
        scr.onerror = scr.onload = appendScript.bind(null, scripts);
        head.appendChild(scr);
      } else {
        constr = getConstructor();
      }
    }