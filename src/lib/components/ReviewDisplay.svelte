<script>
	import { Star } from 'phosphor-svelte'
	export let reviews = []

	// State for the modal
	let selectedReview = null

	const openModal = (review) => {
		selectedReview = review
		my_modal_5.showModal()
	}

	const truncateText = (text, length = 200) => {
		if (text.length <= length) return text
		return text.slice(0, length) + '...'
	}
</script>

<div class="flex flex-row gap-2">
	<h1 class="ml-[8%] mt-4 text-5xl font-bold">Reviews</h1>
	<Star weight="duotone" size={64} class="mt-2" />
</div>

<div class="carousel-center carousel m-4 ml-[10%] w-[80%] space-x-4 rounded-2xl bg-transparent p-4">
	<div class="carousel-item">
		{#each reviews as review}
			<div
				class="over:translate-y-[-8px] m-4 w-96 items-center rounded-2xl p-2 text-white shadow-2xl backdrop-blur-sm transition-shadow transition-transform hover:bg-black/10 hover:shadow-lg">
				<div class="author">
					{#if review.author_details.avatar_path}
						<img
							src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
							alt="{review.author} avatar" />
					{/if}
					<span>{review.author}</span>
					{#if review.author_details.rating}
						<span
							class="rating"
							style="
              color: {review.author_details.rating <= 3
								? 'red'
								: review.author_details.rating <= 7
									? '#f39c12'
									: 'green'};
              background-color: {review.author_details.rating <= 3
								? '#ffcccc'
								: review.author_details.rating <= 7
									? '#fff3d1'
									: '#ccffcc'};
            ">
							{review.author_details.rating}/10
						</span>
					{/if}
				</div>
				<div class="content">
					{truncateText(review.content, 200)}
				</div>
				{#if review.content.length > 200}
					<button class="read-more-button" on:click={() => openModal(review)}>
						Read Full Review
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>

<!-- Open the modal using ID.showModal() method -->
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box bg-black/40 text-white backdrop-blur-sm">
		{#if selectedReview}
			<div>
				<div class="author">
					{#if selectedReview.author_details.avatar_path}
						<img
							src={`https://image.tmdb.org/t/p/w200${selectedReview.author_details.avatar_path}`}
							alt="{selectedReview.author} avatar" />
					{/if}
					<span>{selectedReview.author}</span>
					{#if selectedReview.author_details.rating}
						<span
							class="rating"
							style="
                      color: {selectedReview.author_details.rating <= 3
								? 'red'
								: selectedReview.author_details.rating <= 7
									? '#f39c12'
									: 'green'};
                      background-color: {selectedReview.author_details.rating <= 3
								? '#ffcccc'
								: selectedReview.author_details.rating <= 7
									? '#fff3d1'
									: '#ccffcc'};
                    ">
							{selectedReview.author_details.rating}/10
						</span>
					{/if}
				</div>
			</div>

			<p class="modal-content text-white">{selectedReview.content}</p>
		{/if}
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

<style>
	.author {
		display: flex;
		align-items: center;
		gap: 12px;
		font-weight: bold;
		color: #fff;
		margin-bottom: 10px;
	}

	.author img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid #ddd;
	}

	.rating {
		font-size: 0.9rem;
		color: #f39c12;
		margin-left: auto;
		background: #fff3d1;
		border-radius: 8px;
		padding: 2px 8px;
	}

	.content {
		margin-top: 12px;
		line-height: 1.6;
		color: #fff;
	}

	.read-more-button {
		color: #3498db;
		cursor: pointer;
		font-weight: bold;
		margin-top: 10px;
		display: inline-block;
		background: none;
		border: none;
		font-size: 1rem;
		text-decoration: underline;
		padding: 0;
		transition: color 0.3s;
	}

	.read-more-button:hover {
		color: #1d6fa5;
	}
</style>
