export default styles => {
      if (styles.length) {
        const link = document.createElement('link');
        link.href = styles.shift();
        link.rel = 'stylesheet';
        head.appendChild(link);
        appendStyle(styles);
      }
    }