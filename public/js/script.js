(function() {

  var submitBtn = document.getElementById('submit-btn');
  var form = submitBtn.parentElement;
  var gallery = document.getElementById('gallery');

  /**
   * Extract form data into query string.
   * @param  {Object} formNode Form html node.
   * @return {String}          Serialized data.
   */
  function serialize(formNode) {
    var pairs = [];
    var children = formNode.elements;
    // extract key/value pairs
    for (var i = 0; i < children.length; i++) {
      if (children[i].nodeName === 'INPUT' && children[i].type === 'text') {
        pairs.push(children[i].name + '=' + children[i].value);
      }
    }
    // to string
    if (!pairs.length) return '';
    return '?' + pairs.join('&');
  }

  /**
   * Make an authorized xhr request.
   * @param  {String}   method 
   * @param  {String}   url    
   * @param  {Function} done   Success/error callback.
   */
  function ajax(method, url, done) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              return done(null, JSON.parse(xhttp.responseText));
            } else {
              return done(xhttp.response);
            }
        }
    };
    xhttp.open(method, url, true);
    // Note: Hardcoded header for demo purposes!
    xhttp.setRequestHeader('Authorization', 'opensesame');
    xhttp.send();
  }

  /**
   * Visualize xhr response.
   * @param  {Array}  pictures  Picture response objects.
   */
  function render(pictures) {
    gallery.innerHTML = '';
    pictures.forEach(function(pic) {
      var imgNode = document.createElement('IMG');
      imgNode.setAttribute('src', pic.url);
      imgNode.setAttribute('alt', pic.name);
      imgNode.setAttribute('height', '300px');
      gallery.appendChild(imgNode);
    });
  }

  /**
   * Submit that single form on the page.
   * @param  {Object}  e  Click event
   */
  function submit(e) {
    e.preventDefault();

    var qs = serialize(form);
    ajax('GET', '/pictures' + qs, function(err, res) {
      if (res.status === 'OK') render(res.data);
    });
  }

  // attach event listeners
  submitBtn.addEventListener('click', submit);

})();