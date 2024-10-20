window.onload = async () => {
	const copyButton = document.getElementById('copy-button');
	const shortenForm = document.getElementById('shortener-form');
	const revealerForm = document.getElementById('revealer-form');
	const revealedUrl = document.getElementById('original-url');

	let shortenedUrl = '';

	copyButton.onclick = async () => {
		try {
			await navigator.clipboard.writeText(shortenedUrl);
			copyButton.textContent = 'Copied!';
		} catch (error) {
			console.error(error.message);
		}
	}

	shortenForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(shortenForm);
		const link = formData.get('shorten-url');
		if (!link || !link.startsWith('http')) return alert('Enter a valid link!');

		let res = await fetch(
			`${window.location.protocol}//${window.location.host}/shorten`,
			{
				method: 'POST',
				headers: {
					'Content-type':
						'application/json; charset=UTF-8',
				},
				body: JSON.stringify({
					link: link
				})
			},
		);
		if (!res.ok) return alert('Error: ' + res.msg);
		shortenedUrl = (await res.json()).link;
		copyButton.style.display = 'block';
	});

	revealerForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(revealerForm);
		let link = formData.get('reveal-url');
		link = link?.split('/');
		link = link[link.length - 1];
		if (!link) return alert('Please enter a valid link!')

		let res = await fetch(`${window.location.protocol}//${window.location.host}/reveal/${link}`, { method: 'POST' });
		if (!res.ok) return alert('Error: ' + await res.text());
		res = await res.json();
		revealedUrl.value = res.link;
		revealedUrl.style.display = 'block';
	});

}