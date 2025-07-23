<script lang="ts">
	// This state tracks the form's current condition
	let status: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	
	// This state holds any message we get back from the server
	let responseMessage = $state('');

	async function handleSubmit(event: SubmitEvent) {
		status = 'submitting';
		responseMessage = '';

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();
			responseMessage = result.message;

			if (response.ok) {
				status = 'success';
				form.reset(); // Clear the form on success
			} else {
				status = 'error';
			}
		} catch (error) {
			status = 'error';
			responseMessage = 'A network error occurred. Please try again.';
		}
	}
</script>

{#if status === 'success'}
	<div class="p-4 bg-green-500/20 text-green-300 rounded-md">
		<p>{responseMessage}</p>
	</div>
{:else}
	<form on:submit|preventDefault={handleSubmit} class="grid gap-6">
		<div>
			<label for="email" class="block mb-2">Your email</label>
			<input type="email" name="email" id="email" required class="w-full p-3 rounded-md bg-gray-800 border border-gray-700" />
		</div>
		<div>
			<label for="subject" class="block mb-2">Subject</label>
			<input type="text" name="subject" id="subject" required class="w-full p-3 rounded-md bg-gray-800 border border-gray-700" />
		</div>
		<div>
			<label for="body" class="block mb-2">Body</label>
			<textarea name="body" id="body" rows="6" required class="w-full p-3 rounded-md bg-gray-800 border border-gray-700"></textarea>
		</div>

		<button type="submit" disabled={status === 'submitting'} class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition-colors">
			{#if status === 'submitting'}
				Sending...
			{:else}
				Send
			{/if}
		</button>
		
		{#if status === 'error'}
			<p class="text-red-400">{responseMessage}</p>
		{/if}
	</form>
{/if}