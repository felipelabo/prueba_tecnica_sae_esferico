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
        provincias: ['Murcia']
    },
    {
        id: 2,
        nombre: 'María García',
        email: 'maria@test.com',
        parcelasCount: 2,
        provincias: ['Alicante']
    }
];

describe('UsersPage', () => {

    beforeEach(() => {
        // Limpiamos estado de mocks entre tests
        jest.clearAllMocks();
    });

    it('Renderiza el titulo de la pagina y las tarjetas de usuarios', async () => {
        
        mockGetUsersList.mockResolvedValue(mockUsers);

        const component = await UsersPage();
        render(component);

        // Verificamos que elementos  presentes
        const heading = screen.getByRole('heading', { name: /Clientes/i });
        expect(heading).toBeInTheDocument();

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

        //Verificamos que la página sigue funcionando sin errores
        const heading = screen.getByRole('heading', { name: /Clientes/i });
        expect(heading).toBeInTheDocument();

        //Verificamos que NO aparecen tarjetas de usuarios
        expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    });
});