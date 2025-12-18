import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UsersPage from '../../src/app/users/page';
import type { UsuarioDetalleSimple } from '../../src/domain/user';

// Mock getUsersList
jest.mock('../../src/application/getUsersList', () => ({
  getUsersList: jest.fn(), // Función simulada que controlamos en los tests
}));

import { getUsersList } from '../../src/application/getUsersList';
const mockGetUsersList = getUsersList as jest.MockedFunction<typeof getUsersList>;

// Datos de prueba 
const mockUsers: UsuarioDetalleSimple[] = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@test.com',
        parcelasCount: 3,
        recintosCount: 5,
        provincias: ['Murcia']
    },
    {
        id: 2,
        nombre: 'María García',
        email: 'maria@test.com',
        parcelasCount: 2,
        recintosCount: 4,
        provincias: ['Alicante']
    }
];

describe('UsersPage', () => {

    beforeEach(() => {
        // Limpiamos estado de mocks entre tests
        jest.clearAllMocks();
    });

    it('Renderiza las tarjetas de usuarios correctamente', async () => {
        
        mockGetUsersList.mockResolvedValue(mockUsers);

        const component = await UsersPage();
        render(component);

        // Verificamos que los datos mockeados se muestran en pantalla
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('María García')).toBeInTheDocument();
        expect(screen.getByText('juan@test.com')).toBeInTheDocument();
        expect(screen.getByText('maria@test.com')).toBeInTheDocument();
    });

    it('Llamado a getUsersList en el render', async () => {
        
        mockGetUsersList.mockResolvedValue(mockUsers);

        const component = await UsersPage();
        render(component);

        //Verificamos que el caso de uso fue llamado exactamente una vez
        expect(mockGetUsersList).toHaveBeenCalledTimes(1);
    });

    it('Manejo de lista vacia de usuarios', async () => {
        
        mockGetUsersList.mockResolvedValue([]);

        const component = await UsersPage();
        render(component);

        // Verificamos que el componente renderiza el grid contenedor incluso sin usuarios
        const gridContainer = document.querySelector('.grid');
        expect(gridContainer).toBeInTheDocument();
        expect(gridContainer).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'gap-4');

        // Verificamos que NO aparecen tarjetas de usuarios
        expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    });
});