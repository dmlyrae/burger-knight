import React, { useState } from "react";

export const Counter = () => {
	let [count, setCount] = useState(0);

	const decrement = () => setCount((count -= 1));
	const increment = () => setCount((count += 1));

	return (
		<div>
			<p data-testid="count">{count}</p>
			<button data-testid="decrement" type="button" onClick={decrement}>
				-
			</button>
			<button data-testid="increment" type="button" onClick={increment}>
				+
			</button>
		</div>
	);
} 