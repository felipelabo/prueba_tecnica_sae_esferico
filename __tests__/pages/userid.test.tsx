import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import UserIdPage from '../../src/app/user/[id]/page';
import type { UsuarioConParcelas } from '../../src/domain/user';
import type { Parcela, Recinto } from '../../src/domain/maps';

jest.mock('../../src/application/getUserWithMapsData', () => ({
  getUserWithMapsData: jest.fn(),
}));

// Mock del mapa dinámico para testear sus props
// DynamicMap usa Leaflet que no funciona en entorno de test
jest.mock('../../src/components/ui/DynamicMap', () => {
    
    return function MockDynamicMap({ parcelas }: { parcelas: Parcela[] }) {
        return (
        <div data-testid="dynamic-map" data-parcelas-count={parcelas.length}>
            <div data-testid="map-parcelas">
            {parcelas.map((parcela, index) => (
                <div 
                key={parcela.id} 
                data-testid={`parcela-${parcela.id}`}
                data-municipio={parcela.municipio.nombre}
                data-provincia={parcela.provincia.nombre}
                data-recintos-count={parcela.recintos?.length || 0}
                >
                Parcela {parcela.id} - {parcela.municipio.nombre}
                {parcela.recintos?.map(recinto => (
                    <div 
                    key={recinto.id} 
                    data-testid={`recinto-${recinto.id}`}
                    data-cultivo={recinto.cultivo.nombre}
                    >
                    Recinto {recinto.id} - {recinto.cultivo.nombre}
                    </div>
                ))}
                </div>
            ))}
            </div>
        </div>
        );
    };
});

//Mock ParcelaProvider con todos los hooks
jest.mock('../../src/context/ParcelaContext', () => ({
    ParcelaProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useParcela: () => ({
        selectedParcelaId: undefined,
        setSelectedParcelaId: jest.fn(),
        selectParcela: jest.fn(),
        clearSelection: jest.fn(),
    }),
    useIsParcelaSelected: () => false,
    useSelectedParcelaId: () => undefined,
}));

import { getUserWithMapsData } from '../../src/application/getUserWithMapsData';
const mockGetUserWithMapsData = getUserWithMapsData as jest.MockedFunction<typeof getUserWithMapsData>;

//Datos de prueba
const mockUserJuan: UsuarioConParcelas = {
    id: 1,
    nombre: 'Juan García Martínez',
    email: 'juan.garcia@agro.es',
    password: 'password123', // DATO SENSIBLE que NO debe aparecer
    parcelasCount: 3,
    provincias: ['Murcia'],
    parcelas: [
    {
        id: 1,
        municipio: { id: 1, nombre: 'Cartagena' },
        provincia: { id: 1, nombre: 'Murcia' },
        coordenadas: [[-0.8806018230047528, 37.653204045402106], [-0.8754692418392551, 37.655245495581696]] as [number,number][],
        recintos: [
        {
            id: 1,
            cultivo: { id: 1, nombre: 'Trigo' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.8883200016600199, 37.66240405046976], [-0.8865219572811895, 37.66018718528049]] as [number,number][]
        },
        {
            id: 2,
            cultivo: { id: 2, nombre: 'Maíz' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.886273005922618, 37.66000489567783], [-0.883959172929849, 37.65699891456971]] as [number,number][]
        },
        {
            id: 3,
            cultivo: { id: 3, nombre: 'Olivo' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.8796424103059621, 37.65375744337817], [-0.875830230971701, 37.65531068819466]] as [number,number][]
        }
        ]
    },
    {
        id: 2,
        municipio: { id: 1, nombre: 'Cartagena' },
        provincia: { id: 1, nombre: 'Murcia' },
        coordenadas: [[-0.8814258428035942, 37.67805999559866], [-0.879780050887149, 37.67365537914219]] as [number,number][],
        recintos: [
        {
            id: 4,
            cultivo: { id: 4, nombre: 'Tomate' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.8810751336856129, 37.67794456969261], [-0.8794319843548806, 37.67371043712379]] as [number,number][]
        },
        {
            id: 5,
            cultivo: { id: 5, nombre: 'Lechuga' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.8755467441481244, 37.67990549933813], [-0.8742272591269398, 37.67652934716321]] as [number,number][]
        }
        ]
    },
    {
        id: 3,
        municipio: { id: 1, nombre: 'Cartagena' },
        provincia: { id: 1, nombre: 'Murcia' },
        coordenadas: [[-0.8668807363727922, 37.6602808541999], [-0.853402300871835, 37.667064985687446]] as [number,number][],
        recintos: [
        {
            id: 6,
            cultivo: { id: 6, nombre: 'Almendro' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.8621510597770055, 37.67820183344034], [-0.8612055339783353, 37.67211861149519]] as [number,number][]
        },
        {
            id: 7,
            cultivo: { id: 1, nombre: 'Trigo' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-0.8663487933962131, 37.660795586726834], [-0.8490862352593354, 37.67015341462307]] as [number,number][]
        }
        ]
    }
    ]
};

//Datos de otro usuario para verificar aislamiento
const mockUserMaria: UsuarioConParcelas = {
    id: 2,
    nombre: 'María López Sánchez',
    email: 'maria.lopez@campo.es',
    parcelasCount: 1,
    provincias: ['Murcia'],
    parcelas: [
    {
        id: 4, // ID diferente para verificar que no se mezclan datos
        municipio: { id: 2, nombre: 'Lorca' },
        provincia: { id: 1, nombre: 'Murcia' },
        coordenadas: [[-1.67065564721878, 37.682598356857056], [-1.6716229474820636, 37.68383850566235]] as [number,number][],
        recintos: [
        {
            id: 8, // IDs diferentes para verificar aislamiento
            cultivo: { id: 2, nombre: 'Maíz' },
            fechaSiembra: new Date('2025-05-15'),
            fechaCosecha: new Date('2025-11-15'),
            coordenadas: [[-1.6743410612198488, 37.68291987890872], [-1.6740992361543476, 37.682598356857056]] as [number,number][]
        }
        ]
    }
    ]
};

describe('UserIdPage', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Renderizado detalles de usuario y navegación correcta', async () => {
        
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos información del usuario
        expect(screen.getByText('Juan García Martínez')).toBeInTheDocument();
        expect(screen.getByText('juan.garcia@agro.es')).toBeInTheDocument();
        
        //Verificar catidad de parcela en la sección de detalles
        const userDetailsSection = screen.getByText('Detalles del Usuario').closest('div');
        expect(within(userDetailsSection!).getByText('3')).toBeInTheDocument();

        //Verificamos navegación
        const backLink = screen.getByRole('link', { name: /volver/i });
        expect(backLink).toHaveAttribute('href', '/users');
    });

    it('No se muestra información sensible del cliente', async () => {
        
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos que información sensible no aparece
        expect(screen.queryByText('password123')).not.toBeInTheDocument();
        expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
        
        //Verificar que password no está en el DOM como atributo
        const container = screen.getByText('Juan García Martínez').closest('main');
        expect(container?.innerHTML).not.toContain('password123');
    });

    it('Visualización de cantidad de parcelas correctas del usuario en el mapa', async () => {
        
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos que el mapa muestra exactamente 3 parcelas de Juan
        const mapContainer = screen.getByTestId('dynamic-map');
        expect(mapContainer).toHaveAttribute('data-parcelas-count', '3');

        //Verificamos que cada parcela pertenece al usuario correcto
        const parcela1 = screen.getByTestId('parcela-1');
        expect(parcela1).toHaveAttribute('data-municipio', 'Cartagena');
        expect(parcela1).toHaveAttribute('data-provincia', 'Murcia');
        
        const parcela2 = screen.getByTestId('parcela-2');
        expect(parcela2).toHaveAttribute('data-municipio', 'Cartagena');
        
        const parcela3 = screen.getByTestId('parcela-3');
        expect(parcela3).toHaveAttribute('data-municipio', 'Cartagena');

        //Verificar que no aparecen parcelas de otros usuarios
        expect(screen.queryByTestId('parcela-4')).not.toBeInTheDocument(); // Parcela de María
        expect(screen.queryByText('Lorca')).not.toBeInTheDocument(); // Municipio de María
    });

    it('Visualiza numero correcto de recintos dentro de cada parcela del usuario', async () => {
        
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos recintos de la parcela 1 (3 recintos)
        const parcela1 = screen.getByTestId('parcela-1');
        expect(parcela1).toHaveAttribute('data-recintos-count', '3');
        
        expect(screen.getByTestId('recinto-1')).toHaveAttribute('data-cultivo', 'Trigo');
        expect(screen.getByTestId('recinto-2')).toHaveAttribute('data-cultivo', 'Maíz');
        expect(screen.getByTestId('recinto-3')).toHaveAttribute('data-cultivo', 'Olivo');

        //Verificamos recintos de la parcela 2 (2 recintos)
        const parcela2 = screen.getByTestId('parcela-2');
        expect(parcela2).toHaveAttribute('data-recintos-count', '2');
        
        expect(screen.getByTestId('recinto-4')).toHaveAttribute('data-cultivo', 'Tomate');
        expect(screen.getByTestId('recinto-5')).toHaveAttribute('data-cultivo', 'Lechuga');

        //Verificamos recintos de la parcela 3 (2 recintos)
        const parcela3 = screen.getByTestId('parcela-3');
        expect(parcela3).toHaveAttribute('data-recintos-count', '2');
        
        expect(screen.getByTestId('recinto-6')).toHaveAttribute('data-cultivo', 'Almendro');
        expect(screen.getByTestId('recinto-7')).toHaveAttribute('data-cultivo', 'Trigo');

        //Verificamos que no aparecen recintos de otros usuarios
        expect(screen.queryByTestId('recinto-8')).not.toBeInTheDocument(); // Recinto de María
    });

    it('Verifica aislamiento de datos entre dos usuarios', async () => {
    
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos que datos específicos de María no aparecen
        expect(screen.queryByText('María López Sánchez')).not.toBeInTheDocument();
        expect(screen.queryByText('maria.lopez@campo.es')).not.toBeInTheDocument();
        expect(screen.queryByText('Lorca')).not.toBeInTheDocument(); // Municipio de María
        expect(screen.queryByTestId('parcela-4')).not.toBeInTheDocument(); // Parcela de María
        expect(screen.queryByTestId('recinto-8')).not.toBeInTheDocument(); // Recinto de María

        //Verificamos que datos de Juan si aparecen
        expect(screen.getByText('Juan García Martínez')).toBeInTheDocument();
        expect(screen.getByTestId('parcela-1')).toBeInTheDocument();
        expect(screen.getByTestId('recinto-1')).toBeInTheDocument();
    });

    it('Llamado de getUserWithMapsData con id correcta de un usuario', async () => {
        
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos que se llama con el id correcto
        expect(mockGetUserWithMapsData).toHaveBeenCalledWith(1);
        expect(mockGetUserWithMapsData).toHaveBeenCalledTimes(1);
    });

    it('Visualización de FieldCards por cada parcela del usuario', async () => {
        
        mockGetUserWithMapsData.mockResolvedValue(mockUserJuan);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos que se muestran las 3 FieldCards
        const parcelasSection = screen.getByText('Parcelas').closest('div');
        
        //Buscar elementos que representen las parcelas en el sidebar
        const parcela1Card = within(parcelasSection!).getByText('N°1');
        const parcela2Card = within(parcelasSection!).getByText('N°2');
        const parcela3Card = within(parcelasSection!).getByText('N°3');
        
        expect(parcela1Card).toBeInTheDocument();
        expect(parcela2Card).toBeInTheDocument();
        expect(parcela3Card).toBeInTheDocument();
    });

    it('Manejo de usuario sin parcelas', async () => {
        
        const userWithoutParcelas: UsuarioConParcelas = {
        ...mockUserJuan,
        parcelas: [],
        parcelasCount: 0
        };

        mockGetUserWithMapsData.mockResolvedValue(userWithoutParcelas);

        const component = await UserIdPage({ params: { id: 1 } });
        render(component);

        //Verificamos mensajes cuando no hay parcelas
        expect(screen.getByText('No hay parcelas asociadas a este usuario.')).toBeInTheDocument();
        expect(screen.getByText('No hay datos de mapa disponibles.')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument(); // parcelasCount
    });
});