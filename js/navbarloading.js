function loadPage() {
    const navbar = document.getElementById('navbar');
  
    fetch('../navbar.html')
      .then(response => response.text())
      .then(html => {
        navbar.innerHTML = html;
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  loadPage();