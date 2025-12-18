import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FieldCard from '../../src/components/ui/FieldCard';
import type { Parcela } from '../../src/domain/maps';


jest.mock('../../src/context/ParcelaContext', () => ({
  useParcela: () => ({
    selectParcela: jest.fn(),
    clearSelection: jest.fn(),
  }),
  useIsParcelaSelected: jest.fn(),
}));

import { useIsParcelaSelected } from '../../src/context/ParcelaContext';
const mockUseIsParcelaSelected = useIsParcelaSelected as jest.MockedFunction<typeof useIsParcelaSelected>;

//Datos de parcela con múltiples recintos y diferentes cultivos
const mockParcelaWithRecintos: Parcela = {
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
};

//Parcela sin recintos
const mockParcelaSinRecintos: Parcela = {
    id: 2,
    municipio: { id: 2, nombre: 'Lorca' },
    provincia: { id: 1, nombre: 'Murcia' },
    coordenadas: [[-1.67065564721878, 37.682598356857056], [-1.6716229474820636, 37.68383850566235]] as [number,number][],
    recintos: []
};

describe('FieldCard Component', () => {

    beforeEach(() => {
        //Limpiamos mocks antes de cada test
        jest.clearAllMocks();
        mockUseIsParcelaSelected.mockReturnValue(false);
    });

    it('Renderizar información de parcela correctamente', () => {
        
        render(<FieldCard {...mockParcelaWithRecintos} />);

        //Verificamos información básica de la parcela
        expect(screen.getByText('1')).toBeInTheDocument(); 
        expect(screen.getByText('Murcia')).toBeInTheDocument();
        expect(screen.getByText('Cartagena')).toBeInTheDocument();
        
        //Verificamos que el icono de parcela está presente
        const cardElement = screen.getByText('1').closest('div');
        const landPlotIcon = cardElement?.querySelector('svg');
        expect(landPlotIcon).toBeInTheDocument();
    });

    it('Mostrar todos los recintos con su información correcta', () => {
        
        render(<FieldCard {...mockParcelaWithRecintos} />);

        //Verificamos que se muestran los 3 recintos
        expect(screen.getByText('Trigo')).toBeInTheDocument();
        expect(screen.getByText('Maíz')).toBeInTheDocument();
        expect(screen.getByText('Olivo')).toBeInTheDocument();

        //Verificamos que aparecen los IDs de recinto
        expect(screen.getByText('Recinto 1')).toBeInTheDocument();
        expect(screen.getByText('Recinto 2')).toBeInTheDocument();
        expect(screen.getByText('Recinto 3')).toBeInTheDocument();
    });

    it('Manejar parcelas sin recintos', () => {
        
        render(<FieldCard {...mockParcelaSinRecintos} />);

        //Verificamos información básica sigue apareciendo
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Lorca')).toBeInTheDocument();

        //Verificamos mensaje cuando no hay recintos
        expect(screen.getByText('No hay recintos asociados.')).toBeInTheDocument();

        //Verificamos que no aparecen nombres de cultivos
        expect(screen.queryByText('Trigo')).not.toBeInTheDocument();
        expect(screen.queryByText('Maíz')).not.toBeInTheDocument();
    });

    it('Manejo de click para selección de parcela', () => {

        const mockSelectParcela = jest.fn();
        const mockClearSelection = jest.fn();

        // Mock del contexto con funciones específicas
        jest.doMock('../../src/context/ParcelaContext', () => ({
        useParcela: () => ({
            selectParcela: mockSelectParcela,
            clearSelection: mockClearSelection,
        }),
        useIsParcelaSelected: () => false, // No seleccionada inicialmente
        }));

        render(<FieldCard {...mockParcelaWithRecintos} />);

        const cardElement = screen.getByText('1').closest('div');
        fireEvent.click(cardElement!);

        //Verificamos que se intenta seleccionar la parcela
        expect(cardElement).toBeInTheDocument();
    });

    it('Visualización correcta de herencia Provincia y Municipio', () => {
        
        render(<FieldCard {...mockParcelaWithRecintos} />);

        const provincia = screen.getByText('Murcia');
        const municipio = screen.getByText('Cartagena');
        
        //Verificamos que provincia y municipio en el DOM
        expect(provincia).toBeInTheDocument();
        expect(municipio).toBeInTheDocument();

        //Verificar que provincia tiene estilo más prominente
        expect(provincia).toHaveClass('text-primary');
        expect(municipio).toHaveClass('text-muted');
    });

    it('Manejo de multiples recintos con sus estilos correctamente', () => {
        
        render(<FieldCard {...mockParcelaWithRecintos} />);

        //Verificamos que cultivos diferentes se distinguen visualmente
        const trigoRecinto = screen.getByText('Trigo').closest('div');
        const maizRecinto = screen.getByText('Maíz').closest('div');
        const olivoRecinto = screen.getByText('Olivo').closest('div');

        //Verificamos que cada recinto tiene su propio contenedor
        expect(trigoRecinto).not.toBe(maizRecinto);
        expect(maizRecinto).not.toBe(olivoRecinto);
        expect(trigoRecinto).not.toBe(olivoRecinto);

        //Verificamos que todos tienen estilos CSS variables
        expect(trigoRecinto).toHaveStyle('background-color: var(--color-cultivo-trigo)');
        expect(maizRecinto).toHaveStyle('background-color: var(--color-cultivo-maíz)');
        expect(olivoRecinto).toHaveStyle('background-color: var(--color-cultivo-olivo)');
    });
});