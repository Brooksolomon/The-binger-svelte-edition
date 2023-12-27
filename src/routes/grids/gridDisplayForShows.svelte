<script>
	import { concat, cropName } from '../../utils/utils'
	export let propValue
</script>

<div class="gridbox">
	{#each propValue.results as d}
		<a href="/showHome/{d.id}" data-sveltekit-reload>
			<div class="griditem card glass w-72">
				<figure>
					<img src={concat(d.poster_path)} alt={concat(d.poster_path)} class="w-72" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">{cropName(d.name, 20)}</h2>
					<p>{d.first_air_date.slice(0, 4)}</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Watch now!</button>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.gridbox {
		margin-top: 50px;
		margin-left: 10px;
		display: grid;
		row-gap: 50px;
		max-width: 1200px;
		gap: 0.5rem;
	}
	@media (min-width: 350px) {
		.gridbox {
			grid-template-columns: repeat(1, 1fr);
			margin-left: 60px;
		}
	}
	@media (min-width: 475px) {
		.gridbox {
			grid-template-columns: repeat(1, 1fr);
			margin-left: 105px;
		}
	}
	@media (min-width: 555px) {
		.gridbox {
			grid-template-columns: repeat(1, 1fr);
			margin-left: 145px;
		}
	}
	@media (min-width: 600px) {
		.gridbox {
			grid-template-columns: repeat(2, 1fr);
			margin-left: 10px;
		}
	}
	@media (min-width: 900px) {
		.gridbox {
			grid-template-columns: repeat(3, 1fr);
			margin-left: 50px;
		}
	}
	@media (min-width: 1200px) {
		.gridbox {
			grid-template-columns: repeat(4, 1fr);
			margin-left: 50px;
		}
	}
	@media (min-width: 1500px) {
		.gridbox {
			grid-template-columns: repeat(5, 1fr);
			margin-left: 200px;
		}
	}
</style>
