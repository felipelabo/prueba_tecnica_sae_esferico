import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../../src/components/ui/UserCard';
import type { UsuarioDetalleSimple } from '../../src/domain/user';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(), // Simulamos la función de redirección
}));

import { redirect } from 'next/navigation';
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;

//Datos de prueba con información sensible
const mockUserWithSensitiveData: UsuarioDetalleSimple = {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@test.com',
    password: 'password123',
    parcelasCount: 3,
    provincias: ['Murcia', 'Alicante']
};

//Datos de prueba sin información sensible
const mockUserClean: UsuarioDetalleSimple = {
    id: 2,
    nombre: 'María García', 
    email: 'maria@test.com',
    parcelasCount: 2,
    provincias: ['Valencia']
};

describe('UserCard Component', () => {
  

    beforeEach(() => {
        //Limpiamos mocks entre tests para evitar interferencias
        jest.clearAllMocks();
    });

    it('Renderizar información correctamente', () => {
        // STEP 5: Renderizar componente con datos limpios
        render(<UserCard {...mockUserClean} />);

        // STEP 6: Verificar que información básica se muestra
        expect(screen.getByText('María García')).toBeInTheDocument();
        expect(screen.getByText('maria@test.com')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // parcelasCount
        expect(screen.getByText('Valencia')).toBeInTheDocument();
    });

    it('No mostrar información sensible del cliente', () => {
        
        // Renderizamos con datos que incluyen password
        render(<UserCard {...mockUserWithSensitiveData} />);

        //Verificamos que información normal aparece
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('juan@test.com')).toBeInTheDocument();
        
        //Verificamos que el password no se muestra en pantalla
        expect(screen.queryByText('password123')).not.toBeInTheDocument();
        expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
        
        //Verificamos que no hay inputs de password ocultos
        expect(screen.queryByDisplayValue('password123')).not.toBeInTheDocument();
        
        //Verificamos que el password no está en el DOM como atributo o data
        const cardElement = screen.getByText('Juan Pérez').closest('div');
        expect(cardElement).not.toHaveAttribute('data-password');
        expect(cardElement?.innerHTML).not.toContain('password123');
    });

    it('Muestra las provincias correctamente', () => {
        
        render(<UserCard {...mockUserWithSensitiveData} />);

        //Verificamos que ambas provincias se muestran
        expect(screen.getByText('Murcia')).toBeInTheDocument();
        expect(screen.getByText('Alicante')).toBeInTheDocument();
    });

    it('Manejo de navegación correctamente', () => {
        
        render(<UserCard {...mockUserClean} />);

        //Simulamos click en la tarjeta
        const cardElement = screen.getByText('María García').closest('div');
        fireEvent.click(cardElement!);

        //Verificamos que se llama a redirect con la URL correcta
        expect(mockRedirect).toHaveBeenCalledWith('/user/2');
        expect(mockRedirect).toHaveBeenCalledTimes(1);
    });

    it('Manejo de provincias vacias', () => {
        
        const userWithoutProvinces: UsuarioDetalleSimple = {
        ...mockUserClean,
        provincias: []
        };

        render(<UserCard {...userWithoutProvinces} />);

        //Verificamos que muestra data con array de provincias vacío
        expect(screen.getByText('María García')).toBeInTheDocument();
        expect(screen.getByText('maria@test.com')).toBeInTheDocument();
    });
});