---
title: Undo/Redo Feature in Svelte 5
pubDate: 2025-08-08T00:00:00.000Z
description: Let's build a simple feature using Svelte!
tags:
  - Svelte
  - Typescript
---

In this step-by-step guide, we will be tackling the classic "Circle Drawer" challenge from the \[7 GUIs benchmark]\(https\://eugenkiss.github.io/7guis/tasks). We’ll focus on drawing circles and implementing undo/redo—but skip the diameter editing to keep things simple and clean.

Here’s what we'll build:

!\[Image description]\(https\://dev-to-uploads.s3.amazonaws.com/uploads/articles/twlb88151zh4ic74ne44.gif)

Our app will let users:

1\. Click to draw circles

2\. Undo and redo every action

Let’s break it down and build it up.

\---

\## Getting Started

I’ve set up a \[StackBlitz starter project]\(https\://stackblitz.com/edit/stackblitz-starters-khngk3pv?file=README.md) so you can start coding right away. Just sign in with GitHub and you're good to go.

Alternatively you can set up a \[local project]\(https\://svelte.dev/docs/svelte/getting-started) on your machine.

I'm using Tailwind CSS for styles, but you can use anything you’re comfortable with.

\---

\## Step 1: Defining Our Circle Type

Before we touch any UI, we need to define what kind of data our app is dealing with. Since we’re using TypeScript, we'll define a type for our circles.

Each circle will have:

\* A unique \`id\`

\* An \`x\` and \`y\` coordinate

\* A fixed \`r\` (radius) — we’ll set it to 25 by default

\*\*File: \`src/lib/types.ts\`\*\*

\`\`\`ts

export type Circle = {

&#x9;id: number;

&#x9;x: number;

&#x9;y: number;

&#x9;r: number;

};

\`\`\`

\---

\## Step 2: Storing Circles in State

Now we need somewhere to keep track of our drawn circles. We'll the \`$state\` \[rune]\(https\://svelte.dev/docs/svelte/$state) which will give us a reactive local state which we will use to store our circles and render it to the UI.

\*\*File: \`src/routes/+page.svelte\`\*\*

\`\`\`svelte

\<script lang="ts">

&#x9;import type { Circle } from '$lib/types';

&#x9;let circles = $state\<Circle\[]>(\[]);

\</script>

\`\`\`

We’ll update this later to plug in a history mechanism, but this is a good starting point.

\---

\## Step 3: Drawing on an SVG Canvas

We'll use \`\<svg>\` to render our circles. SVG is perfect for this challenge because it treats every shape as a DOM node, which makes it super easy to update or delete.

\`\`\`svelte

\<svg width="600" height="200">

&#x9;{#each circles as circle (circle.id)}

&#x9;	\<circle

&#x9;		cx={circle.x}

&#x9;		cy={circle.y}

&#x9;		r={circle.r}

&#x9;		stroke="blue"

&#x9;		stroke-width="2"

&#x9;		fill="transparent"

&#x9;	/>

&#x9;{/each}

\</svg>

\`\`\`

Svelte’s \`{#each}\` block will update the DOM automatically whenever the \`circles\` array changes.

\---

\## Step 4: Drawing Circles on Click

Right now, our app shows an empty canvas. Let’s make it respond to clicks by drawing a circle where the user clicks.

But here's the catch: click events give us \`clientX\` and \`clientY\`, which are \*\*relative to the window\*\*, not the SVG. So we’ll grab the bounding box of the \`\<svg>\` to offset the click coordinates properly.

We also use \`bind:this\` to reference the DOM node directly.

\`\`\`svelte

\<script lang="ts">

&#x9;import type { Circle } from '$lib/types';

&#x9;let svgElement: SVGSVGElement;

&#x9;let circles = $state\<Circle\[]>(\[]);

&#x9;function handleClick(event: MouseEvent) {

&#x9;	const svgRect = svgElement.getBoundingClientRect();

&#x9;	const x = event.clientX - svgRect.left;

&#x9;	const y = event.clientY - svgRect.top;

&#x9;	const newCircle: Circle = {

&#x9;		id: Date.now(),

&#x9;		x,

&#x9;		y,

&#x9;		r: 25

&#x9;	};

&#x9;	circles.push(newCircle);

&#x9;}

\</script>

\<svg bind:this={svgElement} on:click={handleClick} width="600" height="200">

&#x9;{#each circles as circle (circle.id)}

&#x9;	\<circle cx={circle.x} cy={circle.y} r={circle.r} stroke="blue" stroke-width="2" fill="transparent" />

&#x9;{/each}

\</svg>

\`\`\`

Now every time you click the canvas, a circle should appear right under your cursor.

\---

\## Step 5: Undo/Redo

Let’s add full undo/redo support. We’ll build a tiny state history engine that stores snapshots of the \`circles\` array. Each time the user draws a circle, it creates a new version. The user can then go back and forth in time like to access the circles.

\*\*File: \`src/lib/history.svelte.ts\`\*\*

\`\`\`ts

export function createHistory\<T>(initialValue: T) {

&#x9;const history = $state\<T\[]>(\[initialValue]);

&#x9;let index = $state(0);

&#x9;const current = $derived(history\[index]);

&#x9;const canUndo = $derived(index > 0);

&#x9;const canRedo = $derived(index \< history.length - 1);

&#x9;function update(newValue: T) {

&#x9;	// Cut off any "redo" history when updating

&#x9;	history.length = index + 1;

&#x9;	history.push(newValue);

&#x9;	index = history.length - 1;

&#x9;}

&#x9;function undo() {

&#x9;	if (canUndo) index--;

&#x9;}

&#x9;function redo() {

&#x9;	if (canRedo) index++;

&#x9;}

&#x9;return {

&#x9;	get current() { return current; },

&#x9;	get canUndo() { return canUndo; },

&#x9;	get canRedo() { return canRedo; },

&#x9;	update,

&#x9;	undo,

&#x9;	redo

&#x9;};

}

\`\`\`

!\[Image description]\(https\://dev-to-uploads.s3.amazonaws.com/uploads/articles/361yk60zsl59dhsl3xsy.png)

This generic helper works with \*\*any type of state\*\*, not just circles.

\---

\## Step 6: Wiring It All Together

Now we’ll plug our history engine into the page. Instead of directly mutating \`circles\`, we’ll call \`circleHistory.update()\` every time we want to make a change. This gives us full control over the timeline.

\`\`\`svelte

\<script lang="ts">

&#x9;import type { Circle } from '$lib/types';

&#x9;import { createHistory } from '$lib/history.svelte.ts';

&#x9;const circleHistory = createHistory\<Circle\[]>(\[]);

&#x9;let svgElement: SVGSVGElement;

&#x9;function handleClick(event: MouseEvent) {

&#x9;	const svgRect = svgElement.getBoundingClientRect();

&#x9;	const x = event.clientX - svgRect.left;

&#x9;	const y = event.clientY - svgRect.top;

&#x9;	const newCircle: Circle = {

&#x9;		id: Date.now(),

&#x9;		x,

&#x9;		y,

&#x9;		r: 25

&#x9;	};

&#x9;	const newCircles = \[...circleHistory.current, newCircle];

&#x9;	circleHistory.update(newCircles);

&#x9;}

\</script>

\`\`\`

We will also wire up our buttons and the \`{#each}\` block to our new state.

\`\`\`svelte

\<button on:click={circleHistory.undo} disabled={!circleHistory.canUndo}>Undo\</button>

\<button on:click={circleHistory.redo} disabled={!circleHistory.canRedo}>Redo\</button>

\<svg bind:this={svgElement} on:click={handleClick} width="600" height="200">

&#x9;{#each circleHistory.current as circle (circle.id)}

&#x9;	\<circle cx={circle.x} cy={circle.y} r={circle.r} stroke="blue" stroke-width="2" fill="transparent" />

&#x9;{/each}

\</svg>

\`\`\`

And there we have it! A fully functional, reactive Circle Drawer with a robust undo/redo system. You can click a bunch of times, undo all the way back to zero, and redo them one by one.

\---

\## Wrap-up

What we built:

\- Draw circles with a click

\- View all circles with SVG

\- Undo and redo any action

\- Fully reactive state with Svelte 5 runes

This is a great example of how declarative + reactive UI can be powerful \*and\* minimal. If you want to go further, you could:

\* Add diameter editing as per the challenge

\* Add keyboard shortcuts for undo/redo

\> \[Live demo on StackBlitz]\(https\://stackblitz.com/edit/stackblitz-starters-epg116w8?file=src/routes/+page.svelte)

Thanks for following along!

This article is also published on \[dev.to]\([https://dev.to/temesgen\_adane/building-a-reactive-undoredo-feature-in-svelte-5-1bmi](https://dev.to/temesgen_adane/building-a-reactive-undoredo-feature-in-svelte-5-1bmi))
