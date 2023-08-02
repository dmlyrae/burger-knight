import { render, getByTestId, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

it("Плюс и минус в счетчике работают без ошибок", () => {
		// Рендерим компонент
	const { container } = render(<Counter />);

		// Находим элемент со значением счетчика
	const countValue = getByTestId(container, "count");

		// Находим кнопку, увеличивающую значение
	const increment = getByTestId(container, "increment");

		// Находим кнопку, уменьшающую значение
	const decrement = getByTestId(container, "decrement");

		// Проверяем, что начальное состояние счетчика равно 0
	expect(countValue.textContent).toBe("0");

		// Увеличиваем значение счетчика, симулируя нажатие на соответствующую кнопку  
	fireEvent.click(increment);

		// Проверяем, что состояние счетчика теперь равно 1
	expect(countValue.textContent).toBe("1");

		// Уменьшаем значение счетчика, симулируя нажатие на соответствующую кнопку  
	fireEvent.click(decrement);

		// Проверяем, что состояние счетчика теперь равно 0
	expect(countValue.textContent).toBe("0");
	expect(container).toMatchSnapshot();
}); 