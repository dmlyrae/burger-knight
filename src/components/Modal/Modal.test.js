import React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal';

it('Рендерится без ошибок', () => {
	const rootModal = document.createElement('div');
	rootModal.setAttribute("id", "root-modal");
	rootModal.style.width = "100vw";
	rootModal.style.height = "100vh";
	document.body.appendChild(rootModal);
	const tree = renderer
		.create(
			<></>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
}); 