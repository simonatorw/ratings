const template = document.createElement('template');
template.innerHTML = `
<style>
	.star {
		display: inline-block;
		color: #666;
		cursor: pointer;
	}
	
	.star::after {
		content: "\\2605";
	}

	.selected {
		color: cyan;
	}
</style>
<div>
	<div class="stars">
		<div class="star star-1"></div>
		<div class="star star-2"></div>
		<div class="star star-3"></div>
		<div class="star star-4"></div>
		<div class="star star-5"></div>
	</div>
</div>
`;

export class RateMe extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		console.log('Rate Me added to DOM');
		const star = this.shadowRoot.querySelector('.stars');

		star.addEventListener('click', e => {
			const el = e.target;
			const cls = e.target.className;
			if (cls) {
				const num = parseInt(cls.split(' ')[1]?.split('-')[1], 10);
				
				for (let i = 1; i < 6; i++) {
					if (i <= num) {
						star.querySelector(`.star:nth-child(${i})`).className = `star star-${i} selected`;
					} else {
						star.querySelector(`.star:nth-child(${i})`).className = `star star-${i}`;
					}
				}
			}
		}, false);
	}
}

window.customElements.define('rate-me', RateMe);