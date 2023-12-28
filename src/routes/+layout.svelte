<script>
	let check = false
	import Navbar from '../lib/components/Navbar.svelte'
	import '../app.css'
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<Navbar />
<slot />
<footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <aside>
      <p>Copyright © 2023 - All The data for the movies is sourced from <a href="https://www.themoviedb.org/"><strong><u>The movie database</u></strong></a></p>
      <p>This site does not store any data on our server , we only linked to the media which is hosted by third party services</p>
    </aside>
  </footer>
