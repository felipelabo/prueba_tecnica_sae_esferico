import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home', () => {
    // Esto es un test de ejemlo que busca un h1 en el componente Home.
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', { level: 2 })

        expect(heading).toBeInTheDocument()
    })
})